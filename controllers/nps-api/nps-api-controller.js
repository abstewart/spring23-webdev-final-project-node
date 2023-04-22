//documentation:
//https://www.nps.gov/subjects/developer/api-documentation.htm#/parks/getPark

//example calls to this api:
//getParkDetails
//localhost:4000/api/parks/getPark/acad

//generalSearch
//localhost:4000/api/parks/search?stateCode=ca&searchTerm=redwood

import axios from "axios";

const NpsApiController = (app) => {
  const API_KEY = process.env.NPS_API_KEY;
  const API_BASE = "https://developer.nps.gov/api/v1";
  const RESPONSE_LIMIT = 25;
  //expecting parkId in the request url
  const getParkDetails = async (req, res) => {
    console.log("getParkDetails");

    const parkId = req.params.parkId;
    const response = await axios.get(`${API_BASE}/parks?parkCode=${parkId}&api_key=${API_KEY}`);
    //console.log(park);
    res.json(response.data);
  }

  const generalSearch = async (req, res) => {
    //e.g. /api/parks/search?stateCode=ma&searchTerm=red
    //parse out the params in the search
    console.log("generalSearch");
    let url = API_BASE + "/parks?"
    const stateCode = req.query.stateCode;
    const stateCodeStr = `stateCode=${stateCode}`;
    //console.log("stateCode: " + stateCode);
    if(stateCode){
      url += stateCodeStr;
    }
    const sTerm = req.query.searchTerm;
    const sTermStr = `q=${sTerm}`;
    //console.log("searchTerm: " + sTerm);
    if(sTerm){
      //add teh & if needed
      if(stateCode){
        url += '&'
      }
      url+=sTermStr;
    }
    //add on limit of 25
    url += `&limit=${RESPONSE_LIMIT}`
    console.log("searching: " + url);
    //make the API call with the above, depending on if stateCode exists
    const response = await axios.get(`${url}&api_key=${API_KEY}`);
    //console.log(parks)
    //return to user
    res.json(response.data);
  }


  app.get("/api/parks/getPark/:parkId", getParkDetails);
  app.get("/api/parks/search", generalSearch)
}
export default NpsApiController;

