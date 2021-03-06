var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res){
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/sampsite';

	MongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect to the server', err);
		}
		else
		{	
			console.log('Connection established to', url);

			var collection = db.collection('testdb');
			collection.find({}).toArray(function(err, result){
				if(err)
					res.send(err);
				else if(result.length)
				{
					res.render('studentlist', { "studentlist" : result });
				}
				else
				res.send('No documents found');
			
				db.close();
			});
		}
	}); 
});

router.get('/newstudent', function(req, res){
	res.render('newstudent', {title: 'Add Student'});
});

module.exports = router;
