const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(bodyParser.json());
app.use(cors());


const partner = require('./server/partner');
const order = require('./server/order');

app.use('/api/partner', partner);
app.use('/api/order', order);

if(process.env.NODE_ENV === 'production'){
    app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html' ))
}

app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))
app.listen(port)