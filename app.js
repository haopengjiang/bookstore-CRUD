var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose =require ('mongoose');

var jwt= require('jsonwebtoken');




app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));




Genre =require('./models/genre');
Book =require('./models/book');
//connect to mongoose

mongoose.connect('mongodb://localhost/bookstore');
var db =mongoose.connection;


app.get('/api/version',function(req,res){
	let info = {
        version: '1.0.0',
        release: '1.0',
        description: 'System APIs'
    };
    res.json(info);
});



app.get('/api/genres', function(req,res){
	Genre.getGenres(function(err,genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', function(req,res){
	var genre=req.body;

	Genre.addGenre(genre,function(err,genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


app.get('/api/books', function(req,res){
	Book.getBooks(function(err,books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.post('/api/books', function(req,res){
	var book =req.body;

	Book.addBook(book,function(err,book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.get('/api/books/:_id', function(req,res){
	Book.getBookById(req.params._id, function(err,book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});



app.put('/api/genres/:_id', function(req,res){
	var id =req.params._id;
	var genre=req.body;

	Genre.updateGenre(id,genre,{}, function(err,genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


app.delete('/api/genres/:_id', function(req,res){
	var id =req.params._id;
	Genre.deleteGenre(id, function(err,genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/books/:_id', function(req,res){
	var id =req.params._id;
	var book=req.body;

	Book.updateBook(id,book,{}, function(err,book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', function(req,res){
	var id =req.params._id;
	Book.removeBook(id, function(err,book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(5000);

console.log('Running on port 5000');
