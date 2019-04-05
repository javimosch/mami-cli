# mami-cli

Small tool for hosting NodeJS apps on private vps using github hooks for continuous integration.

# Releases

- Releases will be annunced here
- No releases yet

## Installation

- npm i -g mami-cli
- yarn global add mami-cli

## Usage

- mami init my-project
- cd my-project
- mami create my-first-app (follow the steps to sync a github repo)
- mami create my-second-app (follow the steps to sync a github repo)
- mami list (view available apps and status)
- mami delete <name>
- mami configure <name> (runs the configuration steps again)

## Development

- yarn (install deps)
- npm link (link bin command)

### Start a pm2 process to compile ES6 code

- pm2 start 'nodemon --exec ./node_modules/.bin/babel src --out-dir dist --watch src -e js,html,css,jsx' --name mamiCli --no-autorestart

### After development
- npm unlink (unlink bin command)