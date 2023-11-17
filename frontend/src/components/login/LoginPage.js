import LoginForm from "./LoginForm";

export default function LoginPage(){

    return(
        <div className="loginPage-container">
            <div className="loginPage">
                <div className="headings-container">
                    <h1>facebook</h1>
                    <h2>Facebook helps you connect and share with the people in your life.</h2>
                </div>
                <LoginForm />
            </div>
        </div>
        
    )
}