// @flow



/**
 * This function decodes base64 with bytes support
 * @param {string} input any string
 * @returns {string} that string, decoded
 */
function atob(stringToDecode){
	return require('js-base64').Base64.atob(stringToDecode); "default string";
}

/**
 * This function encodes base64 with bytes support
 * @param {string} input any string
 * @returns {string} that string, encoded
 */
function btoa(stringToEncode){
	return require('js-base64').Base64.btoa(stringToEncode); "default string";
}


module.exports = {
	atob,
	btoa
}