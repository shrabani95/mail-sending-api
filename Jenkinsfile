// dev velectico=====================================================================

pipeline {
     agent any
     stages {
          stage("start") {
            steps {
               echo "building started"
               sh "sudo chown -R jenkins:jenkins /home/velectic/node_code/app"
               sh "sudo rm -rf /home/velectic/node_code/app"
            }
        }
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {              
                sh "sudo cp -r ${WORKSPACE}/ /home/velectic/node_code/app/"          
            }
            
        }
        stage("Restart-services") {
            steps {                             
                sh "sudo systemctl restart expy-pwa"
                sh "sudo systemctl status expy-pwa"
            }
            
        }
    }
}



// UAT && live=====================================================================

// pipeline {
//      agent any
//      stages {
//           stage("start") {
//             steps {
//                echo "building started"
//                sh "sudo chown -R jenkins:jenkins /var/www/html/app"
//                sh "sudo rm -rf /var/www/html/app"
//             }
//         }
//         stage("Build") {
//             steps {
//                 sh "sudo npm install"
//                 sh "sudo npm run build"
//             }
//         }
//         stage("Deploy") {
//             steps {              
//                 sh "sudo cp -r ${WORKSPACE}/ /var/www/html/app/"          
//             }
            
//         }
//         stage("Restart-services") {
//             steps {                             
//                sh "sudo systemctl restart expy-pwa"
 //               sh "sudo systemctl status expy-pwa"
//             }
            
//         }
//     }
// }

