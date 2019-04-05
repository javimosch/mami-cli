require('colors');

import {getConfigJson} from '../helpers'

export default async function commandList(){
	var sander = require('sander')
	var path = require('path')
	
	try{
		var list = (await getConfigJson()).apps
		
		console.log('Apps:',JSON.stringify({
			list
		},null,4));
		
		if(list.length===0){
			console.log('Create your first app using','mami create <name>'.black.bgWhite)
		}
		
	}catch(err){
		console.log(err.stack)	
		console.log('Unable to list apps')
	}
	
	
	
}