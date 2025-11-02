pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                dir('Project3/Anushree') {
                    sh 'chmod +x mvnw'
                }
            }
        }
        stage('Build') {
            steps {
                dir('Project3/Anushree') {
                    sh './mvnw clean install'
                }
            }
        }
    }
}
