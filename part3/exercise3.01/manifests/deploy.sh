kubeseal -o yaml < secret.yaml > sealedsecret.yaml
kubectl apply -f sealedsecret.yaml
kubectl apply -f configmap.yaml

kubectl apply -f postgres/statefulset.yaml

kubectl apply -f pingpong/deployment.yaml
kubectl apply -f pingpong/service.yaml
