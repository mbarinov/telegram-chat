const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function() {
	console.log('listening on port ', server.address().port);
});
