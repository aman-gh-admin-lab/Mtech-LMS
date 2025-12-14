pipeline {
    agent any

    environment {
        IMAGE_NAME = "lms-frontend"
        FRONTEND_CONTAINER = "lms-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'dev', url: 'https://github.com/aman-gh-admin-lab/Mtech-LMS.git'
            }
        }

        stage('Read Version') {
            steps {
                script {
                    def pkg = readJSON file: 'webapp/package.json'
                    env.APP_VERSION = pkg.version
                    echo "Building version ${env.APP_VERSION}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${APP_VERSION} ./webapp"
                }
            }
        }


        stage('Deploy Frontend Container') {
    steps {
        script {
            sh '''
            docker stop ${FRONTEND_CONTAINER} || true
            docker rm ${FRONTEND_CONTAINER} || true

            docker run -d -p 80:80 --name ${FRONTEND_CONTAINER} ${IMAGE_NAME}:${APP_VERSION}
            '''
        }
    }
}
    }

    post {
        success {
            echo "✅ LMS Frontend Deployed Successfully!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
