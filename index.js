const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
   .prompt([
   {
       type: "input",
       message: "Enter your GitHub username",
       default: "SeanCdeveloper",
       name: "username"
   }
   /*
    ,
   {
       type: "input",
       message: "What is your favorite color?",
       name: "username"
   }
   */
   ])
   .then(({username}) => {
       // const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
       const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then(res => {
           // console.log(res)
            //const repoNames = res.data.map(repo => repo.name + "\n");
        const { login, followers, following, bio, location, blog, public_repos} = res.data;
        console.log(login, followers, following, bio, location, blog, public_repos);
    
        const repoURL = `https://api.github.com/users/${login}/repos`;
        axios.get(repoURL).then(function(response) {
            const repoNames = response.data.map(function(repo) {
                return repo.name;
            });
            const repoNamesStr = repoNames.join("\n");
            console.log("REPOS: \n" + repoNamesStr);
        });
        
        fs.writeFile("generateHTML.js", repoNames, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(`You saved ${repoNames.length}`);
            }); 
        });
   });
   


   
// avatar url
  // Viewing the Response Object for my profileName: https://api.github.com/users/SeanCdeveloper


// My avatar_url:  "avatar_url": "https://avatars1.githubusercontent.com/u/55586107?v=4

/* 

Completed Stuff

* Number of repositories    

* followers

* login

* bio

* location 

* 



/* 

PDF Resume from Github Profile 

# bio Image from GitHub Profile

# User's location 

# Link to GitHub Profiile

# Resume Includes: # of public repositories, followers, GitHub stars, 

# Background-Color of PDF matches provided color.  

*/ 

   /* Taken From Develop part of homework Repo 

const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {

init();

*/