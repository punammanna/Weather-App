@Library('shared') _

pipeline {
    agent any

    stages {

        stage("Hello") {
            steps {
                script {
                    hello()
                }
            }
        }

        stage("Code") {
            steps {
                script {
                    clone("https://github.com/punammanna/Weather-App.git", "main")
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    docker_build("weather-app", "latest", "punamdevpos")
                }
            }
        }

        stage("Push to Docker Hub") {
            steps {
                script {
                    docker_push("weather-app", "latest", "punamdevpos")
                }
            }
        }

        stage("Deploy") {
            steps {
                script {
                    echo "Deploying the application..."
                    
                    // Stop and remove existing container if running
                    sh "docker rm -f weather-prod || true"
                    
                    // Pull the image from Docker Hub
                    sh "docker pull punamdevpos/weather-app:latest"
                    
                    // Run the container
                    sh "docker run -d -p 80:80 --name weather-prod punamdevpos/weather-app:latest"
                    
                    // Verify deployment
                    sh "docker ps | grep weather-prod"
                    echo "Application deployed successfully!"
                }
            }
        }
    }
}
