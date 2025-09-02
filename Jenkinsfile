pipeline {
    agent any

    stages {
        stage('Test Jenkins') {
            steps {
                echo '✅ Jenkins is working inside Docker!'
            }
        }
    }

    post {
        always {
            echo 'This will always run after the stages.'
        }
    }
}
