import React,{useEffect,useState} from 'react'
import Mealtypes from './Mealtypes'

export default function QuickSearches() {

  const [meals, setmeals] = useState([])

  useEffect(()=>{
    fetch('http://localhost:9091/mealtypes',{method:'GET'})
    .then(res=>res.json())
    .then(data=>setmeals(data.DATA))
  },[])

  let mealList = meals.length && meals.map(item=><Mealtypes prop={item} key={item.name}></Mealtypes>)
    
  return (
    <div>
        <p className="items-heading" style={{fontWeight: "bold"}}>Quick searches</p>
        <span className="items-heading" style={{color: "#8C96AB", fontSize:"18px"}}>Discover restaurants by type of meal</span>
        <br/><br/>
        <div className="container row-div">
            <div className="row row-items" >
                {mealList}
            </div>
        </div>
    </div>
  )
}
