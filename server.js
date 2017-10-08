/***********************************************************************
*  BTI325 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Jacob Robinson 
*  Student ID: 143594166  
*  Date: October 8, 2017 
*
*  Online (Heroku) Link:
*
***********************************************************************/ 

var dataServ = require("data-service.js");

var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 3000;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);

    return new Promise (function(res,req){
      dataServ.initialize().then(function(data){
      console.log(data)
    }).catch(function(err){
      console.log(err);
    });
});
}

// Load CSS file
app.use(express.static('public'));

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", function(req,res){

    if(req.query.status){
      dataServ.getEmployeesByStatus(req.query.status).then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }
    
    else if(req.query.department){
      dataServ.getEmployeesByDepartment(req.query.department).then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }
    
    else if(req.query.manager){
      dataServ.getEmployeesByManager(req.query.manager).then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }
    
    else{
      dataServ.getAllEmployees().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }
});

app.get("/employee/:num", function(req,res){
  dataServ.getEmployeeByNum(req.params.num).then(function(data){
    res.json(data);
  }).catch(function(err){
      res.json({message: err});
  });
});

app.get("/managers", function(req,res){
  dataServ.getManagers().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
});

app.get("/departments", function(req,res){
  dataServ.getDepartments().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
});

app.use(function(req, res) {
  res.status(404).send("Sorry! Page not found!");
});

app.listen(HTTP_PORT, onHttpStart);