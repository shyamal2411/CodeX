pipeline {
    agent any

    tools {
        nodejs "17.0.0"
    }

    stages {
        stage('Setup Node.js') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
        
        stage('Install Dependencies') {
            steps {
              echo 'Installing dependencies from machine'
                sh 'npm install'
            }
        }
    }
}
