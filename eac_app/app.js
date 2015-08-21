'use strict';
// npm install express express-hbs

function create(hbs, env) {

	if (env)
		process.env.NODE_ENV = env;

	var express = require('express');
	var http = require('http');
	var app = express();
	var fs = require('fs');
	var path = require('path');
	var viewsDir = __dirname + '/views';

   	var util = require('util');
   	var format = require('util').format;
    var formidable = require('formidable');

	app.use(express.json());
	app.use(express.urlencoded());

	app.use(express.static(__dirname + '/public'));
	//app.use(express.bodyParser());

	// Hook in express-hbs and tell it where known directories reside
	app.engine('hbs', hbs.express3({
			partialsDir : [__dirname + '/views/partials', __dirname + '/views/partials-other'],
			defaultLayout : __dirname + '/views/layout/default.hbs'
		}));
	app.set('view engine', 'hbs');
	app.set('views', viewsDir);

	//CONNECT TO SERVER
	var mysql = require('mysql');
	/*var connection = mysql.createConnection({
			host : '4eff38b29f1e4a3c5a4744769415c053d21f1cae.rackspaceclouddb.com',
			user : 'martin',
			password : 'joshua',
			database : 'artawards',
		});*/
 	
 	 //CONNECT TO LOCAL HOST	
 	var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'eac',
		});

	/*var dbconfig = mysql.createConnection({
			host : '4eff38b29f1e4a3c5a4744769415c053d21f1cae.rackspaceclouddb.com',
			user : 'martin',
			password : 'joshua',
			database : 'ArtAwardsMaster',
		});
		var dbconnection;

		function handleDisconnect() {
		  dbconnection = mysql.createConnection(dbconfig); // Recreate the connection, since
		                                                  // the old one cannot be reused.

		  dbconnection.connect(function(err) {              // The server is either down
		    if(err) {                                     // or restarting (takes a while sometimes).
		      console.log('error when connecting to db:', err);
		      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
		    }                                     // to avoid a hot loop, and to allow our node script to
		  });                                     // process asynchronous requests in the meantime.
		                                          // If you're also serving http, display a 503 error.
		 dbconnection.on('error', function(err) {
		    console.log('db error', err);
		    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
		      handleDisconnect();                         // lost due to either server restart, or a
		    } else {                                      // connnection idle timeout (the wait_timeout
		      throw err;                                  // server variable configures this)
		    }
		  });
		}

		handleDisconnect();


 		function keepalive() {
  			connection.query('select 1', [], function(err, result) {
    		if(err) return console.log(err);
    		// Successul keepalive
  			});
		}
		
		setInterval(keepalive, 1000000*60*5);*/

	// Register sync helper
	hbs.registerHelper('link', function (text, options) {
		var attrs = [];
		for (var prop in options.hash) {
			attrs.push(prop + '="' + options.hash[prop] + '"');
		}
		return new hbs.SafeString(
			"<a " + attrs.join(" ") + ">" + text + "</a>");
	});

	// Register Async helpers
	hbs.registerAsyncHelper('readFile', function (filename, cb) {
		fs.readFile(path.join(viewsDir, filename), 'utf8', function (err, content) {
			cb(new hbs.SafeString(content));
		});
	});

	//handlebar each helper
	hbs.registerHelper('each', function(context, options) {
	  var ret = "";

	  for(var i=0, j=context.length; i<j; i++) {
	    ret = ret + options.fn(context[i]);
	  }

	  return ret;
	});


	app.get('/', function (req, res) {
		res.render('index', {
			title : 'EAC Art Awards, est. 1994'
		});
	});

	app.get('/index', function (req, res) {
		res.render('index', {
			title : 'EAC Art Awards, est. 1994'
		});
	});

	app.get('/about', function (req, res) {
		res.render('about', {
			title : 'EAC Art Awards - About',
		});
	});

	app.get('/info', function (req, res) {
		res.render('info', {
			title : 'EAC Art Awards - Info',
		});
	});

	app.get('/shop', function (req, res) {
		res.render('shop', {
			title : 'EAC Art Awards - Shop',
		});
	});

	app.get('/contact', function (req, res) {
		res.render('contact', {
			title : 'EAC Art Awards - Contact',
		});
	});

	app.get('/archive', function (req, res) {
		res.render('archive', {
			title : 'EAC Art Awards - Archive',
		});
	});

	app.post('/upload', function (req, res) {
		
	});

	app.get('/thank-you', function (req, res) {
		res.render('thank-you', {
			title : 'EAC Art Awards - Thank You',
		});
	});

	app.get('/rankings', function (req, res) {
		res.render('rankings', {
			title : 'EAC Art Awards - Rankings',
		});
	});

	app.post('/thank-you', function (req, res) {
		res.redirect('/thank-you');
	});

	app.post('/thank-you-2', function (req, res) {
		res.redirect('/thank-you-3');
	});


	app.get('/thank-you-2', function(req, res) {
	    res.render('thank-you-2', {
	      title: 'EAC Art Awards - Thank You Part Two',
	    });
  	});

	  app.get('/thank-you-3', function(req, res) {
	    res.render('thank-you-3', {
	      title: 'EAC Art Awards - Thank You Part Three',
	    });
	  });

	  app.get('/profile', function(req, res) {
	  	 res.render('profile', {
	      title: 'EAC Art Awards - Thank You Part Three',
	    });
	  });

	app.get('/entry-details-page/:entryid/:pictureid', function (req, res,next) {
		var entryid = req.params.entryid; 
		var pictureid = req.params.pictureid;
		connection.query("select firstname,surname, fileurl, title from entries where entryid = " + entryid + " AND pictureid =  " + pictureid,
			function (err, rows, fields) {
			if (err)
				throw err;
			res.render('entry-details-page', {
			firstname : rows[0].firstname,
			surname : rows[0].surname,
			fileurl : rows[0].fileurl,
			title : rows[0].title,
			});
		 });
	});

	app.get('/gallery', function (req, res,next) {
		
		
			// connection.query("select firstname,entryid,pictureid, surname, title, fileurl from entries", function (err, rows, fields) {
			// 	if (err)
			// 		throw err;
			// 	var count = rows.length;
   //  		});

			connection.query("select firstname,entryid,pictureid, surname, title, fileurl from entries LIMIT 100", function (err, rows, fields) {
				if (err)
					throw err;

				//var count = rows.length;
				
				// var row_count;
				// var count;
				// var total_page = count / 100;
				// total_page = Math.ceil(total_page);

				var total_page = 5;
				var i = 0;
				var tile = [];
				var page_num = [];
				var m = 0;

				var n = 1;
				var j = 0;

				while (n<=total_page){
					page_num[j] = n;
					n++;	
					j++;
				}

				rows.forEach(function(rows) {
		            tile.push({
		                firstname  : rows.firstname,
		                title      : rows.title,
		                //artist     : rows.firstname + ' ' + rows.surname,
		                fileurl    : rows.fileurl,
		                surname    : rows.surname,
		                entryid    : rows.entryid,
		                view_count : genRandNum(),
		                pictureid  : rows.pictureid,
		            });
		        });

		        page_num.forEach(function(page_num) {
		        	tile.push({
		                page_num : m
		            });
		            m = m+1;
		        });

		        res.render('gallery', {
			        	tile :  rows,
			        	title : 'Gallery',
			        	page : page_num
				});
    		});

    	
	});

	app.get('/gallery/page-:pageNum', function (req, res,next) {
		var pageNum = req.params.pageNum;
		
		connection.query("select firstname,entryid,pictureid, surname, title, fileurl from entries LIMIT 100 OFFSET " + (pageNum*100), function (err, rows, fields) {
			if (err)
				throw err;

			var total_page = 4;
			var i = 0;
			var tile = [];
			var page_num = [];
			var m = 0;

			var n = 1;
			var j = 0;

			while (n<=total_page){
				page_num[j] = n;
				n++;	
				j++;
			}

			
			rows.forEach(function(rows) {
	            tile.push({
	                firstname  : rows.firstname,
	                title      : rows.title,
	                //artist     : rows.firstname + ' ' + rows.surname,
	                fileurl    : rows.fileurl,
	                surname    : rows.surname,
	                entryid    : rows.entryid,
	                view_count : genRandNum(),
	                pictureid  : rows.pictureid,
	            });

	         page_num.forEach(function(page_num) {
		        	tile.push({
		                page_num : m
		            });
		            m = m+1;
		        });
        });

        res.render('gallery', {
	        	tile :  rows,
	        	title : 'Entrant Gallery',
	        	page : page_num,
	        	endPage : total_page,
	        	firstPage : 1,
	        });

    	});
	});

	function genRandNum() {
    return Math.floor(Math.random()*1000)+1;
	}

	app.post('/galleryTiles', function (req, res) {
		res.render('galleryTiles', {
			artist : req.body.artist,
			username : req.body.username,
			firstname : req.body.firstname,
			surname : req.body.surname,
			title : req.body.title,
			fileurl : req.body.fileurl,
			view_count : genRandNum(),
			entryid : req.body.entryid,
			pictureid : req.body.pictureid,
			layout : null,
		});
	});

	app.get('/profile/:firstname-:surname', function (req, res,next) {
		res.render('profile', {
			firstname : req.params.firstname,
			surname : req.params.surname,
		});
	});
	
	app.post('/getEntries', function (req, res) {
		var artist = req.body.artist;
		var firstname = req.body.firstname;
		var surname = req.body.surname;
		var entryid = req.body.entryid;
		var pictureid = req.body.pictureid;
		if (artist == undefined || artist == null) {
			artist = '';
		}
		
		connection.query("select firstname,entryid,pictureid, surname, title, fileurl from entries",// where firstname like '%" + artist + "%' or surname like '%" + artist + "%'",
			function (err, rows, fields) {
			if (err)
				throw err;

			res.end(JSON.stringify({
					count : rows.length,
					data : rows
				}));
		});
	})
	
	app.post('/searchByArtist', function (req, res) {
		var artist = req.body.artist;
		var page = req.body.page;
		var firstname = req.body.firstname;
		var surname = req.body.surname;
		console.log(page);
		var entryid = req.body.entryid;
		var pictureid = req.body.pictureid;

		if (artist == undefined || artist == null) {
			artist = '';
		}
		connection.query("select email,entryid,pictureid firstname, surname, title, fileurl from entries where firstname = " + firstname + "  or surname = " + surname + " limit " + (page * 12) + " , 12",
			function (err, rows, fields) {
			if (err)
				throw err;

			res.end(JSON.stringify({
					count : rows.length,
					data : rows
				}));
		});
	})

	app.get('/searchByCategory/:category', function (req, res) {
		var category = req.params.category;
		var artist = req.body.artist;
		var firstname = req.body.firstname;
		var surname = req.body.surname;
		var fileurl = req.body.fileurl;
		var entryid = req.body.entryid;
		var title = req.body.title;
		var pictureid = req.body.pictureid;

		if (artist == undefined || artist == null) {
			artist = '';
		}
		connection.query("select email,entryid,pictureid firstname, surname, title, fileurl from entries where 'category' ='"+category+"'",
			function (err, rows, fields) {
			if (err)
				throw err;

			res.render('gallery', {
				firstname : firstname,
				surname : surname,
				fileurl : fileurl,
				title : title,
			});
		});
	})

	app.get('/queryjson.json', function(req,res){
 		var firstname = req.body.request;
 		var surname = req.body.request;
 		var artist = firstname + ' ' + surname;
		connection.query("select firstname, surname from entries",
			function (err, rows, fields) {
			if (err)
				throw err;
			// res.end(JSON.stringify(rows));
			 res.end(JSON.stringify({
			//  		count : rows.length,
			  		data : rows
			  }));
		});
	})

	app.get('/entry', function (req, res) {
		res.render('entry', {
			title : 'EAC Art Awards - Entry',
		});
	});

	app.post('/upload', function(req, res,next){
	
		var form = new formidable.IncomingForm;
		//files = [],
		//fields = [];
	
		form.keepExtensions = true;
		form.uploadDir = __dirname + '/public/upload';
		console.log(form.uploadDir);
	
		form.parse(req, function(err, fields, files){
	      	if (err) return res.end('You found error');
	      	// do something with files.image etc
	      	console.log(files.image);
	      
	    	});
	
		form.on('progress', function(bytesReceived, bytesExpected) {
	        console.log(bytesReceived + ' ' + bytesExpected);
	    	});
	    	
		form.on('progress', function(bytesReceived, bytesExpected) {
	        console.log(bytesReceived + ' ' + bytesExpected);
	    	});
	 
		form.on('error', function(err) {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.end('error:\n\n'+util.inspect(err));
		});
	
	    	res.redirect('/enter');
    		return;
    
	});

	return app;
}

if (require.main === module) {
	var hbs = require('..');
	var app = create(hbs);
	app.listen(8082);
	console.log('Express server listening on port 8082');
} else {
	exports.create = create;
}
