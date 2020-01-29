const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
return inquirer.prompt([
   {
       type: "input",
       message: "Enter your GitHub username",
       default: "SeanCdeveloper",
       name: "username"
   }
    ,
   {
       type: "list",
       message: "What is your favorite color?",
       name: "colors",
       choices: [
         //"green", "blue", "pink", "red"
            {name: "green", value: "green"}, {name: "blue", value: "blue"},
            {name: "pink", value: "pink"}, {name: "red", value: "red"}    
       ]
   }
   ])
   .then(({username}) => {
       const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then(res => {
            //console.log(res.data)
       // const repoNames = res.data.map(repo => repo.name + "\n");
        const { login, followers, following, bio, location, blog, public_repos, id } = res.data;
        // console.log(login, followers, following, bio, location, blog, public_repos, id);
    
        const repoURL = `https://api.github.com/users/${login}/repos`;
        axios.get(repoURL).then(function(response) {
            // console.log(response);
            const repoNames = response.data.map(function(repo) {
                return repo.name;
            });
            const repoNamesStr = repoNames.join("\n");
            //console.log("REPOS: \n" + repoNamesStr);

        const avatarURL = `https://avatars1.githubusercontent.com/u/${id}?v=4`;
        axios.get(avatarURL).then(function(response) {
            //console.log(response.data);
        })

        const starredURL = `https://api.github.com/users/${login}/starred`;
        axios.get(starredURL).then(function(response) {
            // console.log(response.data);
            // console.log(response.data.length);
        }); 
    });    
});
    return {color: 'blue'}
   });
}

   /*
   fs.writeFile("generate.txt", , (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(`You saved ${repoNames.length}`);

});
*/

   function generateHTML(data) {
    const colors = {
        green: {
          wrapperBackground: "#E6E1C3",
          headerBackground: "#C1C72C",
          headerColor: "black",
          photoBorderColor: "#black"
        },
        blue: {
          wrapperBackground: "#5F64D3",
          headerBackground: "#26175A",
          headerColor: "white",
          photoBorderColor: "#73448C"
        },
        pink: {
          wrapperBackground: "#879CDF",
          headerBackground: "#FF8374",
          headerColor: "white",
          photoBorderColor: "#FEE24C"
        },
        red: {
          wrapperBackground: "#DE9967",
          headerBackground: "#870603",
          headerColor: "white",
          photoBorderColor: "white"
        }
      };
      /* Was only data in parameter below */
        return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
            <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
            <title>mockHTML</title>
            <style>
                @page {
                    margin: 0;
                }
        
                *,
                *::after,
                *::before {
                    box-sizing: border-box;
                }
        
                html,
                body {
                    padding: 0;
                    margin: 0;
                }
        
                html,
                body,
                .wrapper {
                    height: 100%;
                }
        
                /* This is the #userDiv, below, holding the main bio information  */
                .wrapper {
                    background-color: ${colors[data.color].wrapperBackground};
                    padding-top: 3.5em;
                    /* remove background below*/
                    /*background: gold;*/
                    margin-left: 5%;
                    margin-right: 5%;
                    transform: translateY(2em);
                }
        
                body {
                    background: rgb(82, 86, 89);
                    -webkit-print-color-adjust: exact !important;
                    font-family: 'Cabin', sans-serif;
                }
        
                main {
                    background-color: #E9EDEE;
                    height: auto;
                    padding-top: 30px;
                }
        
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-family: 'BioRhyme', serif;
                    margin: 0;
                }
        
                h1 {
                    font-size: 3em;
                }
        
                h2 {
                    font-size: 2.5em;
                }
        
                h3 {
                    font-size: 2em;
                }
        
                h4 {
                    font-size: 1.5em;
                }
        
                h5 {
                    font-size: 1.3em;
                }
        
                h6 {
                    font-size: 1.2em;
                }
        
                .photo-header {
                    position: relative;
                    margin: 0 auto;
                    /* Was -50px, Below */
                    margin-bottom: -25px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    background-color: ${colors[data.color].headerBackground};
                    color: ${colors[data.color].headerColor};
                    padding: 10px;
                    width: 95%;
                    border-radius: 6px;
                }
        
                .photo-header img {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-top: -75px;
                    border: 6px solid ${colors[data.color].photoBorderColor};
                    box-shadow: rgba(231, 159, 159, 0.3) 4px 1px 20px 4px;
                }
        
                .photo-header h1,
                .photo-header h2 {
                    width: 100%;
                    text-align: center;
                }
        
                .photo-header h1 {
                    margin-top: 10px;
                }
        
                .links-nav {
                    width: 100%;
                    text-align: center;
                    padding: 20px 0;
                    font-size: 1.1em;
                }
        
                .nav-link {
                    display: inline-block;
                    margin: 5px 10px;
                }
        
                .workExp-date {
                    font-style: italic;
                    font-size: 1em;
                    /* was set to "left"*/
                    text-align: center;
                    margin-top: 10px;
                }
        
                .container {
                    padding: 50px;
                    padding-left: 100px;
                    padding-right: 100px;
                }
        
                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
        
                #infoRow {
                    padding-top: 1em;
                }
        
                .card-background {
                    padding: 20px;
                    border-radius: 6px;
                    background-color: ${colors[data.color].headerBackground};
                    color: ${colors[data.color].headerColor};
                    margin: 20px;
                    /* change this later*/
                    background: #d3d3d3;
                    width: 40%;
                    display: inline-block;
                }
        
                #gitDisplay {
                    font-family: 'BioRhyme';
                    font-size: 16pt;
                    height: 2.5em;
                    font-weight: bold;
                }
        
                #cardWrap {
                    text-align: center;
                }
        
                .col {
                    flex: 1;
                    text-align: center;
                }
        
                a,
                a:hover {
                    text-decoration: none;
                    color: inherit;
                    font-weight: bold;
                }
        
                @media print {
                    body {
                        zoom: .75;
                    }
                }
            </style>
        
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-md-12" style="background: #d3d3d3; width:100%; height: 24em;">
                        <!--Was id="userDiv"-->
                        <div id="userDiv" class="card wrapper">
                            <div class="card-body">
                                <div id="imgWrap" class="photo-header">
                                    <!--Image is Hard-Coded for Now.  Change this later. -->
                                    <img src="https://avatars1.githubusercontent.com/u/55586107?v=4" class="photo-header"
                                        alt="userPic">
                                </div>
                                <div id="infoRow" class="row">
                                    <h3 class="photo-header">HI!</h3>
                                    <h2 class="photo-header">My name is Sean Cumming!</h1>
                                        <h1 class="photo-header workExp-date">This is where work experience goes.</h1>
                                        <ul style="margin-top: 0" class="nav links-nav justify-content-center">
                                            <li class="nav-link">
                                                <a class="nav-link active" href="#">Link</a>
                                            </li>
                                            <li class="nav-link">
                                                <a class="nav-link active" href="#">Link</a>
                                            </li>
                                            <li class="nav-link">
                                                <a class="nav-link active" href="#">Link</a>
                                            </li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" style="background: #065788; width:100%; height: 24em;">
                        <div id="h3wrap">
                            <h4 style="background: gold; text-align: center; margin-top: 50px;">This is a description.</h4>
                        </div>
                        <div id="cardWrap">
                            <div id="inDiv2a" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    Public Repositories
                                    <span></span>
                                </div>
                            </div>
                            <div id="inDiv2a" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    Followers
                                    <span></span>
                                </div>
                            </div>
                            <br>
                            <div id="inDiv2b" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    GitHub Stars
                                    <span></span>
                                </div>
                            </div>
                            <div id="inDiv2b" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    Following
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" style="background: #d3d3d3; width:100%; height: 24em;">
                    </div>
                </div>
            </div>
        </body>
        
        </html>`
    }
   
   async function init() {
    // console.log("hi")
    try {
      const data = await promptUser();
      console.log(data)
  
      const html = generateHTML(data);
      console.log(html);
      await writeFileAsync("index1.html", html);
  
    //   console.log("Successfully wrote to index.html");
    } catch(err) {
    console.log(err);
    }
  }
  
  init();   
     



   
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