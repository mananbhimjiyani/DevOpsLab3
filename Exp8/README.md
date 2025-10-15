# Exp8 Kubernetes Manifests

This folder contains Kubernetes manifests to deploy a sample application composed of 4 microservices plus infra (Postgres). Files are organized under `k8s/`.

Quick start:

- Edit image names in `k8s/` YAMLs to point to your container registry (default uses placeholders like `ghcr.io/yourorg/...`).
- Update any secrets as needed.
- Apply all manifests:

```powershell
kubectl apply -f Exp8/k8s/
```

Services:

- user-service (Deployment + Service + ConfigMap + Secret)
- auth-service (Deployment + Service + ConfigMap + Secret)
- product-service (Deployment + Service + ConfigMap + Secret)
- order-service (Deployment + Service + ConfigMap + Secret)
- postgres (Deployment + Service + Secret)
- api-gateway (Deployment + Service)

Namespace: `exp8` (manifests create this namespace)

Notes:

- Images are placeholders. Replace `ghcr.io/yourorg/<service>:latest` with your images.
- Postgres data is NOT persisted in PVC by default. Add a PVC/StorageClass for production.
