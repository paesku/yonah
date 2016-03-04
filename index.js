// Create server with default options
var request = require('request');
var server = require('contentful-webhook-server')({
  path: '/',
  username: 'user',
  password: 'pass'
});


var options = {
  url: 'http://app.wercker.com/api/v3/builds/',
  json: true,
  body: {
    'applicationId': '56d934359d5cf1b5731e6d1d'
  }
};


server.on('ContentManagement.error', function(err, req){
  console.log(err);
});

server.on('ContentManagement.ContentType.publish', function(req){
  console.log('ContentManagement.ContentType.publish');
  triggerBuild();
});

server.on('ContentManagement.*', function(topic, req){
  console.log('*: ' + topic);
  triggerBuild();
});

server.listen(3000, function(){
  console.log('Contentful webhook server running on port ' + 3000)
});

function triggerBuild() {
  console.log('build triggered');
  request(options, callback);
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    console.log(result)
  }
  else {
    console.log(error)
  }
}
