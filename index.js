// Create server with default options
var request = require('request');
var server = require('contentful-webhook-server')({
  path: '/',
  username: 'user',
  password: 'pass'
});


var options = {
  url: 'https://app.wercker.com/api/v3/builds/',
  headers: {
    'applicationId': '56d934359d5cf1b5731e6d1d'
  }
};


server.on('ContentManagement.error', function(err, req){
  console.log(err);
});

server.on('ContentManagement.ContentType.publish', function(req){
  console.log('ContentManagement.ContentType.publish');
  request(options, callback);
});

server.on('ContentManagement.*', function(topic, req){
  console.log('*: ' + topic);
});

server.listen(3000, function(){
  console.log('Contentful webhook server running on port ' + 3000)
});


function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    console.log(result)
  }
  else {
    console.log(error)
  }
}

