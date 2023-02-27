
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [search,setSearch] = useState(null)
  const [history,setHistory] = useState([])
  const [weather,setWeather] = useState([])
  const [prompt,setPrompt] = useState("")
  
  const getDetails = async (event) =>{
    event.preventDefault()
    
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c13cecf71893f90eebcf3b2b7d3cd7ea`
 
 const response = await fetch(url);
 const responseJson = await response.json();
console.log(responseJson)
setHistory(search)
if(responseJson.name){
  setWeather(responseJson ,{new:true})
  
  
}else{
  setWeather(null)
  setPrompt("PLEASE ENTER A VALID CITY NAME")
}
  }

  

  return (
    <>
    <form className='col g-3' >
<h1 style={{color:"blue",marginLeft:"38%"}}><strong>WEATHER APP</strong></h1>
<div className='col-auto'>
<input className="form-control" list="datalistOptions" id="exampleDataList" value={search} placeholder="enter the city name...." onChange={(e)=> setSearch(e.target.value)}/>
<button type="submit" className="btn btn-success my-3" style={{marginLeft:"44%"}} onClick={getDetails}>SEARCH</button>
</div>
    </form>
    {
      search=="" && !history=="" ? <><p style={{color:"blue"}}><strong> LAST CITY ENTRIES :</strong></p> <strong>1. {history}</strong></>:( weather?.name ?<> <div  style={{marginLeft:"35%",marginRight:"38%"}}>
      <p style={{backgroundColor:"rgb(206, 231, 206)"}}>WEATHER DETAILS OF CITY : {weather?.name}</p>
      <p>CURRENT TEMPERATURE : {weather?.main?.temp?weather?.main?.temp:"NOT FOUND"}</p>
      <p>TEMPREATURE RANGE : {weather?.main?.temp_min?weather?.main?.temp_min:" NOT FOUND"}<strong> to </strong> {weather?.main?.temp_max?weather?.main?.temp_max:"NOT FOUND"}</p>
      <p>HUMIDITY : {weather?.main?.humidity}</p>
      <p>SEA LEVEL : {weather?.main?.sea_level?weather?.main?.sea_level:"NOT FOUND"}</p>
      <p>GROUND LEVEL : {weather?.main?.grnd_level?weather?.main?.grnd_level:"NOT FOUND"}</p>
      </div>
      </> : <p style={{marginLeft:"40%" , color:"red"}}><strong>{prompt}</strong></p> )
    }
    </>
  );
}

export default App;
