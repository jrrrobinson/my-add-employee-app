var fs = require('fs');

var employees = []; //global array
var departments = []; //global array

module.exports.initialize = function(){
    return new Promise(function(resolve,reject){
        try
        {
            fs.readFile('data/employees.json', function(err, data){
                if(err) 
                {
                    throw err;
                    employees = JSON.parse(data);
                }
            });
            fs.readFile('data/departments.json', function(err,data){
                if(err) 
                {
                    throw err;
                    employees = JSON.parse(data);
                }
            });
        }
        
        catch(ex)
        {
            reject("Unable to read file!");
        }
        resolve("Excellent - The JSON file is successfully read.");
    });
}

module.exports.getAllEmployees = function(){
    var _getAllEmployees = [];

    return new Promise(function(resolve,reject){
        for (var i = 0; i < employees.length; i++) 
        {
            _getAllEmployees.push(employees[i]);
        }

        if (_getAllEmployees.length == 0)
        {
            reject("No Result Returned");
        }
    resolve(_getAllEmployees);
    })
}

module.exports.getEmployeesByStatus = function(status){
    var _getEmployeesByStatus = [];

    return new Promise(function(resolve,reject){
        for(let i = 0; i < employees.length; i++)
        {
            if(employees[i].status == status)
            {
                _getEmployeesByStatus.push(employees[i]);
            }
        }

        if (_getEmployeesByStatus.length == 0){
            reject("No Result Returned");
        }
        resolve(_getEmployeesByStatus);
    });
}

module.exports.getEmployeesByDepartment = function(department){
    var _getEmployeesByDepartment = [];

    return new Promise(function(resolve,reject){
        for(let i = 0; i < employees.length; i++)
        {
            if(employees[i].department == department)
            {
                _getEmployeesByDepartment.push(employees[i]);
            }
        }

        if(_getEmployeesByDepartment.length == 0){
            reject("No Result Returned");
        }
    resolve(_getEmployeesByDepartment);
    });
}

module.exports.getEmployeesByManager = function(manager) {
    var _getEmployeesByManager = [];

    return new Promise(function(resolve,reject) {
        for (let i = 0; i < employees.length; i++) 
        {
            if (employees[i].manager == manager) 
            {
                _getEmployeesByManager.push(employees[i]);
            }
        }
        if (_getEmployeesByManager.length == 0) 
        {
            reject("No Result Returned");
        }
    resolve(_getEmployeesByManager);
    });
}

module.exports.getEmployeeByNum = function(num) {

    var _getEmployeeByNum = [];

    return new Promise(function(resolve,reject)
    {
        for(let j = 0; j < employees.length; j++)
        {
            if(employees[j].num == num)
            {
                _getEmployeeByNum.push(employees[j]);
            }
        }

        if (_getEmployeeByNum.length == 0) 
        {
            reject("No Result Returned");
        }
    resolve(_getEmployeeByNum);
    });
}

module.exports.getManagers = function() {
    var _getManagers = [];

    return new Promise(function(resolve,reject)
    {
        if(employees.length == 0)
        {
            reject("No Result Returned!");
        }

        else
        {
            for (var a = 0; a < employees.length; a++) 
            {
                 if (employees[a].isManager) 
                 {
                    _getManagers.push(employees[a]);       
                 }
            }

            if (_getManagers.length == 0) 
            {
                reject("No Result Returned");
            }
        }
    resolve(_getManagers);
    });
}

module.exports.getDepartments = function() {
    var _getDepartments = [];

    return new Promise(function(resolve,reject){
        if(employees.length == 0)
        {
            reject("No Result Returned");
        }
        
        else
        {
            for (var b = 0; b < departments.length; b++) 
            {
                _getDepartments.push(departments[b]);       
            }

            if (_getDepartments.length == 0) 
            {
                reject("No Result Returned");
            }
        }
    resolve(_getDepartments);
    });
}