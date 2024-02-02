import { Link } from "react-router-dom";

export default function LoginForm(){

    return(
        <div className="login-form-container">
            <form className="login-form">
                <div className="email-field">
                    <input id="username" name="username" autoComplete="false" type="text" placeholder="Email address or phone number"/>
                </div>
                <div className="password-field">
                    <input id="userPassword"name="userPassword" autoComplete="false" type="password" placeholder="Password"/>
                </div>
                <button type="submit" className="login-button btn" name="Submit">
                    Log in
                </button><br/>
                <div className="forgot-password"><a href="/">Forgot password</a></div>
                <Link to="/add">
                    <button className="signup-button btn" name="Submit">
                        Create new account
                    </button><br/>
                </Link>    
            </form>
            <div className="bottom-txt">
                <span><a href="/">Create a Page</a></span> for a celebrity, brand or business.
            </div>
        </div>
    )
}