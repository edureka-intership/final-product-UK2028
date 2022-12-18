import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import '../styles/HomeStyles.css'

export default function Wallpaper() {
    const [locations, setlocations] = useState({})
    const [restaurants,setrestaurants] = useState({})

    useEffect(() => {
        fetch('http://localhost:9091/locations',{method:'GET'})
        .then(res=>res.json())
        .then(data=>setlocations(data.DATA))
    }, [])

    const getRestaurantsByCity = (events) => {
        fetch(`http://localhost:9091/restaurants/city/${events.target.value}`,{method:'GET'})
        .then(res=>res.json())
        .then(data=>setrestaurants(data.DATA))
        }
      

    let locationsList = locations.length && locations.map(item=><option key={item.name} value={item.city_id}>{item.name}</option>)
    let restaurantsList=[]
    if(restaurants.length){
        restaurantsList = <ul>{restaurants.map(item=><li key={item.name}><Link to={`/details/${item.name}`}>{item.name}</Link></li>)}</ul>
    }
    else{
        restaurantsList =<></>
    } 

    return (
    <div className="container pic">
        <div className="d-inline p-4 me-5 float-end login-div">
            <a href="#" className="text-white text-decoration-none" style={{opacity:"0.6"}}>login</a>
            <a href="#" className="text-white text-decoration-none border p-2 ms-3 rounded" style={{opacity:"0.6"}}>create an account</a>
        </div>
        <div className="d-inline-flex justify-content-around align-items-center flex-column pic-flex">
                <div className="border rounded-circle bg-white logo">e!</div>
                <div style={{color:"white", fontSize:"2rem"}} className="pic-title">Find the best restaurants, cafés, and bars</div>
            <div className="box-div">
                <select className="border p-3 location-box" onChange={(events)=>getRestaurantsByCity(events)}>
                    <option defaultValue='selected'>Please type a location</option>
                    {locationsList}
                </select>
                <button className="search-box-button" style={{backgroundColor:"white"}}>
                    <i className="bi bi-search bg-white search-box-icon" style={{display:"inline",float:"left"}}></i>
                    <input type="text" placeholder="Search for restaurants" className="border p-3 search-box"/>
                    {restaurantsList}
                </button>
            </div>
        </div>
    </div>
  )
}
