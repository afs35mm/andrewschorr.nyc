var express = require('express');
var app = express();

app.use(express.static('dist'));

exports.run = function(port){
    app.listen(port);
    console.log('Listening on port %s', port || 3000);
}
