import React,{useEffect,useState} from 'react'
import Headers from './Headers'
import '../styles/Filter.css'
import SearchResults from './SearchResults'

export default function Filters() {

  const [search, setsearch] = useState({
    lowerCost:'',
    UpperCost:'',
    Cuisine:[],
    city_id:'',
    sort:1
})

  const [restaurants,setrestaurants] = useState([])

  const [currentPage, setcurrentPage] = useState(1)

  const [totalPage, settotalPage] = useState(1)

  const [locations, setlocations] = useState({})

  useEffect(() => {
    fetch('http://localhost:9091/locations',{method:'GET'})
    .then(res=>res.json())
    .then(data=>setlocations(data.DATA))
}, [])

  useEffect(() => {
    fetch(`http://localhost:9091/restaurants/filters/${currentPage}`,{
      method:'POST',
      headers:{'Content-Type':'appliation/json'},
      body:JSON.stringify(search)
    })
    .then(res=>res.json())
    .then(data=>{
      setrestaurants(data.DATA);
      settotalPage((data.PAGES)/2);
  })
}, [search,currentPage])

  const handleSort = (sort) => {
    search.sort=sort;
    setsearch({...search});
  }

  const handleCost = (lcost,ucost) => {
    search.lowerCost=lcost;
    search.UpperCost=ucost;
    setsearch({...search})
  }

  const handleCuisine = (events) => {
    if(events.target.checked)
    {
      search.Cuisine.push(events.target.value)
    }
    else
    {
      let index = search.Cuisine.indexOf(events.target.value)
      search.Cuisine.splice(index,1)
    }
    setsearch({...search})
  }

  const handleCity = (events) => {
    search.city_id=events.target.value;
    setsearch({...search})
  }

  let PaginationList = []
  for(let i=1;i<=totalPage;i++)
  {
    if(i===currentPage)
    {
      PaginationList[i]=<a href={`#${i}`} className="active" onClick={()=>setcurrentPage(i)} key={i}>{i}</a>  
    }
    else
    {
      PaginationList[i]=<a href={`#${i}`} onClick={()=>setcurrentPage(i)} key={i}>{i}</a>
    }
  }
  
  let searchRestaurantsList = []
  if(restaurants.length)
    {
      searchRestaurantsList = restaurants.map((item)=><SearchResults key={item.name} prop={item}></SearchResults>)
    }
    else
    {
      searchRestaurantsList=<></>
    }

  let locationList = locations.length && locations.map(item=><option value={item.city_id} key={item.name}>{item.name}</option>) 

  return (
    <div>
      <Headers/>
      <h1 className="heading">Breakfast Places in Mumbai</h1>
      <div>
        <div className="filter">
            <br/>
            <span className="filter_span"><b>Filter</b></span>
            <br/>
            <br/>
            <label>Select Location</label>
            <br/>
            <select style={{marginLeft: "10px"}} onChange={(events)=>handleCity(events)}>
              <option defaultValue="selected">select location</option>
              {locationList}
            </select>
            <br/>
            <br/>
            <label>Cuisine</label>
            <br/>
            <input type="checkbox" value='North Indian' onChange={(events)=>handleCuisine(events)} style={{marginLeft: "10px"}}/>North Indian <br/>
            <input type="checkbox" value='South Indian' onChange={(events)=>handleCuisine(events)} style={{marginLeft: "10px"}}/>South Indian <br/>
            <input type="checkbox" value='Chinese' onChange={(events)=>handleCuisine(events)} style={{marginLeft: "10px"}}/>Chinese <br/>
            <input type="checkbox" value='Fast Food' onChange={(events)=>handleCuisine(events)} style={{marginLeft: "10px"}}/>Fast Food <br/>
            <input type="checkbox" value='Street Food' onChange={(events)=>handleCuisine(events)} style={{marginLeft: "10px"}}/>Street Food <br/>
            <br/>
            <label>Cost For Two</label>
            <br/>
            <input type="radio" name='cost' onChange={()=>handleCost(0,500)} style={{marginLeft: "10px"}}/>Less than 500 <br/>
            <input type="radio" name='cost' onChange={()=>handleCost(500,1000)} style={{marginLeft: "10px"}}/>500 to 1000 <br/>
            <input type="radio" name='cost' onChange={()=>handleCost(1000,1500)} style={{marginLeft: "10px"}}/>1000 to 1500 <br/>
            <input type="radio" name='cost' onChange={()=>handleCost(1500,2000)} style={{marginLeft: "10px"}}/>1500 to 2000 <br/>
            <input type="radio" name='cost' onChange={()=>handleCost(2000,10000)} style={{marginLeft: "10px"}}/>2000+ <br/>
            <br/>
            <label>Sort</label>
            <br/>
            <input type="radio" name='sort' checked={search.sort===1} style={{marginLeft: "10px"}} onChange={()=>handleSort(1)}/>Price Low To High <br/>
            <input type="radio" name='sort' checked={search.sort===-1} style={{marginLeft: "10px"}} onChange={()=>handleSort(-1)}/>Price High To Low <br/>
        </div>
        <div className="side_box">
            {searchRestaurantsList}
            <br/>
            <div className="pagination">
              <a  href={`#${currentPage}`} onClick={()=>setcurrentPage(currentPage-1)}> &#8810; </a>
              {PaginationList}
              <a href={`#${currentPage}`} onClick={()=>setcurrentPage(currentPage+1)}> &#8811; </a>
            </div>
        </div>
      </div>
  </div>
  )
}
