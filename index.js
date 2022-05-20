// Your code here
let employeeLedger = []

function createEmployeeRecord(arr){
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }    
    return record;
}

function createEmployeeRecords(arr){
    let oArr = arr.map(e => 
        ({
            firstName: e[0],
            familyName: e[1],
            title: e[2],
            payPerHour: e[3]
        })
    )
    return oArr;
}

function createTimeInEvent(employeeRecord, timeDateString){
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(timeDateString.substr(11)),
        date: timeDateString.substr(0,10),
    }
    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeDateString){
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(timeDateString.substr(11)),
        date: timeDateString.substr(0,10),
    }
    employeeRecord.timeOutEvents.push(timeOut)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateString) {
    const timeIn = employeeRecord.timeInEvents.find(e => {
        return e.date === dateString.date
    }).hour

    const timeOut = employeeRecord.timeOutEvents.find(e => {
        return e.date === dateString.date
    }).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecord, dateString) {
    let pay = hoursWorkedOnDate(employeeRecord,dateString) * employeeRecord.payPerHour
    console.log("PAY: " + pay)
    return pay;
}

function allWagesFor(employeeRecord) {
    let totalPay = 0;
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        totalPay += wagesEarnedOnDate(employeeRecord, employeeRecord.timeInEvents[i])
    }    
    console.log("TOTALPAY: " + totalPay)
    return totalPay;
}

function calculatePayroll(employeeRecords){
     let employees = []   
     for (employee of employeeRecords) {
         employees.push(allWagesFor(obj))
     }
     return employees.reduce((a,b) => a + b) 
}

