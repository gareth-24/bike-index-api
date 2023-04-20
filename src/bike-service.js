export default class BikeService  {
  static async getBike(city,color,distance)  {
    try {
      const response = await fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=25&colors=${color}&location=${city}&distance=${distance}&stolenness=proximity`);
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