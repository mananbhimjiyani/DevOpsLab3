# Start Minikube
minikube start --driver=docker
minikube addons enable metrics-server

# Deploy application
kubectl apply -f scripts/php-apache.yaml

# Set up HPA
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10

# Monitor (run in another PowerShell)
# kubectl get hpa php-apache --watch

# Generate load (run in another PowerShell)
# kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"

# Cleanup (optional)
# kubectl delete deployment php-apache
# kubectl delete service php-apache
# kubectl delete hpa php-apache
# minikube stop