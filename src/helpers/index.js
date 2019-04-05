var sander = require('sander')

export function getConfigPath(){
	var path = require('path')
	return path.join(process.cwd(),'mami.config.json');
}

export async function getConfigJson(){
	return JSON.parse((await sander.readFile(getConfigPath())).toString('utf-8'));
}

export async function setConfigJson(config){
	await sander.writeFile(getConfigPath(), JSON.stringify(config,null,4))
}