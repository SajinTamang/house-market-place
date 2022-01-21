import React,{useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import  visibilityIcon from "../assets/svg/visibilityIcon.svg";
import "./css/SignIn.css";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData]= useState({
    email:'',
    password:''
  })

  const {email,password}= formData;
  const navigate = useNavigate();
  
  const onChange= (e)=>{
        setFormData((prevState )=>({
          ...prevState,
          [e.target.id] :e.target.value
        }))
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
    
        <form>
          <h3>Email</h3>
          <input id="email"  value= {email} type="email" className="emailInput" placeholder='Enter your email' onChange={onChange}/>
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

          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon fill="white" width="34px" height="34px"/>
            </button>
          </div>
        </form>

        {/* Google Authentication */}
        <Link to="/sign-up" className='registerLink'>
          Sign up Instead
        </Link>
    </div>
  
 </div>
  );
}

export default SignIn;
