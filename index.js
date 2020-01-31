const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

async function promptUser() {
    let data = {}
    let queryData = {}
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
            {name: "green", value: "green"}, {name: "blue", value: "blue"},
            {name: "pink", value: "pink"}, {name: "red", value: "red"}    
       ]
   }
   ])
   .then((response) => {
        const username = response.username; 
        const color = response.colors; 
        data.username = username; 
        data.color = color; 
       
    }).then(() => axios.get(`https://api.github.com/users/${data.username}`).then(response => {
        const { login, followers, following, bio, location, blog, public_repos, id } = response.data;
        console.log(login, followers, following, bio, location, blog, public_repos, id);
    
        console.log('public repos: ' + public_repos); 
        console.log('followers: ' + followers); 
        console.log('following: ' + following); 

        data.public_repos = JSON.stringify(public_repos);
        data.followers = JSON.stringify(followers);
        data.following = JSON.stringify(following);

        queryData.login = login;
        queryData.id = id;

   
    })).then(() => axios.get(`https://api.github.com/users/${queryData.login}/repos`).then(function(response) {
 
        const repoNames = response.data.map(function(repo) {
            return repo.name;
        });
        const repoNamesStr = repoNames.join("\n");
        //console.log("REPOS: \n" + repoNamesStr);

    })).then(() => axios.get(`https://avatars1.githubusercontent.com/u/${queryData.id}?v=4`).then(function(response) {
        //console.log(response.data);
        const avatar = response.data;
        data.avatar = avatar;
        //return data.avatar;
    })).then(() => axios.get(`https://api.github.com/users/${queryData.login}/starred`).then(function(response) {
        console.log('starred: ' + response.data.length);
        const starred = response.data.length;
        data.stars = starred;
        return data;
    })); 
}

   function generateHTML(data) {
    
    const colors = {
        green: {
          wrapperBackground: "antiquewhite", 
          headerBackground: "green", 
          headerColor: "black", 
          photoBorderColor: "green", 
          middleRowColor: "darkgreen",
          workExpColor: "black" 
        },
        blue: {
          wrapperBackground: "antiquewhite", 
          headerBackground: "#086788", 
          headerColor: "white", 
          photoBorderColor: "#086788", 
          middleRowColor: "#063f52",
          workExpColor: "white"
        },
        pink: {
          wrapperBackground: "antiquewhite", 
          headerBackground: "#FF8374", 
          headerColor: "white",
          photoBorderColor: "#FF8374",
          middleRowColor: "#879cdf",
          workExpColor: "white"
        },
        red: {
          wrapperBackground: "antiquewhite", 
          headerBackground: "#870603",
          headerColor: "white",
          photoBorderColor: "#870603",
          middleRowColor: "#a40000",
          workExpColor: "white"
        }
      };
     
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
                    padding: 12px;
                    width: 95%;
                    border-radius: 6px;
                }
        
                .photo-header img {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-top: -75px;
                    border: 3px solid ${colors[data.color].photoBorderColor};
                    box-shadow: rgba(231, 159, 159, 0.3) 4px 1px 20px 4px;
                }
        
                img {
                    transform: translateY(-25px);
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
                    padding: 30px 0;
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

                #mainRow1 {
                    background: #d3d3d3;
                    width: 100%; 
                    height: 24em;
                }
        
                #mainRow2 {
                    /*background: #065788; */
                    width: 100%; 
                    height: 24em;
                    background-color: ${colors[data.color].middleRowColor};
                }
        
                #mainRow3 {
                    background: #d3d3d3;
                    width: 100%; 
                    height: 24em;
                }


                #iDescription {
                    text-align: center; 
                    margin-top: 50px;
                }

                ul {
                    margin-top: 0;
                }

                #iDescription {
                   color: ${colors[data.color].workExpColor};
                }
            </style>
        
        <body>
            <div class="container">
                <div class="row">
                    <div id="mainRow1" class="col-md-12">
                        <div id="userDiv" class="card wrapper">
                            <div class="card-body">
                                <div id="imgWrap" class="photo-header">
                                    <!--Image is Hard-Coded for Now.  Change this later. -->
                                    <img src="https://avatars1.githubusercontent.com/u/55586107?v=4" class="photo-header"
                                        alt="userPic">
                                </div>
                                <div id="infoRow" class="row">
                                    <h3 class="photo-header">HI!</h3>
                                    <h2 class="photo-header">My name is Sean Cumming!</h2>
                                    <h1 id="workExp" class="photo-header workExp-date">This is where work experience goes.</h1>
                                    <ul class="nav links-nav justify-content-center">
                                        <li class="nav-link">
                                        <a class="nav-link active" href="#"><i class="fas fa-location-arrow"></i></span></a>
                                        </li>
                                        <li class="nav-link">
                                        <a class="nav-link active" href="#"><i class="fab fa-github-alt"></i>&nbsp;Github</a>
                                        </li>
                                        <li class="nav-link">
                                        <a class="nav-link active" href="#"><i class="fas fa-blog"></i>&nbsp;Blog</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mainRow2" class="col-md-12">
                        <div id="h3wrap">
                        <h4 id="iDescription">This is a description.</h4>
                        </div>
                        <div id="cardWrap">
                            <div id="inDiv2a" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    Public Repositories
                                    <span id="span1"><br>${data.public_repos}</span>
                                </div>
                            </div>
                            <div id="inDiv2a" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    Followers
                                    <span id="span2"><br>${data.followers}</span>
                                </div>
                            </div>
                            <br>
                            <div id="inDiv2b" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    GitHub Stars
                                    <span id="span3"><br>${data.stars}</span>
                                </div>
                            </div>
                            <div id="inDiv2b" class="card-background">
                                <div id="gitDisplay" class="card-body">
                                    Following
                                    <span id="span4"><br>${data.following}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mainRow3" class="col-md-12">
                    </div>
                </div>
            </div>
        </body>
        
        </html>`
    }
   
   async function init() {
    try {
      const data = await promptUser();
      console.log('data before generateHTML: ' + data)
      
      const html = generateHTML(data);
     
      await writeFileAsync("index.html", html);
  
    } catch(err) {
    console.log(err);
    }
  }
  
  init();   
  


