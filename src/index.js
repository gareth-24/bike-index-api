import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './bike-service.js';

//Business Logic

async function getBike(city)  {
  const response = await BikeService.getBike(city);
  console.log("bikes 0 ",response.bikes[0])
  if (response.bikes) {
    printElements(response);
  } else  {
    printError(response);
  }
}

//User Interface Logic

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector("#location").value;
  document.querySelector('#location').value = null;
  document.querySelector("#bikeList").innerText = null;
  getBike(city);
}

/*
over arching list
1) make model
  *) stolen info
2) make model
3) make model
  *) stolen
*/


function printElements(apiResponse) {
  apiResponse.bikes.forEach(function(key) {
    let bike = document.createElement("li");
    bike.append(`Bike id: ${key.id}, Make and Model: ${key.frame_model}, ${key.manufacturer_name}, ${key.year}`);

    if(key.stolen){
      const stolenInfo = document.createElement("li");
      stolenInfo.append(`Date stolen: ${key.date_stolen}, Location: ${key.stolen_location}`);
      const ulInfo = document.createElement("ul");
      ulInfo.append(stolenInfo);
      bike.append(ulInfo);
    }

    document.querySelector("#bikeList").append(bike);
  }); 
  // document.querySelector("#showResponse").innerText = `Bike id: ${apiResponse.bikes[0].id}, Make and Model: ${apiResponse.bikes[0].frame_model}, ${apiResponse.bikes[0].manufacturer_name}, ${apiResponse.bikes[0].year}`;
}

function printError(apiResponse){
  document.querySelector("#showResponse").innerText = `error... ${apiResponse}`;
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});


