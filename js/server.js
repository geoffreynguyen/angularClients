var express = require('express');
var app = express();
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');

var dbName = "mongodb://localhost/Clients";
var clientTable = "clients";
var folderTable = "informations";

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/clients',function(req,res){
  console.log("receive port 8888 /clients");
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;

      db.collection(clientTable).find().toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.get('/client/:id',function(req,res){
  console.log("receive port 8888 /client/"+req.params.id);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      // console.log("ObjectId(\""+req.params.id+"\")");
      db.collection(clientTable).find({"_id":o_id}).toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.post('/clients/', function(req, res) {
    var name = req.body.nom;
    var surname = req.body.prenom;

    MongoClient.connect(dbName, function(error, db) {
        if (error) throw error;

        db.collection(clientTable).insert(req.body, function (error, results) {
          if (error) throw error;
          // use insertedCount to know how many is insert
          res.json(results);
        });
        db.close();
    });
});

app.delete('/client/:id',function(req,res){

  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      // use n to know it was delete
      db.collection(clientTable).deleteOne({"_id":o_id}, null, function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.put('/client/:id',function(req,res){
  // res.send(req.params.id + " "+req.body.nom+" "+req.body.prenom);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      console.log("Before update");
      // use n to know it was delete
      db.collection(clientTable).update({"_id":o_id},{$set:{"nom":req.body.nom,"prenom":req.body.prenom}});
      console.log("After update");
      res.send("ok");
      db.close();

  });
})

app.get('/folders/',function(req,res){
  console.log("receive port 8888 /folders/");
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;

      db.collection(folderTable).find().toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.get('/folder/:id/',function(req,res){
  console.log("receive port 8888 /clients/"+req.params.id);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      db.collection(folderTable).find({"_id":o_id}).toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
    })
});



app.get('/client/:id_user/folder/',function(req,res){
  console.log("receive port 8888 /clients/"+req.params.id_user);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id_user);

      db.collection(folderTable).find({"client_id":o_id}).toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
    })
});


app.post('/folders/', function(req, res) {
    MongoClient.connect(dbName, function(error, db) {
        // Create id client to link the folder
        var o_id = new ObjectID(req.body["client_id"]);
        // Change the receive client_id
        var toSend = req.body;
        toSend["client_id"] = o_id;
        console.log(toSend);
        if (error) throw error;
        console.log('before add');
        db.collection(folderTable).insert(toSend, function (error, results) {
          if (error) throw error;
          // use insertedCount to know how many is insert
          res.json(results);
        });
        db.close();
    });
});

app.delete('/folder/:id',function(req,res){
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      // use n to know it was delete
      db.collection(folderTable).deleteOne({"_id":o_id}, null, function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.put('/folder/:id',function(req,res){
  // res.send(req.params.id + " "+req.body.nom+" "+req.body.prenom);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      console.log("Before update");
      // use n to know it was delete
      db.collection(folderTable).update({"_id":o_id},{$set:{"created":req.body.created, "last_call":req.body.last_call, "last_problem":req.body.last_problem}});
      console.log("After update");
      res.send("ok");

      db.close();
  });
})



app.listen(8888,function(){
  console.log("listening on port 8888");
})
