const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
   .prompt({
       message: "Enter your GitHub username",
       name: "username"
   },
   {
       message: "What is your favorite color?",
       name: "username"
   }
   )
   .then(({username}) => {
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        axios.get(queryUrl).then(res => {
            const repoNames = res.data.map(repo => repo.name + "\n");
            fs.writeFile("repos.txt", repoNames, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(`You saved ${repoNames.length}`);
            });
        });
   });
    
   



   /* Taken From Develop part of homework Repo 

const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {

init();
*/