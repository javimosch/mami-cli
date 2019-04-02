var express = require('express');
var app = express();

var {saveUserRepos, saveUserSocialOAuth} = require('./db')
var {atob, btoa} = require('./utils')

var githubApp = {
	client_id: 'f9fec71eae0cb08dbba8'
}

//git clone https: //9e6104cc872efac902be00727cd83efb1e6f20e1@github.com/javimosch/todo-react-hooks-context.git



app.get('/', function(req, res) {
	res.send('System Up!');
});

//http://localhost:3000/connect/github/javimosch
app.get('/connect/github/:userName', async (req, res) => {
	
	let state = btoa(JSON.stringify({
		userName: req.params.userName
	}));
	console.log('authorizing',{
		state
	})
	let authorizationUrl = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${githubApp.client_id}&state=${state}`
	res.redirect(authorizationUrl);
})

app.get('/repos', async (req, res) => {
	const GitHub = require('github-api');
	let gh = new GitHub({
		token: '9e6104cc872efac902be00727cd83efb1e6f20e1'
	});
	let result = await gh.getUser().listRepos({
		type: "owner"
	})
	console.log('result', {
		single: result.data[0]
	})
	await saveUserRepos(result.data);
	res.send('OK')
})


app.get('/oauth/github', async (req, res) => {
	console.log('OAUTH GITHUB', {
		params: req.params,
		query: req.query
	});
	let code = req.query.code
	var fetch = require('isomorphic-unfetch')

	const rawResponse = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: 'f9fec71eae0cb08dbba8',
			client_secret: '4da6e07460585b4535f176e0eaaa9f80f2f9a958',
			code,
			//redirect_uri: 'http://localhost:3000'
		})
	});
	const content = await rawResponse.json();

	console.log('github oauth access_token response', {
		content
	});

	let state = null
	try{
		state = JSON.parse(atob(req.query.state));
	}catch(err){}

	if(!!state && !!state.userName){
		await saveUserSocialOAuth(state.userName, 'github',content)
	}

	res.send('OK')
});

app.listen(3000, function() {
	console.log('listening on port 3000!');
});

