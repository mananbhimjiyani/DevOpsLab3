pipeline {
    agent any

    tools {
        // This uses the Maven tool you configured in Jenkins
        maven 'Maven1'
    }

    environment {
        // This uses the Docker Hub credential you created in Jenkins
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
        // Your Docker Hub username
        DOCKER_HUB_USERNAME = 'manraj110'
        IMAGE_NAME = "kubernets-app" // The name for your application's image
    }

    stages {
        stage('Build, Push, and Deploy') {
            steps {
                // This block runs all commands inside your local project folder
                dir('/Users/manraj/Collage/Dev Ops L/kubernets') {
                    
                    echo '--> Step 1: Building the .jar file...'
                    sh 'mvn clean package'

                    script {
                        def dockerImageName = "${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest"

                        echo "--> Step 2: Building Docker image: ${dockerImageName}"
                        docker.build(dockerImageName)

                        echo "--> Step 3: Logging in and Pushing Docker image..."
                        sh "docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}"
                        sh "docker push ${dockerImageName}"
                    }

                    echo '--> Step 4: Deploying to Kubernetes...'
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl rollout status deployment/kubernets-app-deployment'
                }
            }
        }
    }
    post {
        success {
            echo '✅ Pipeline successful! Run "kubectl get services" to find the access port.'
        }
    }
}