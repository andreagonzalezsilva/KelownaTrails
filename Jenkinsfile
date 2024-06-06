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
                script{
                    try{
                        sh 'npm install selenium-webdriver'
                        def output = sh(script: 'node test/testDeleteButton.js', returnStdout: true).trim()
             
                        // Print the output 
                        echo "Test Output: ${output}"
                    } catch (Exception e){
                        echo "Test failed: ${e.message}"
                    }
                }    
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
