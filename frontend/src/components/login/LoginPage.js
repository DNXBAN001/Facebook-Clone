import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export default function LoginPage(){
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })
    // const { user } = useGlobalContext()
    const [user, setUser] = React.useState("")
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
    }
    function storeCurrentUserInCookies(decodedUser, accessToken){
        // sessionStorage.setItem("user", currentUser)
        // localStorage.setItem("user", currentUser)
        //Expire after 1 minute
        // document.cookie = "accessToken="+currentUser.accessToken+"; expires="+new Date(Date.now()+(1000*60*60))
        // //Expire after one day
        // document.cookie = "refreshToken="+currentUser.refreshToken+"; expires="+new Date(Date.now()+(1000*60*60*24))

        console.log(decodedUser.exp)
        // Universal cookie implementation
        cookies.set('accessToken', accessToken, { 
            //path: '/',
            expires: new Date(decodedUser.exp)//expires in 24 hours
        });
        //cookies.get('myCat') // gets cookie value
        
    }
    async function submitToAPI(formData){
        
        try{
            const res = await axios.post("http://localhost:5000/profiles/login", formData)
            if(res.data.success){
                console.log(res.data.msg)
                console.log(res.data.user)
                const decodedUser = jwtDecode(res.data.user.accessToken)
                setUser(decodedUser)
                console.log(user)
                storeCurrentUserInCookies(decodedUser, res.data.user.accessToken)
                // console.log(cookies.get("accessToken"))
                setTimeout(() => {
                    redirect("/home", {state: decodedUser}) //redirect user to home page
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