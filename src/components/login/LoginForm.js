
export default function LoginForm(){

    return(
        <div className="login-form-container">
            <form className="login-form">
                <div className="email-field">
                    <input type="text" placeholder="Email address or phone number"/>
                </div>
                <div className="password-field">
                    <input type="password" placeholder="Password"/>
                </div>
                <button type="submit" className="login-button btn" name="Submit">
                    Log in
                </button><br/>
                <div className="forgot-password"><a href="/">Forgot password</a></div>
                <button type="submit" className="signup-button btn" name="Submit">
                    Create new account
                </button><br/>
            </form>
            <div className="bottom-txt">
                <span><a href="/">Create a Page</a></span> for a celebrity, brand or business.
            </div>
        </div>
    )
}