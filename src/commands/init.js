export default async function commandInit(targetPath){
	var sander = require('sander');
	var path = require('path')
	
	let rootPath = process.cwd();
	
	if(targetPath!=='.'){
		rootPath = path.join(process.cwd(),targetPath)
	}
	
	var configPath = path.join(rootPath,'mami.config.json');
	
	console.log(`Initializing at ${targetPath!=='.'?targetPath:'working dir'}`);
	
	if(! await sander.exists(rootPath)){
		await sander.mkdir(rootPath);
	}
	
	let files = await sander.readdir(rootPath)
	
	if(files.length>0){
		return console.log(`Directory is not empty`)		
	}
		
	let config = {
		apps:[],
		databases:[]
	}
	sander.writeFile(configPath, JSON.stringify(config, null, 4))
	
	console.log(`Config file created`)	
	
}