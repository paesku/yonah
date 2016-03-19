// Create server with default options
var request = require('request');
var server = require('contentful-webhook-server')({
	path: '/build',
	username: 'user',
	password: 'pass'
});


var werckerPostOption = {
	url: 'https://app.wercker.com/api/v3/builds/',
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		authorization: 'Bearer ' +
		'04b73af5f9603b58552658d437353c3b0673cd0be79aa0f9bdbce129b0bd05a5'
	},
	form: {
		applicationId: '56d7df8c1618a4fe2c02d7aa'
	}
};

var port = 3000;
var msg = {
	default: 'no info',
	success: 'new build triggered'
};

server.on('ContentManagement.error', function(err, req){
	console.log('err', err);
});

server.on('ContentManagement.ContentType.publish', function(req){
	console.log('ContentManagement.ContentType.publish');
	triggerBuild();
});

server.on('ContentManagement.*', function(topic, req){
	console.log('*: ' + topic);
	triggerBuild();
});

server.listen(port, function(){
	console.log('Contentful webhook server running on port ' + port)
});

function triggerBuild() {
	request(werckerPostOption, postCallback);
}

function postCallback(error, response, body) {
	var result;

	if (!error && response.statusCode == 200) {
		result = JSON.parse(body);
		build = result;
	} else {
		result = JSON.parse(error);
		build = 'err :' + result;
		console.log('err: ' + result);
	}
}
