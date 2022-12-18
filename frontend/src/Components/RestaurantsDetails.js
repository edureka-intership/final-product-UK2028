import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RestaurantsDetails.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Headers from './Headers';
import Modal from 'react-modal';
import AddRemoveItems from './AddRemoveItems';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'80%',
    maxHeight:'100%'
  },
};

Modal.setAppElement('#root');


export default function RestaurantsDetails() {
    
    let {RestaurantsName} = useParams();

    const [restaurant, setrestaurant] = useState({});
    
    let {name,cost,thumb,address,Cuisine,contact_number} = restaurant;
  
    const [menuModal, setMenuModal] = useState(false)

    const [ResMenu, setResMenu] = useState({})

    const [amount,setAmount] = useState(0)

    useEffect(() => {
      fetch(`http://localhost:9091/restaurants/${RestaurantsName}`,{method:'GET'})
      .then(result=>result.json())
      .then(data=>setrestaurant(data.DATA[0]))
    },[])

    const handleMenu = () => {
      fetch(`http://localhost:9091/restaurants/menu/${RestaurantsName}`,{method:'GET'})
      .then(result=>result.json())
      .then(data=>setResMenu(data.DATA))
    } 

    const handlePayment = (razorpayUrl) => {
      return new Promise((resolve) => {
        let script = document.createElement('script')
        script.src=razorpayUrl
        script.onload = () => {
          console.log('success')
          openRazorpayWindow()
          resolve(true)
        }
        script.onerror = () => {
          console.log('failure')
          resolve(false)
        }
        document.body.appendChild(script);
      })
    }

    const openRazorpayWindow = async () => {
      let orderOptions ={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({amount:amount})
      }
      let orderdata = await fetch(`http://localhost:9091/payment/order`,orderOptions)
      .then(res=>res.json())
      let options = {
        key:'rzp_test_j4utDJIZNOsvz6',
        amount:orderdata.amount/100,
        currency:orderdata.currency,
        order_id:orderdata.id,
        prefill:{
          email:"abc@gmail.com",
          contact:"987654321"
        },
        handler: (response) => {

          response.amount=orderdata.amount/100
          
          let responseOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(response)
          }

          fetch(`http://localhost:9091/payment/save`, responseOptions)
          .then(res=>res.json())
          .then(data=>console.log(data))
        }
      }

      let razorpayWindow = new window.Razorpay(options)
      razorpayWindow.open()
    }

    const addAmount = (price) => {
      let amt = amount+price;
      setAmount(amt)
    }

    const removeAmount = (price,number) => {
      if(amount>price&&number>0)
      {
        let amt = amount - price;
        setAmount(amt)
      }  
      if(amount===price&&number>0)
      {
        setAmount(0)
      }
      if(amount<price)
      {
        setAmount(amount)
      }
    }
  
    let CuisineList = !(Cuisine===undefined) && Cuisine.length && <ol>{Cuisine.map((item)=>
      <li style={{fontSize:'110%'}} key={item.name}>{item.name}</li>)}</ol>  

    let menuList = ResMenu.length && ResMenu.map(item=>{
      return  <div style={{color:'#192F60'}} key={item.itemName}>
                <h5>{item.itemName}</h5>
                <span style={{fontSize:"120%"}} >Price:&#8377;{item.itemPrice}</span>
                <br/>
                <div>
                  {item.isVeg?<span>Veg</span>:<span>Non-Veg</span>}
                  <br/>
                  <span>{item.itemDescription}</span>
                </div>
                <AddRemoveItems prop={item} add={addAmount} remove={removeAmount} key={item.itemName}></AddRemoveItems>
                <hr/>
              </div>
    })

    return (
    <div style={{height:"1200px"}}>
        <Headers/>
        <div className='text-center' style={{display:"inline"}}>
            <img alt='' className='img-pic border border-primary ' src={thumb}/>
        </div>
        <div>
          <span style={{fontSize:'500%',color:'#192F60',marginLeft:'3%'}}>{name}</span>
          <button className='btn btn-outline-danger' onClick={()=>{setMenuModal(true);handleMenu()}} style={{float:'right',marginTop:'4.5%',marginRight:'3%'}}>Place Online Order</button>
          <Tabs style={{marginLeft:'4%'}}>
            <TabList style={{fontSize:'120%'}}>
              <Tab style={{color:'#192F60'}}>Overview</Tab>
              <Tab style={{color:'#192F60'}}>Contact</Tab>
            </TabList>
            <TabPanel>
              <div style={{fontSize:'180%',font:'bold'}}>About the place</div>
              <div style={{fontSize:'180%',font:'bold'}}>Cuisine</div>
              {CuisineList}
              <div style={{fontSize:'180%',font:'bold'}}>Average Cost :</div>
              <div style={{fontSize:'110%'}}>&#8377;{cost}</div>
            </TabPanel>
            <TabPanel>
              <div style={{fontSize:'180%',font:'bold'}}>Address :</div>
              <div style={{fontSize:'110%'}}>{address}</div>
              <div style={{fontSize:'180%',font:'bold'}}>Phone no. :</div>
              <div style={{fontSize:'110%'}}>{contact_number}</div>
            </TabPanel>
          </Tabs>
          <Modal
            isOpen={menuModal}
            style={customStyles}
            >
              <h2 style={{color:'#192F60'}}>{name}</h2>
              <br/>
              <button className='btn btn-danger' style={{float:"right",marginTop:"-6%"}} onClick={()=>setMenuModal(false)}>x</button>
              {menuList}
              <div>
                <h3>Subtotal:&#8377;{amount}</h3>
                {amount!==0?<button onClick={()=>{setMenuModal(false);handlePayment(`https://checkout.razorpay.com/v1/checkout.js`)}} className='btn btn-danger' style={{float:'right',marginTop:'-4%'}}>Pay Now</button>:<></>}
              </div> 
          </Modal>
        </div>
    </div>
  )
}
