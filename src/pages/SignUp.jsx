import React,{useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import{getAuth, createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {db} from "../firebase.config";
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import  visibilityIcon from "../assets/svg/visibilityIcon.svg";
import "./css/SignIn.css";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import OAuth from '../components/OAuth';


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData]= useState({
    name:'',
    email:'',
    password:'',
    dob:''
  })

  const {name,email,dob,password}= formData;
  const navigate = useNavigate();
  
  const onChange= (e)=>{
        setFormData((prevState )=>({
          ...prevState,
          [e.target.id] :e.target.value
        }))
  }

  const onSubmit = async(e) =>{
        e.preventDefault()
        try{
     
                // authenticating user
                const auth = getAuth()

                // Creating user 
                const userCredential = await createUserWithEmailAndPassword(auth,email,password);

                const user= userCredential.user;

                updateProfile(auth.currentUser,{
                    displayName:name,
                })
                
                // Storing data in a Firestore database
                //Copying Form Data to new variable 
                const formDataCopy ={...formData}
                // Deleting password
                 delete formDataCopy.password;
                 formDataCopy.timestamp = serverTimestamp();

                // Updating the user to database
                await setDoc(doc(db,'users',user.uid),formDataCopy);
navigate("/");
                      

               
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong with registration");
        }
  }

  return (
  
  <div className="signIn">
        <div className="banner">
          <h1>Sajin Market House</h1>
        </div>
   <div className="SignInPageContainer">
      <header>
        <p className='pageHeader'>Sign In!</p>
      </header>
    
        <form onSubmit={onSubmit}>
              <h3>Name</h3>
          <input id="name"  value= {name} type="text" className="nameInput" placeholder='Enter your name' onChange={onChange}/>
          <h3>Email</h3>
          <input id="email"  value= {email} type="email" className="emailInput" placeholder='Enter your email' onChange={onChange}/>
          <h3>Date of birth</h3>
          <input id="dob"  value={dob} type="date" className="dateInput" placeholder='Enter your date of birth' onChange={onChange}/>
          
           <h3>Password</h3>
          <div className="passwordInputDiv">

            <input type={showPassword ? "text" : "password"} 
              className="passwordInput"
              placeholder='Enter Password'
              id='password'
              value={password}
              onChange= {onChange}
            />
            <img src={visibilityIcon} alt="Show password" className="showPassword"  onClick={()=> setShowPassword((prevState) => !prevState)}/>
          </div>

          <Link to="/forgot-password" className='forgotPasswordLink'>
             Forgot Password ?
          </Link>

          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon fill="white" width="34px" height="34px"/>
            </button>
          </div>
        </form>

       <OAuth/>
        <Link to="/sign-in" className='registerLink'>
          Sign In Instead
        </Link>
    </div>
  
 </div>
  );
}

export default SignUp;
