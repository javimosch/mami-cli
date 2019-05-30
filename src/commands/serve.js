import {
	integrateWithExpress
} from '../utils/apollo'
import api from '../api'
export default function serve(argv) {
	var express = require('express');
	var app = express();
	integrateWithExpress(app)
	
	api(app)

	var port = process.env.PORT || 3000;
	app.listen(port, function() {
		if (process.env.NODE_ENV != 'production') {
			console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
		} else {
			console.log(`🚀 Server ready at port ${port}`);
		}
	});

}