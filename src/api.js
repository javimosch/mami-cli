var {
	saveUserRepos,
	saveUserSocialOAuth
} = require('./db')
var {
	atob,
	btoa
} = require('./utils')

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

export default function(app) {


	app.get('/', function(req, res) {
		res.send('System Up!');
	});

	app.get('/connect/github/:userName', async (req, res) => {

		let state = btoa(JSON.stringify({
			userName: req.params.userName
		}));
		console.log('authorizing', {
			state
		})
		let authorizationUrl = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_CLIENT_ID}&state=${state}`
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
				client_id: GITHUB_CLIENT_ID,
				client_secret: GITHUB_CLIENT_SECRET,
				code,
				//redirect_uri: 'http://localhost:3000'
			})
		});
		const content = await rawResponse.json();

		console.log('github oauth access_token response', {
			content
		});

		let state = null
		try {
			state = JSON.parse(atob(req.query.state));
		} catch (err) {}

		if (!!state && !!state.userName) {
			await saveUserSocialOAuth(state.userName, 'github', content)
		}

		res.send('OK')
	});

}