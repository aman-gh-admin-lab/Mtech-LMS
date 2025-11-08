pipeline {
    agent any

    environment {
        REGISTRY = "amanmohammad2608"
        IMAGE_NAME = "lms-frontend"
        FRONTEND_CONTAINER = "lms-frontend"
        BACKEND_URL = "http://<backend-ip>:5000"
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
                    sh "docker build -t ${REGISTRY}/${IMAGE_NAME}:${APP_VERSION} ./webapp"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh """
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push ${REGISTRY}/${IMAGE_NAME}:${APP_VERSION}
                    """
                }
            }
        }

        stage('Deploy Frontend Container') {
            steps {
                script {
                    sh """
                    docker pull ${REGISTRY}/${IMAGE_NAME}:${APP_VERSION}
                    docker stop ${FRONTEND_CONTAINER} || true
                    docker rm ${FRONTEND_CONTAINER} || true

                    docker run -d -p 80:80 --name ${FRONTEND_CONTAINER} ${REGISTRY}/${IMAGE_NAME}:${APP_VERSION}


                    echo "🌐 Frontend is running at: http://$(hostname -I | awk '{print $1}')"
                    """
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
