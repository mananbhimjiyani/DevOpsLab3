pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'aryanbhoi-033-assignment2',
                    url: 'https://github.com/aryantambe/devopsl1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install 20
                    nvm use 20
                    node -v
                    npm -v
                    npm install
                '''
            }
        }

        stage('Build Angular App') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 20
                    npm run build --prod
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-angular-app:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker stop my-angular-app || true
                    docker rm my-angular-app || true
                    docker run -d -p 8081:80 --name my-angular-app my-angular-app:latest
                '''
            }
        }
    }
}