# kubeseal -o yaml < secret.yaml > sealedsecret.yaml
# kubectl apply -f sealedsecret.yaml
kubectl apply -f configmap.yaml

# kubectl apply -f postgres/statefulset.yaml

kubectl apply -f pingpong/deployment.yaml
kubectl apply -f pingpong/service.yaml

kubectl apply -f main-app/deployment.yaml
kubectl apply -f main-app/service.yaml

kubectl apply -f ingress.yaml