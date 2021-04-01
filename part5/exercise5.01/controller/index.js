const k8s = require('@kubernetes/client-node')
const mustache = require('mustache')
const request = require('request')
const JSONStream = require('json-stream')
const fs = require('fs').promises

const kc = new k8s.KubeConfig();

process.env.NODE_ENV === 'development' ? kc.loadFromDefault()
  : kc.loadFromCluster()

const opts = {}
kc.applyToRequest(opts)

const client = kc.makeApiClient(k8s.CoreV1Api);

const sendRequestToApi = async (api, method = 'get', options = {}) =>
  new Promise((resolve, reject) =>
    request[method](`${kc.getCurrentCluster().server}${api}`,
      {
        ...opts, ...options, headers:
          { ...options.headers, ...opts.headers }
      }, (err, res) =>
      err ? reject(err) : resolve(JSON.parse(res.body))))


const depFieldsFromDummysite = (object) => ({
  deployment_name: `${object.metadata.name}-dep`,
  namespace: object.metadata.namespace,
  dummysite_name: object.metadata.name,
  container_name: object.metadata.name,
  image: object.spec.image,
  website_url: object.spec.website_url
})

const svcFieldsFromDummysite = (object) => ({
  service_name: `${object.metadata.name}-svc`,
  namespace: object.metadata.namespace,
  dummysite_name: object.metadata.name,
})

const ingressFieldsFromDummysite = (object) => ({
  ingress_name: `${object.metadata.name}-ingress`,
  namespace: object.metadata.namespace,
  service_name: `${object.metadata.name}-svc`
})

const yamlDic = () => ({
  dep: 'dsdeployment.mustache',
  svc: 'service.mustache',
  ingress: 'ingress.mustache'
})

const apiDic = ({ fields, namespace }) => ({
  dep: `/apis/apps/v1/namespaces/${namespace ? namespace : fields.namespace}/deployments`,
  svc: `/api/v1/namespaces/${namespace ? namespace : fields.namespace}/services`,
  ingress: `/apis/networking.k8s.io/v1beta1/namespaces/${namespace ? namespace : fields.namespace}/ingresses`
})

const fieldsDic = (object) => ({
  dep: depFieldsFromDummysite(object),
  svc: svcFieldsFromDummysite(object),
  ingress: ingressFieldsFromDummysite(object)
})

const getYAML = async ({ type = 'dep', fields }) => {
  const template = await fs.readFile(yamlDic()[type], 'utf-8')
  return mustache.render(template, fields)
}

const createResources = async ({ type, fields }) => {
  console.log(`Create ds ${type} to namespace ${fields.namespace}`)
  const yaml = await getYAML({ type, fields })
  const dic = apiDic({ fields })
  return sendRequestToApi(dic[type], 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  })
}

const deleteResources = async ({ type, namespace, resourceName }) => {
  const apis = apiDic({ namespace })
  return sendRequestToApi(`${apis[type]}/${resourceName}`, 'delete')
}


const maintainStatus = async () => {
  (await client.listPodForAllNamespaces()).body // A bug in the client(?) was fixed by sending a request and not caring about response

  const dummysite_stream = new JSONStream()

  dummysite_stream.on('data', async ({ type, object }) => {
    const dic = fieldsDic(object)
    //const fields = depFieldsFromDummysite(object)
    console.log('dummysite stream')
    console.log('type', type)
    console.log('object', object)

    if (type === 'ADDED') {
      createResources({ type: 'dep', fields: dic['dep'] })
      createResources({ type: 'svc', fields: dic['svc'] })
      createResources({ type: 'ingress', fields: dic['ingress'] })
    }
    if (type === 'DELETED') {
      const namespace = object.metadata.namespace
      deleteResources({ type: 'dep', namespace, resourceName: `${object.metadata.name}-dep` })
      deleteResources({ type: 'svc', namespace, resourceName: `${object.metadata.name}-svc` })
      deleteResources({ type: 'ingress', namespace, resourceName: `${object.metadata.name}-ingress` })
    }
  })

  request.get(`${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites?watch=true`, opts).pipe(dummysite_stream)
}

maintainStatus()
//console.log(typeof(yamlDic()['dep']))

