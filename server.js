var express = require('express');
var app = new express();
var PORT = 3000;

app.use(express.static('public'));
app.listen(PORT);
console.log('http://localhost:' + PORT);

