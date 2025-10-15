# Exp9 — Apache HTTPD on Kubernetes (NodePort)

This example deploys a simple Apache HTTP server (httpd) in Kubernetes and exposes it via a NodePort so you can access it from the host machine for learning/testing.

Files are under `Exp9/k8s/`:

- `namespace.yaml` — creates namespace `exp9`
- `configmap.yaml` — provides an `index.html` served by Apache
- `deployment.yaml` — Deploys `httpd:2.4` and mounts the config
- `service.yaml` — Exposes the Deployment as a `NodePort` service

How to apply:

```powershell
kubectl apply -f Exp9/k8s/namespace.yaml
kubectl apply -f Exp9/k8s/configmap.yaml
kubectl apply -f Exp9/k8s/deployment.yaml
kubectl apply -f Exp9/k8s/service.yaml
```

How to access from the host:

- If you're using Minikube, run `minikube service --url -n exp9 httpd` to get the accessible URL.
- For Docker Desktop / kind / microk8s, use the NodePort listed by `kubectl get svc -n exp9`. The service will be available on any cluster node IP at that port — on a typical single-node dev machine, use `localhost:<NodePort>`.

Example to test from PowerShell (replace <PORT> with the NodePort):

```powershell
# get NodePort
kubectl get svc -n exp9

# test
Invoke-WebRequest -UseBasicParsing http://localhost:<PORT>
```

Notes:
- NodePort range is by default 30000-32767. If the specified port is blocked, change the service manifest or use port 0 (let cluster assign one) and then read the assigned port.
- For public exposure, use an Ingress or LoadBalancer in front of the service.
