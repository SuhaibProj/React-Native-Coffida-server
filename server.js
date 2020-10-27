const
    dotenv = require('dotenv').config(),
    db = require('./config/db'),
    express = require('./config/express'),
    config = require('./config/config'),
    version = config.get('version');

if(dotenv.error){
  console.log(dotenv.error);
  process.exit(1);
}

const app = express();


db.connect(function(err){
    if(err){
        console.log('Unable to connect to MySQL');
        process.exit(1);
    }else{
        app.listen(3333, function() {
            console.log('API Ver: ' + version + '; Listening on port: 3333');
        })
    }
});
