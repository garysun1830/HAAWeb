# This web application is to find the Health Authority Area based on where the web user lives.
- ## the web user inputs the latitude and langitude of his map positon. 
- ## when the position is within B.C., the HAA name displays.
- ## when the position is outside of B.C., he is told that his position is not valid.
- ## this application calls the REST API from the server 
- ## the server URL is configured in vue.config.js
- ## this web application is created with Vue.js 3.0 
- ## this web application is test driven. use "test=1830" to turn on the test UI
- ## for development and testing, the souce code can checkout from this repository to Windows envioronment. 
- ## Visual Studio Code is the development and testing tool.
# Release Code from Dev to the Test and Production environment
1. Copy files:
  - Copy the whole source code folder to the folder on the server, accordingly.
2. Using Jenkins:
  - For 1st time release:
    - Ceate each Jenkins Pipeline for Test and Production.
    - This Pipeline configures to checkout the source code from this Github repository to the folder on the server node.
    - This is the Pipeline syntax:
      - node('ServerNode') {
      stage('git_checkout') {
        checkout(
          [
            $class: 'GitSCM', 
            branches: [[name: '*/master']], 
            doGenerateSubmoduleConfigurations: false, 
            extensions: [
              [
                $class: 'RelativeTargetDirectory', 
                relativeTargetDir: 'HAAWeb'
              ]
            ], 
            submoduleCfg: [], 
            userRemoteConfigs: [
              [
                url: 'https://github.com/garysun1830/HAAWeb.git'
              ]
            ]
          ]
        )		
      }
      stage('sonar') {
          withSonarQubeEnv {
      // some block
          }
      }
    }
  - Run Pipeline/Build using the "Build Now" button, accordingly.
# Continiously Release  
  - Create Jenkins Pipelines
  - Configure the Pipelines to trigger building by the repository changes, or with schedules
# Issues Of REST API Server Blocked By Firewalls
  - The REST API server for this web application is host at http://84521.ddns.com, which is blocked by many firewalls.
  - When this web application fails with network connection issues, please disconnect from the VPN network.
  - Within our BC government network, even without VPN connection, it is still blocked. Please try to use a public network, such as a home Shaw or Telus networks.
  - Please contact gary.sun@gov.bc.ca when this web application gets blocked.
