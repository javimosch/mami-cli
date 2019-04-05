#!/usr/bin/env node

require("regenerator-runtime/runtime")

import init from './commands/init'
import list from './commands/list'
import create from './commands/create'
import configure from './commands/configure'

var program = require('commander');
var colors = require('colors');
 
program
  .version('0.1.0')

program
  .command('init <path>')
  .description('Configures a directory to be used as a mami project')
  .action(init);
  
program
  .command('list')
  .description('List available apps')
  .action(list);
  
program
  .command('create <name>')
  .description('Create an app')
  .action(create);
  

  program
  .command('configure <name>')
  .description('Configure an app')
  .action(configure);
  
 
program.parse(process.argv);




/*


var list = require('select-shell')(
  {
    pointer: ' ▸ ',
    pointerColor: 'yellow',
    checked: ' ◉  ',
    unchecked:' ◎  ',
    checkedColor: 'blue',
    msgCancel: 'No selected options!',
    msgCancelColor: 'orange',
    multiSelect: true,
    inverse: true,
    prepend: true,
    disableInput: true
  }
);
 
var stream = process.stdin;
 
list.option(' One    ')
    .option(' Two    ')
    .option(' Three  ')
    .list();
 
list.on('select', function(options){
  console.log(options);
  process.exit(0);
});
 
list.on('cancel', function(options){
  console.log('Cancel list, '+ options.length +' options selected');
  process.exit(0);
});
*/