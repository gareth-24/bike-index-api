export default class BikeService  {
  static async getBike(city)  {
    try {
      const response = await fetch(`https://bikeindex.org/api/v3/search?location=${city}&distance=10&stolenness=stolen`);
      //https://bikeindex.org/api/v3/search?location=Portland&stolenness=all
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        //call an error message
        throw new Error(`${response.status} ${response.statusText} 
        ${jsonifiedResponse.message}`);
      }
      return jsonifiedResponse;
    } catch(error)  {
      return error;
    }
  }
}