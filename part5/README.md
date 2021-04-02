# Exercise 5.04
I will try to describe why Rancher is "better" than OpenShift from the following perspectives:

- Community support: Rancher is open-source, which means users can ask questions and discuss potential solutions in Rancher's user community when they encounter problems. Although OpenShift also has open-source versions, it does not have strong communiy support but relies more on documentation. Although OpenShift provides custom support to subscribed users, it is not helpful for individual developers who use OpenShift clusters maintained by their organizations. I used CSC Rahti 
(an OpenShift cluster maintained by CSC) last year, and when I had some problems with the cluster, I could not find solutions elsewhere but from the CSC Rahti maintainers. 

- Vendor lock-in: Rancher management tools and vanilla Kubernetes are decoupled, and it provides a clean uninstall process, which means the users
can switch to other options once their requirements change. OpenShift is more like a "processing plant" of open-source solutions. It modifies these open-source solutions and ships them as a proprietary solution. As a result, once users decide to use OpenShift, it may be very difficult to switch back to vanilla Kubernetes. 

- Supported Kubernetes versions: Rancher does not modify the vanilla Kubernetes quite much, so it can closely follow up the newest Kubernetes version.
OpenShift, as mentioned above, applies many modifications to the vanilla Kubernetes to make it more suitable for enterprise use. As a result,
its updates may be slower. As a developer, I appreciate the quick follow-up of Rancher because it allows me to explore the newest features
of Kubernetes. 

- Management of multiple clusters: Rancher is designed for multi-cluster management, and it provides a single management control plane to manage multiple clusters. 
OpenShift is originally designed for managing a single cluster. Although it has provided the feature of multi-cluster management recently, its usability is still an open question without long-term user experience. 

- Lightweight: Rancher is lighter than OpenShift. As a platform dedicated to enterprise users, OpenShift tries to include all the elements enterprises need, making it heavier and not very suitable for small companies with resource constraints. 

# Exercise 5.06
### I directly used:
- Database:
  - mongoDB, MySQL, redis: outside of the course
  - PostgresSQL: databases of the pingpong-app and the project
  
- Steaming & Messaging:
  - Apache Spark: outside of the course
  - NATS: broadcaster of the project
  
- Application Definition & Image Build:
  - Docker Compose: outside of the course
  - Helm: install Prometheus and NATS

- Continuous Integration & Delivery:
  - circleci, GitLab, TravisCI: outside of the course
  - Github Actions: Deploy the project to GKE and local Kubernetes clusters

- Scheduling and Orchestration:
  - kubernetes: This is what we focus on in this course

- Coordination and Service Discovery:
  - Netflix Eureka: outside of the course

- Service Proxies:
  - NGINX: outside of the course

- Service mesh:
  - Linkerd: monitor the project running on a kubernetes ckuster

- Container Runtime:
  - Singularity: outside of the course

- Container Registry:
  - Docker Registry, Google Container Registry: store docker images

- Kubernetets Certified Service Provider:
  - GitLab: outside of the course

- Platform:
  - Docker: build docker images
  - Red Hat OpenShift, Heroku: outside of the course
  - Google Cloud: deploy the project to a GKE cluster

- Observability and Analysis
  - Prometheus: monitor the cluster
  - Grafana: view the data from Prometheus
  - Grafana loki: check logs of the running applications

- Serverless:
  - Knative: run the serverless version of the pingpong-app

### Products/Projects that what I directly used depend on:
- Application Definition & Image Build:
  - bitnami: It provides many popular applications than can be launched on Kubernetes using Helm.

- Coordination and Service Discovery:
  - etcd: Kubernetes uses it to store cluster data, such as cluster states and configurations.

- Service Proxies:
  - traefik: K3d uses traefik ingress to expose service. 

- Cloud Native Storage:
  - GLUSTER: OpenShift can use it as its file system.
  - Google Persistent Disk: GKE uses it as the volume storages.

- Platform:
  - Rancher: We run Rancher Lab's k3s in Docker
  
 
