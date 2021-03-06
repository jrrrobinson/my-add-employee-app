var fs = require("fs");

var employees = []; //global array
var departments = []; //global array
var empCount = 0; //emp counter

//

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile('./data/employees.json', (err, data) => {
                if (err) throw err;
                employees = JSON.parse(data);
                empCount = employees.length;
            });
            fs.readFile('./data/departments.json', (err, data) => {
                if (err) throw err;
                departments = JSON.parse(data);
            });
        } catch (ex) {
            reject("Unable to read file!");
        }
        resolve("Excellent - the JSON file is successfully read!");
    });
}

module.exports.getAllEmployees = () => {
    var arryAllEmployees = [];
    return new Promise((resolve, reject) => {
        for (var i = 0; i < employees.length; i++) {
            arryAllEmployees.push(employees[i]);
        }
        
        if (arryAllEmployees.length == 0) {
            reject("No Result Returned");
        }
        resolve(arryAllEmployees);
    })
}

module.exports.getEmployeesByStatus = (status) => {
    var arryByStatus = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status == status) {
                arryByStatus.push(employees[i]);
            }
        }

        if (arryByStatus.length == 0) {
            reject("No Result Returned");
        }
        resolve(arryByStatus);
    });
}

module.exports.getEmployeesByDepartment = (department) => {
    var arryByDepartment = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].department == department) {
                arryByDepartment.push(employees[i]);
            }
        }

        if (arryByDepartment.length == 0) {
            reject("No Result Returned");
        }
        resolve(arryByDepartment);
    });
}

module.exports.getEmployeesByManager = (manager) => {
    var arrayGetEmployeesByMannager = [];

    return new Promise((resolve, reject) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeManagerNum == manager) {
                arrayGetEmployeesByMannager.push(employees[i]);
            }
        }

        if (arrayGetEmployeesByMannager.length == 0) {
            reject("No Result Returned");
        }
        resolve(arrayGetEmployeesByMannager);
    });
}

module.exports.getEmployeeByNum = (num) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                resolve(employees[i]);
            }
        }
        reject("No Result Returned");
    });
}

module.exports.getManagers = () => {
    var arryGetManagers = [];
    return new Promise((resolve, reject) => {
        if (employees.length == 0) {
            reject("No Result Returned");
        } 
        
        else {
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].isManager) {
                    arryGetManagers.push(employees[i]);
                }
            }
            if (arryGetManagers.length == 0) {
                reject("No Result Returned");
            }
        }
        resolve(arryGetManagers);
    });
}

module.exports.getDepartments = () => {
    var arryGetDepartments = [];
    return new Promise((resolve, reject) => {
        if (employees.length == 0) {
            reject("No Result Returned");
        } 
        
        else {
            for (var i = 0; i < departments.length; i++) {
                arryGetDepartments.push(departments[i]);
            }
            if (arryGetDepartments.length == 0) {
                reject("No Result Returned");
            }
        }
        resolve(arryGetDepartments);
    });
}

module.exports.addEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    employeeData.employeeNum = ++empCount;

    return new Promise((resolve, reject) => {
        employees.push(employeeData);
        if (employees.length == 0) {
            reject("No Result Returned");
        }
        resolve(employess);
    });
}

module.exports.updateEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == employeeData.employeeNum) {
                employees.splice(employeeData.employeeNum - 1, 1, employeeData);
            }
        }
        if (employees.length == 0) {
            reject("No Result Returned");
        }
        resolve(employees);
    });
}