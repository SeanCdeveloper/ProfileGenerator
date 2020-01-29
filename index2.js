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
    
        let data = {}
        const repoURL = `https://api.github.com/users/${login}/repos`;
        axios.get(repoURL).then(function(response) {
            const repoNames = response.data.map(function(repo) {
                return repo.name;
            });
            const repoNamesStr = repoNames.join("\n");
            console.log("REPOS: \n" + repoNamesStr);
        }).then(function(response) {
            const repoURL = `https://api.github.com/users/${login}/repos`;
            axios.get(repoURL).then(function(response) {
                const repoNames = response.data.map(function(repo) {
                    return repo.name;
                });
                const repoNamesStr = repoNames.join("\n");
                console.log("REPOS: \n" + repoNamesStr);
                data.repoNames = repoNamesStr
            });
        }).then(function(response) {
            const repoURL = `https://api.github.com/users/${login}/repos`;
            axios.get(repoURL).then(function(response) {
                const repoNames = response.data.map(function(repo) {
                    return repo.name;
                });
                const repoNamesStr = repoNames.join("\n");
                console.log("REPOS: \n" + repoNamesStr);
                data.repoNames2 = repoNamesStr
            });
        }).then(function(response) {
            const repoURL = `https://api.github.com/users/${login}/repos`;
            axios.get(repoURL).then(function(response) {
                const repoNames = response.data.map(function(repo) {
                    return repo.name;
                });
                const repoNamesStr = repoNames.join("\n");
                console.log("REPOS: \n" + repoNamesStr);
                data.repoNames3 = repoNamesStr
            });
        })

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

