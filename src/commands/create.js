import {getConfigJson, setConfigJson} from '../helpers'

export default async function createCommand(name){
	var sander = require('sander')
	var path = require('path')
	
	
	let config = await getConfigJson()
	
	let match = config.apps.find(app=>app.name==name)
	if(!match){
		config.apps.push({
			name
		});
		
		await setConfigJson(config)
		
		console.log(`App ${name} created!`.black.bgWhite)
	}else{
		console.log(`App ${name} already exists!`.black.bgYellow)
	}
	
	
}