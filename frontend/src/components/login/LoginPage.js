import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage(){
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    })

    const redirect = useNavigate()

    function handleChange(event){
        const {name, value} = event.target
        setUser(prevUser => {
            return({
                ...prevUser, [name]: value
            })
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        submitToAPI(user)
    }

    async function submitToAPI(user){
        const res = await axios.post("http://localhost:5000/profiles/login", user)
        if(res.data.success){
            console.log(res.data.msg)
            setTimeout(() => {
                redirect("/home", {state: user}) //redirect user to home page
            }, 5000)
        }else{
            alert(res.data.msg)
        }
    }

    return(
        <div className="loginPage-container">
            <div className="loginPage">
                <div className="headings-container">
                    <h1>facebook</h1>
                    <h2>Facebook helps you connect and share with the people in your life.</h2>
                </div>
                <div className="login-form-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="email-field">
                            <input name="username"  
                                type="email"
                                value={user.username}
                                placeholder="Email address or phone number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="password-field">
                            <input name="password"  
                                type="password"
                                value={user.password} 
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input className="login-button btn" type="submit" value="Log in"/>
                        <br/>
                        <div className="forgot-password"><a href="/">Forgot password</a></div>
                        <Link to="/signup">
                            <button className="signup-button btn" name="Submit">
                                Create new account
                            </button><br/>
                        </Link>    
                    </form>
                    <div className="bottom-txt">
                        <span><a href="/">Create a Page</a></span> for a celebrity, brand or business.
                    </div>
                </div>
            </div>
        </div>
        
    )
}