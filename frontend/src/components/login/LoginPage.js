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
    const { setUser, isLoading, setIsLoading } = useGlobalContext()
    const cookies = new Cookies()//instantiate cookie obj

    const redirect = useNavigate()

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => {
            return({
                ...prevFormData, [name]: value
            })
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        submitToAPI(formData)
    }
    function saveTokensInCookies(accessToken, refreshToken){
        cookies.set("accessToken", accessToken, {
            expires: new Date(Date.now() + 1000*60*30)//expire in 30mins
        })
        cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000*60*60*24*7)//expire in 7 days
        })
    }
    async function submitToAPI(formData){
        setIsLoading(true)
        try{
            const res = await axios.post("http://localhost:5000/auth/login", formData)
            setFormData({username: "", password: ""})
            if(res.data.success){
                console.log(res.data.msg)
                saveTokensInCookies(res.data.accessToken, res.data.refreshToken)
                const { userId, userStatus, fullName, profilePhoto } = jwtDecode(cookies.get("accessToken"))
                setUser({ userId, userStatus, fullName, profilePhoto })
                setTimeout(() => {
                    setIsLoading(false)
                    redirect("/home")
                }, 1000)
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
                        <input className="login-button btn" type="submit" value={isLoading ? "Loading...":"Log in"} disabled={isLoading}/>
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