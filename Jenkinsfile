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
                        // Install Selenium webdriver
                        sh 'npm install selenium-webdriver'

                        // Run the test and capture the output
                        def output = sh(script: 'node test/testDeleteButton.js', returnStdout: true).trim()

                        // Print the output 
                        echo "Test Output: ${output}"

                        // Write the result to a file
                        if(output.contains('Test Success')){
                            writeFile file: env.TEST_RESULT_FILE, text: 'true'
                        } else{
                            writeFile file: env.TEST_RESULT_FILE, text: 'false'
                        }
                    } catch (Exception e){
                        echo "Test failed: ${e.message}"
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
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
