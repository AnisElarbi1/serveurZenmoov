const _ = require('lodash');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var cors = require('cors')

var USERS = [
    { 'id': 1, 'username': 'testzenmoov@gmail.com' ,'password': 'azerty02'},
];

function getUsers() {
    return USERS;
}

app.use(bodyParser.json());
app.use(expressJwt({secret: 'app-super-shared-secret'}).unless({path: ['/api/auth']}));
app.use(cors())

app.get('/', function (req, res) {
    res.send('')
});
app.post('/api/auth', function(req, res) {
    const body = req.body;
    console.log('here');
    const user = USERS.find(user => user.username == body.username);
    if(!user || body.password != 'azerty02') return res.sendStatus(401);
    
    var token = jwt.sign({userID: user.id}, 'app-super-shared-secret', {expiresIn: '2h'});
    res.send({token});
});


app.get('/api/users', function (req, res) {
    res.type("json");
    res.send(getUsers());
});

app.listen(4000, function () {
    console.log('Server listening on port 4000!')
});
