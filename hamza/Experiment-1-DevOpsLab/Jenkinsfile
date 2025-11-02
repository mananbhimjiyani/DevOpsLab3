pipeline {
  agent any
  environment {
    IMAGE = "aidenpanvalkarbtech2022/sample-flask-app"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE:${BUILD_NUMBER} .'
      }
    }
    stage('Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE:${BUILD_NUMBER}'
        }
      }
    }
    stage('Deploy (optional)') {
      steps {
        sh 'docker rm -f sample_app || true'
        sh 'docker run -d -p 5000:5000 --name sample_app $IMAGE:${BUILD_NUMBER}'
      }
    }
  }
  post {
    always {
      sh 'docker image prune -f || true'
    }
  }
}
