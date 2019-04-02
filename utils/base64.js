module.exports = {
	atob,
	btoa
}

function atob(stringToDecode){
	return require('js-base64').Base64.atob(stringToDecode);
}
function btoa(stringToEncode){
	return require('js-base64').Base64.btoa(stringToEncode);
}