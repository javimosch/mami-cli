const util = require('util');
const childProcessExec = util.promisify(require('child_process').exec);

export async function exec(cmd, options) {
	const {
		stdout,
		stderr
	} = await childProcessExec(cmd, Object.assign({
		shell: false,
		cwd: process.cwd(),
		env: process.env
	},options));
	return {
		stdout,
		stderr
	}
}