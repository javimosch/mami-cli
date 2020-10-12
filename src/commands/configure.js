require('colors')

export default async function configure(name){
	
	console.log(`App ${name} configured!`.black.bgWhite)
	
	
	var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
    {
    	type:"input",
    	name:"githubUrl",
    	message:"Provide the github repo url using the follow patron: <username>/<repoName>",
    	default:'',
    	validate:v=>{
    		return v.indexOf('/')!==-1 ? true : 'I expect the follow patron my dear: <username>/<repoName>';
    	},
    	filter:v=>{
    		return ({
    				username: v.split('/')[0],
    				repoName: v.split('/')[1]
    		})
    	}
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    
    console.log('answers',{
    	answers
    })
    
  });
	
}