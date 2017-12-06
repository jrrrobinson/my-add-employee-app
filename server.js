/***********************************************************************
*  BTI325 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Jacob Robinson 
*  Student ID: 143594166 
*  Date: December 5, 2017
*
*  Online (Heroku) Link: https://infinite-headland-38920.herokuapp.com/
*
***********************************************************************/ 

var express = require("express");
var app = express();
var path = require("path");
var data_service = require("./data-service.js");

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);

    return new Promise((res, req) => {
        data_service.initialize().then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err);
        });
    });
}

// Load CSS file
app.use(express.static('public'));

// ensures that the bodyParser middleware will work correctly
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: 'layout',
  helpers: {
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
}));
app.set("view engine", ".hbs");

// setup 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.render("home");
});

// setup another route to listen on /about
app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/employees", (req, res) => {
    if (req.query.status) {
        data_service.getEmployeesByStatus(req.query.status).then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else if (req.query.department) {
        data_service.getEmployeesByDepartment(req.query.department).then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else if (req.query.manager) {
        data_service.getEmployeesByManager(req.query.manager).then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else {
        data_service.getAllEmployees().then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    }
});

app.get("/employee/:empNum", (req, res) => {
    data_service.getEmployeeByNum(req.params.empNum).then((data) => {
        res.render("employee", { data: data });
    }).catch((err) => {
        res.status(404).send("Employee Not Found!");
    });
});

app.get("/managers", (req, res) => {
    data_service.getManagers().then((data) => {
        res.render("employeeList", { data: data, title: "Employees (Managers)" });
    }).catch((err) => {
        res.render("employeeList", { data: {}, title: "Employees (Managers)" });
    });
});

app.get("/departments", (req, res) => {
    data_service.getDepartments().then((data) => {
        res.render("departmentList", { data: data, title: "Departments" });
    }).catch((err) => {
        res.render("departmentList", { data: {}, title: "Departments" });
    });
});

app.get("/employees/add", (req, res) => {
    res.render("addEmployee");
});

app.post("/employees/add", (req, res) => {
    data_service.addEmployee(req.body).then((data) => {
        console.log(req.body);
        res.redirect("/employees");
    }).catch((err) => {
        console.log(err);
    })
});

app.post("/employees/update", (req, res) => {
    console.log(req.body);
    res.redirect("/employees");
});

app.post("/employee/update", (req, res) => {
    data_service.updateEmployee(req.body).then((data) => {
        console.log(req.body);
        res.redirect("/employees");
    }).catch((err) => {
        console.log(err);
    })
});

app.use((req, res) => {
    res.status(404).send("Sorry - Page not found");
});

app.listen(HTTP_PORT, onHttpStart);