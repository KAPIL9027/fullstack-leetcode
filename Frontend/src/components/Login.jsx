import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
function Login() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (e)=>{
    const res = await fetch('http://localhost:3001/login',{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username,
        password:password
      })
    });

    const data = await res.json();
    if(!localStorage.getItem('leetcode-clone/authToken'))
    localStorage.setItem('leetcode-clone/authToken',data.authToken);
    navigate("/problemset/all/");
    window.location.reload(false);
  }

  return (
    <div className="login">
    <div className="login-card">
        <div className="login-card-top">
            <img className="leetcode-img" alt="leetcode" src="https://leetcode.com/static/images/LeetCode_logo.png"/>
            <h2 className="leetcode">Leetcode</h2>
        </div>
        <div className="login-card-form"  >
        <input type="text" placeholder="Username or Email" className="input-form" name="username" id="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        
        <input type="password" placeholder="Password" className="input-form" name="password" id="password" value = {password} onChange={(e)=> setPassword(e.target.value)}/>
        <button onClick={onSubmit} className="form-btn">Sign in</button>
        </div>
        <div className="login-card-bottom">
            <div className="login-card-bottom-top">
                <p className="login-bottom-btns">Forgot Password?</p>
                <Link className="login-bottom-btns" id="sign-up" to="/signup">Sign up</Link>
            </div>
            <p className="policy-terms">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        </div>
    </div>
    </div>
  )
}

export default Login