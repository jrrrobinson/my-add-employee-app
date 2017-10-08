var fs = require("fs");

var employees = []; //global array
var departments = []; //global array

module.exports.initialize = function(){
    return new Promise(function(resolve,reject){
        try{
            fs.readFile('./data/employees.json', function(err, data){
                if(err) throw err;
                employees = JSON.parse(data);
            });
            fs.readFile('./data/departments.json', function(err,data){
                if(err) throw err;
                departments = JSON.parse(data);
            });
        }catch(ex){
            reject("Unable to read file!");
        }
        resolve("Good!!! It's successfully read JSON file.");
    });
}

module.exports.getAllEmployees = function(){
    var arryAllEmployees=[];
    return new Promise(function(resolve,reject){
        for (var i = 0; i < employees.length; i++) {
            arryAllEmployees.push(employees[i]);
        }
        if (arryAllEmployees.length == 0){
            reject("No Result Returned!!!");
        }
    resolve(arryAllEmployees);
    })
}

module.exports.getEmployeesByStatus = function(status){
    var arryByStatus = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employees.length; i++){
            if(employees[i].status == status){
                arryByStatus.push(employees[i]);
            }
        }
        if (arryByStatus.length == 0){
            reject("No Result Returned!!!");
        }
        resolve(arryByStatus);
    });
}

module.exports.getEmployeesByDepartment = function(department){
    var arryByDepartment = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employees.length; i++){
            if(employees[i].department == department){
                arryByDepartment.push(employees[i]);
            }
        }
        if(arryByDepartment.length == 0){
            reject("No Result Returned!!!");
        }
    resolve(arryByDepartment);
    });
}

module.exports.getEmployeesByManager = function(manager) {
    var arrayGetEmployeesByMannager = [];

    return new Promise(function(resolve,reject) {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeManagerNum == manager) {
                arrayGetEmployeesByMannager.push(employees[i]);
            }
        }
        if (arrayGetEmployeesByMannager.length == 0 ) {
            reject("No Result Returned!!!");
        }
    resolve(arrayGetEmployeesByMannager);
    });
}

module.exports.getEmployeeByNum = function(num) {
    return new Promise(function(resolve,reject){
        for(let j = 0; j < employees.length; j++){
            if(employees[j].employeeNum == num){
                resolve(employees[j]);
            }
        }
    reject("No Result Returned!!!");
    });
}

module.exports.getManagers = function() {
    var arryGetManagers = [];
    return new Promise(function(resolve,reject){
        if(employees.length == 0){
            reject("No Result Returned!!!");
        }else{
            for (var q = 0; q < employees.length; q++) {
                 if (employees[q].isManager == true) {
                    arryGetManagers.push(employees[q]);       
                 }
            }
            if (arryGetManagers.length == 0) {
                     reject("No Result Returned!!!");
             }
        }
        resolve(arryGetManagers);
     });
}

module.exports.getDepartments = function() {
    var arryGetDepartments = [];
    return new Promise(function(resolve,reject){
        if(employees.length == 0){
            reject("No Result Returned!!!");
        }else{
            for (var v = 0; v < departments.length; v++) {
                arryGetDepartments.push(departments[v]);       
            }
            if (arryGetDepartments.length == 0) {
                reject("No Result Return!!!");
            }
        }
    resolve(arryGetDepartments);
    });
}