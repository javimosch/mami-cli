var config = {
	dbURI: 'mongodb://root:gtf@178.128.254.49:27017/misitioba?authSource=admin'
}
var models = {}

init();

module.exports = {
	saveUserRepos,
	saveUserSocialOAuth
}

function init() {
	var mongoose = require('mongoose')
	mongoose.connect(config.dbURI, {
		useNewUrlParser: true
	});

	let UserGithubRepoSchema = new mongoose.Schema({
		full_name: String,
		url: String
	})
	/*
		let ref= {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user_repo',
			}
	*/
	models.User = mongoose.model('user', {
		name: {
			type: String,
			required: true
		},
		enabled: {
			type: String,
			default: false
		},
		github: {
			username: String,
			oauth: {
				access_token: String,
				token_type: String
			},
			repos: [UserGithubRepoSchema]
		}
	});
}

async function createUser(data) {
	return await models.User.create(data);
}
async function createUserFromGit(ghUsername) {
	return await models.User.create({
		name: ghUsername,
		"github.username": ghUsername
	});
}

async function saveUserSocialOAuth(userName, social /*github*/ , oauthData) {
	let user = await getUserOrCreate(userName)
	user.set('github.oauth', oauthData);
	await user.save();
}
async function getUserOrCreate(name) {
	let userCount = await models.User.countDocuments({
		name
	})
	if (userCount === 0) {
		await models.User.create({
			name,
		});
	}
	return await models.User.findOne({
		name
	})
}
async function saveUserRepos(repos) {
	if (repos.length === 0) {
		throw new Error('saveUserRepos: no repos given')
	}
	if (!repos[0].owner || !repos[0].owner.login) {
		throw new Error('saveUserRepos: unable to get ghUsername')

	}
	let ghUsername = repos[0].owner.login
	let userCount = await models.User.countDocuments({
		ghUsername
	})
	if (userCount === 0) {
		await createUserFromGit(ghUsername)
	}
	let user = await models.User.findOne({
		"github.username": ghUsername
	})
	if (!user) {
		throw new Error('saveUserRepos: unable to get user')
	}
	repos.forEach(async repoData => {
		user.github.repos = []
		user.github.repos.push({
			full_name: repoData.full_name,
			url: repoData.url
		})
	})
	await user.save();
}