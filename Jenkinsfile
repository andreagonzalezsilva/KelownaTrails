pipeline{
    agent any
    environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    TEST_RESULT_FILE = 'test_result.txt'
    }

 stages{
        stage('Building'){
            steps{
                echo 'Building...'
            }
        } 
        stage('Testing Environment'){
            steps{
                sh 'firebase deploy -P testing-example2-devops --token "$FIREBASE_DEPLOY_TOKEN"' 
                sh 'npm install selenium-webdriver'
                sh 'node test/testDeleteButton.js'
                
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
