var express = require('express');
var app = express();
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/clients',function(req,res){
  console.log("receive port 8888 /clients");
  MongoClient.connect("mongodb://localhost/Clients", function(error, db) {
      if (error) throw error;

      db.collection("clients").find().toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
  });
})

app.get('/clients/:id',function(req,res){
  console.log("receive port 8888 /clients/"+req.params.id);
  MongoClient.connect("mongodb://localhost/Clients", function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      // console.log("ObjectId(\""+req.params.id+"\")");
      db.collection("clients").find({"_id":o_id}).toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
  });
})

app.post('/client/')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(8888,function(){
  console.log("listening on port 8888");
})
