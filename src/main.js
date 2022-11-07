// to fetch data from API
function buttonClicked(){
 
    var city = document.getElementById("city_input").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`) //OpenWeatherAPI
    .then((response) => response.json())
    .then((data) => {

        var info = data;

        display.innerHTML = "Name: " + info.name + "<br>" + "Temp: " + (info.main.temp - 273.15).toFixed(2) + "°C" + "<br>" + "Pressure: " + info.main.pressure + "hPa" + "<br>" + "Wind Direction: " + info.wind.deg + "°" + "<br>" + "Wind Speed: " + info.wind.speed + "m/s" + "<br>" + "Current Weather: " + info.weather[0].main + "<br>" + "Weather Desc: " + info.weather[0].description;

        document.getElementById("display").innerHTML = display.innerHTML;
    })
}

const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');

// assigning values from user to variables
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate')
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');

// functions to create a create file button
btnCreate.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err){
        if(err) {
            return console.log(err);
        }
        fileName.value = ""
        fileContents.value = ""
        var txtfile = document.getElementById("fileName").value;
        alert(txtfile + " text file was created.");
        console.log("The file was created.")
    })
})

// functions to create a read file button
btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    fs.readFile(file, function(err, data) {
        if(err) {
            return console.log(err);
        }
        fileName.value = ""
        fileContents.value = ""
        fileContents.value = data;
        console.log("The file was read!");
    })
})

// functions to create a update file button
btnDelete.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, function(err) {
        if(err) {
            return console.log(err);
        }
        fileName.value = ""
        fileContents.value = ""
        alert(txtfile + " has been deleted.")
        console.log("The file was deleted!")
    })
})

// functions to create a delete file button
btnUpdate.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    let contents = "\n" + fileContents.value;
    fs.appendFile(file, contents, function(err){
        if(err) {
            return console.log(err);
        }
        fileName.value = ""
        fileContents.value = ""
        var txtfile = document.getElementById("fileName").value;
        alert(txtfile + " text file was updated.");
        console.log("The file was updated.")
    })
})