
pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Check Node.js') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('TypeScript Check') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Build Ecommerce Website') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Website Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**',
                    fingerprint: true
            }
        }

        stage('Run Website Locally') {
            steps {
                bat 'npx vite --host 127.0.0.1 --port 3000'
            }
        }
    }
}
