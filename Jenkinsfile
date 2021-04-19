def project_name = 'instant-input/cms'
def dirName = "${project_name}"-env.BRANCH_NAME
def production_branch = 'none'
def development_branch = 'staging'
def sshagent_name = 'none'
def ip_address = 'none'

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: "7"))
    }
    agent {
        docker {
            image "node:8"
            args "-v /usr/share/nginx/html/${dirName}:/var/empty2 -v /root/dcompose/${dirName}:/var/empty"
        }
    }
    stages {
        stage("Build")
        {
            steps
            {
                sh "npm install"
                script {
                    if (env.BRANCH_NAME == "${development_branch}")
                    {  
                        sh "mv .env.staging .env"
                        sh "npm run build" 
                    }else if (env.BRANCH_NAME == "${production_branch}")
                    {
                        sh "npm run build"
                        sh "cp -a build/. /var/empty/"
                    }
                }
            }
        }

        stage("Deploy")
        {
            steps
            {
                script {
                    if (env.BRANCH_NAME == "${development_branch}")
                    {
                        echo "Deleting the old build.  "
                        sh "rm -r /var/empty2/* || ls"
                        echo "Old build deleted, Deploying new build"
                        sh "cp -a build/. /var/empty2/"
                        echo "Build Deployed. "
                    }else if (env.BRANCH_NAME == "${production_branch}")
                    {   
                        sshagent ( ["${agentName}"]) {
                            sh "cd  /root/dcompose/${dirName} && ls" 
                            sh "apt-get update && apt-get install zip"
                            sh "cd  /root/dcompose/${dirName} && zip -r latest.zip ."

                            sh "scp -o StrictHostKeyChecking=no /root/dcompose/${dirName}/latest.zip ubuntu@${ip_address}:/home/ubuntu/"
                            sh "ssh -o StrictHostKeyChecking=no ubuntu@${ip_address} ls -la /home/ubuntu"
                            sh "ssh -o StrictHostKeyChecking=no ubuntu@${ip_address} sudo unzip  -o /home/ubuntu/latest.zip -d /usr/share/nginx/html/"
                        }
                    }
                }
            }
        }
    }
    post { 
        always { 
            cleanWs()
        }
    }
}
