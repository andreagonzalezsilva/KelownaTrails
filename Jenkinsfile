pipeline{
    agent any
    environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    }

 stages{
        stage('Building'){
            steps{
                sh 'sudo npm install -g firebase-tools'
                echo 'Building...'
            }
        } 
        stage('Testing Environment'){
            steps{
            sh 'firebase deploy -P testing-example2-devops --token "$FIREBASE_DEPLOY_TOKEN"'
            input message: 'After testing. Do you want to continue with Staging Environment? (Click "Proceed" to continue)', ok: 'Proceed'
            }
        } 
        stage('Staging Environment'){
            steps{
             sh 'firebase deploy -P staging-example2-devops --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
        stage('Production Environment'){
            steps{
            sh 'firebase deploy -P production-example2-devops --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
    }

}
