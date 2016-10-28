var express = require('express');
var app = express();

app.listen(1337, function(){
    console.log('listening on port 1337');
});

app.use('/', express.static('public'))
