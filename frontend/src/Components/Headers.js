import React,{useState,useEffect} from 'react'
import '../styles/RestaurantsDetails.css'
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from "gapi-script";
import FacebookLogin from 'react-facebook-login';


gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: '1012755015050-25do8m2r92qukha3aflauilb012f7c7a.apps.googleusercontent.com',
      plugin_name: 'chat',
    });
  });

export default function Headers() {

    const [loginOpen, setloginOpen] = useState(false)
    const [RegisterOpen, setRegisterOpen] = useState(false)

    const [email,setemail] = useState('')
    const [name,setName] = useState('')
    const [password,setpassword] = useState('')
    const [rePassword,setRePassword] = useState('')

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })

    const [loggedin, setloggedin] = useState(false);
    const [userData, setuserData] = useState('');
    const [userDataprofileObj, setuserDataprofileObj] = useState('');
    const [userDatatokenObj, setuserDatatokenObj] = useState('');

    const responseGoogle = (response) => {
        console.log(response);
        if (response.googleId.length > 0 && response.profileObj !== 'undefined') {
          console.log(`okay, got the googleId. that means logged in`);
          setloggedin(true);
          setuserData(response);
          setuserDataprofileObj(response.profileObj);
          setuserDatatokenObj(response.tokenObj);
          setName(userDataprofileObj.name);
          setemail(userDataprofileObj.email);
          user.name=userDataprofileObj.name;
          user.email=userDataprofileObj.email;
          setUser({...user})

          console.log('userData',userData);
          console.log('userDataprofileObj',userDataprofileObj);
          console.log('userDatatokenObj',userDatatokenObj);
          console.log("user: ",user)
        }
        else {
          console.log(`login failed.`);
        }
      }

      const responseFacebook = (res) => {
        console.log(res)
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    const handleRegister = (events) =>{
        events.preventDefault();
        if(password!==rePassword)
        {
            alert('password does not match')
        }
        if(user.name==='' || user.name==='undefined')
        {
            alert('name cannot be empty')
        }
        if(user.email==='' || user.email==='undefined')
        {
            alert('email cannot be empty')
        }
        fetch(`http://localhost:9091/register`,{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(user)})
        .then(res=>res.json())
        .then(data=>alert(data.message))
    }

    const handleLogIn = (events) => {
        events.preventDefault();
        if(user.name==='' || user.name==='undefined')
        {
            alert('name cannot be empty')
        }
        if(user.email==='' || user.email==='undefined')
        {
            alert('email cannot be empty')
        }
        if(user.password===''&&user.password==='undefined')
        {
            alert('password cannot be empty')
        }
        fetch(`http://localhost:9091/login`,{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(user)})
        .then(res=>res.json())
        .then(data=>{
            alert(data.message);
            setloggedin(true);
        })
    }

    const logOut = () => {
        setUser({name:'',email:'',password:''});
        setName('');
        setemail('');
        setpassword('');
        setRePassword('');
        setloggedin(false);
        setuserData('');
        setuserDataprofileObj('');
        setuserDatatokenObj('');
    }

  return (
    <div className="head">
        <Link to={'/'}><div className="logo">e!</div></Link>
        {!loggedin&&<div className="login">
            <a className="login_anchor" onClick={()=>setloginOpen(true)}> login </a>
            <button onClick={()=>setRegisterOpen(true)}> create an account </button>
        </div>}
        {loggedin&&
        <div className="login">
            <span className="login_anchor" ><i style={{color:'yellow'}}>welcome! </i><b>{user.name}</b></span>
            <button onClick={()=>logOut()}>log out</button>
        </div>}
        <Modal
        isOpen={loginOpen}
        style={customStyles}
        ariaHideApp={false}
        >
            <form onSubmit={handleLogIn}>
                <div>
                    <h1>
                        LOGIN
                        <button className="btn btn-danger" style={{float:"right", width:"12%"}} onClick={()=>setloginOpen(false)}>X</button>
                    </h1>
                </div>
                <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Name:</span>
                    <input type="text" value={name} onChange={(events)=>{user.name=events.target.value;setUser({...user});setName(events.target.value)}} className="form-control" placeholder="enter your name" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email:</span>
                    <input type="text" value={email} onChange={(events)=>{user.email=events.target.value;setUser({...user});setemail(events.target.value)}} className="form-control" placeholder="eg:- xyz@gmail.com" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">password:</span>
                    <input type="password" value={password} onChange={(events)=>{user.password=events.target.value;setUser({...user});setpassword(events.target.value)}} className="form-control" placeholder="enter your password" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                    <div style={{paddingLeft:'38%'}}><button type='submit' className="btn btn-primary">login</button></div>
                </div>
            </form>
            <hr/>
            <div style={{width:'100%',textAlign:"center"}}><span><b>Use google</b></span></div>
            <div>
                <GoogleLogin
                    clientId="1012755015050-25do8m2r92qukha3aflauilb012f7c7a.apps.googleusercontent.com"
                    buttonText="Login With GOOGLE"
                    className='google'
                    cookiePolicy={'single_host_origin'}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>
            <hr/>
            <div style={{width:'100%',textAlign:"center"}}><span><b>Use facebook</b></span></div>
            <div style={{paddingLeft:'10%'}}>
                <FacebookLogin
                    appId="909690000060993"
                    fields="name,email,picture"
                    callback={responseFacebook} 
                />
            </div>
        </Modal>

        <Modal
        isOpen={RegisterOpen}
        style={customStyles}
        ariaHideApp={false}
        >
            <form onSubmit={handleRegister}>
                <div>
                    <h3>
                        CREATE AN ACCOUNT
                        <button className="btn btn-danger" style={{float:"right", width:"10%"}} onClick={()=>setRegisterOpen(false)}>X</button>
                    </h3>
                </div>
                <hr/>
                <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Name:</span>
                    <input type="text" value={name} onChange={(events)=>{user.name=events.target.value;setUser({...user});setName(events.target.value)}} className="form-control" placeholder="enter your name" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email:</span>
                    <input type="text" value={email} onChange={(events)=>{user.email=events.target.value;setUser({...user});setemail(events.target.value)}} className="form-control" placeholder="eg:- xyz@gmail.com" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">password:</span>
                    <input type="password" value={password} onChange={(events)=>{user.password=events.target.value;setUser({...user});setpassword(events.target.value)}} className="form-control" placeholder="enter your password" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Re-Enter password:</span>
                    <input type="password" value={rePassword} onChange={(events)=>setRePassword(events.target.value)} className="form-control" placeholder="enter your password" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                    <div style={{paddingLeft:'35%'}}><button type='submit' className="btn btn-primary">REGISTER</button></div>
                </div>
            </form>
            <hr/>
            <div style={{width:'100%',textAlign:"center"}}><span><b>Use google</b></span></div>
            <div>
                <GoogleLogin
                    clientId="1012755015050-25do8m2r92qukha3aflauilb012f7c7a.apps.googleusercontent.com                                                                                                                                                                                                                                                                             "
                    buttonText="Login With GOOGLE"
                    className='google'
                    cookiePolicy={'single_host_origin'}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>
            <hr/>
            <div style={{width:'100%',textAlign:"center"}}><span><b>Use facebook</b></span></div>
            <div style={{paddingLeft:'15%'}}>
                <FacebookLogin
                    appId="909690000060993"
                    fields="name,email,picture"
                    callback={responseFacebook} 
                />
            </div>
        </Modal>
    </div>
  )
}
