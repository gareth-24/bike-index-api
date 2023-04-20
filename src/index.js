import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './bike-service.js';

//Business Logic

async function getBike(city,color,distance)  {
  if(isNaN(Number(distance))){
    distance = 5;
  }
  const response = await BikeService.getBike(city,color,distance);
  // console.log("bikes 0 ",response.bikes[0])
  if (response.bikes) {
    printBikeElements(response);
  } else  {
    printError(response);
  }
}

async function getStolenCount(city,distance)  {
  if(isNaN(Number(distance))){
    distance = 5;
  }
  const response = await BikeService.getStolenCount(city,distance);
  if (response.proximity) {
    printCountElements(response);
  } else  {
    printError(response);
  }
}

//User Interface Logic

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector("#location").value;
  const color = document.querySelector("#color").value.toLowerCase();
  const distance = parseInt(document.querySelector("#distance").value);
  document.querySelector('#location').value = null;
  document.querySelector('#color').value = null;
  document.querySelector('#distance').value = null;
  document.querySelector("#bikeList").innerText = null;
  getBike(city,color,distance);
  getStolenCount(city,distance);
}

function printBikeElements(apiResponse) {
  apiResponse.bikes.forEach(function(key) {
    let bike = document.createElement("li");
    bike.append(`Bike id: ${key.id}, Make and Model: ${key.frame_model}, ${key.manufacturer_name}, ${key.year}, Color(s): ${key.frame_colors},`);
    if(key.stolen){
      const stolenInfo = document.createElement("li");
      stolenInfo.append(`Date stolen: ${key.date_stolen}, Location: ${key.stolen_location}`);
      const ulInfo = document.createElement("ul");
      ulInfo.append(stolenInfo);
      bike.append(ulInfo);
    }

    document.querySelector("#bikeList").append(bike);
  }); 
}

function printCountElements(apiResponse)  {
  document.querySelector("#stolenCount").innerText = `Number of reported stolen bikes: ${apiResponse.proximity}`
}

function printError(apiResponse){
  document.querySelector("#showResponse").innerText = `error... ${apiResponse}`;
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});


