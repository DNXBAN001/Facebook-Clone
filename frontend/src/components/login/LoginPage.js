import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "../../context-provider"

export default function LoginPage(){
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })
    const { user, setUser, loading, setLoading } = useGlobalContext()
    const cookies = new Cookies()//instantiate cookie obj

    const redirect = useNavigate()

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevformData => {
            return({
                ...prevformData, [name]: value
            })
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        submitToAPI(formData)
        //save token as cookie
        //saveTokenInCookies()
        setTimeout(() => {
            setLoading(false)
            redirect("/home")
        }, 5000)
    }
    function saveTokenInCookies(){
        cookies.set("accessToken", user.accessToken, {
            expires: new Date(Date.now() + 1000*60*60*24)
        })
    }
    async function submitToAPI(formData){
        setLoading(true)
        try{
            const res = await axios.post("http://localhost:5000/profiles/login", formData)
            setFormData({username: "", password: ""})
            if(res.data.success){
                console.log(res.data.msg)
                setUser(res.data.user)
            }else{
                alert(res.data.msg)
            }
        }catch(err){
            alert(err)
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
                                value={formData.username}
                                placeholder="Email address or phone number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="password-field">
                            <input name="password"  
                                type="password"
                                value={formData.password} 
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input className="login-button btn" type="submit" value={loading ? "loading...":"Log in"} disable={loading}/>
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