# mami-cli

Open source solution to host and manage web apps in your private vps.

# Features

- Each app is synced with a github repo for fast deployment (CI)
- Each app supports custom domain with https
- Each app runs on a docker container using an existing image or compose.
- MongoDB/Postgress/MySQL database

# Documentation

	## Build

	documentation build src/** -f html -o docs
	
	## Serve
	
	documentation serve --watch src/**