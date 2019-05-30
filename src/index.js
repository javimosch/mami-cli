require('dotenv').config({
	silent: true
});
import serve from './commands/serve'

var argv = require('yargs')
	.usage('Usage: $0 <command> [options]')
	.command({
		command: 'serve', // <key> [value]
		//aliases: ['config', 'cfg'],
		desc: 'Serve Express/Apollo',
		//builder: (yargs) => yargs.default('value', 'true'),
		handler: (argv) => {
			//console.log(`setting ${argv.key} to ${argv.value}`)
			serve(argv);
		}
	})
	.help('h')
	.alias('h', 'help')
	.epilog('copyright 2019')
	.argv;