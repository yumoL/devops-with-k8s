kubeseal -o yaml < secret.yaml > sealedsecret.yaml
kubectl apply -f sealedsecret.yaml
kubectl apply -f configmap.yaml
kubectl apply -f persistentvolume.yaml
kubectl apply -f ingress.yaml
kubectl apply -f persistentvolumeclaim.yaml
kubectl apply -f postgres/statefulset.yaml

kubectl apply -f backend/deployment.yaml
kubectl apply -f backend/service.yaml

kubectl apply -f frontend/deployment.yaml
kubectl apply -f frontend/service.yaml
