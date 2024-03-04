import React from "react";
import { calendarData } from "../../utils/calendar"
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignupPage(){

    const [user, setUser] = React.useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: ""
    })
    const [dateOfBirth, setDateOfBirth] = React.useState({
        day: "",
        month: "",
        year: ""
    })
    const redirect = useNavigate()

    function handleChange(event){
        const {name, type, value, checked} = event.target
        setUser(preUser => (
            {
                ...preUser, 
                [name]: type === "checkbox" ? checked: value,
                dateOfBirth: `${dateOfBirth.day}/${dateOfBirth.month}/${dateOfBirth.year}`
            })
        )
        // console.log(user)
    }
    function handleDateOfBirth(event){
        const {name, value} = event.target
        setDateOfBirth(prevDOB => {
            return ({
                ...prevDOB, [name]: value
            })
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        submitToAPI(user)
    }

    async function submitToAPI(user){
        try{
            const response = await axios.post("http://localhost:5000/profiles/signup", user)
            console.log(response.data.success)
            if(response.data.success){
                setTimeout(() => {
                    redirect("/home", {state: user})
                }, 5000)
            }
            else{
                alert(response.data.msg)
        }}catch(err){
            alert("Server error occured...")
        } 
    }

    return (
        <div className="signup-page">
            <div>  . </div>
            <div className="signup-form-container">
                <div className="head-elements">
                    <div className="form-heading">
                        <h1>Sign Up</h1>
                        <p>It's quick and easy</p>
                    </div>
                    <div><Link to="/" style={{textDecoration: "none", color: "black"}}><ClearIcon /></Link></div>
                </div>
                
                <hr/>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input type="text" 
                        placeholder="First Name"
                        value={user.firstName}
                        name="firstName" 
                        onChange={handleChange} 
                        className="name-input static-inputs"
                        required
                    />
                    <input type="text" 
                        placeholder="Last Name"
                        value={user.lastName}
                        name="lastName" 
                        onChange={handleChange} 
                        className="name-input static-inputs"
                        required
                    /><br/>
                    <input type="email"
                        className="static-inputs email-password-inputs"
                        placeholder="Mobile number or email address" 
                        value={user.username} 
                        name="username" 
                        onChange={handleChange}
                        required
                    /><br/>
                    <input type="password" 
                        className="static-inputs email-password-inputs"
                        placeholder="New password"
                        value={user.password} 
                        name="password" 
                        onChange={handleChange}
                        required
                        minLength="8"
                    /><br/>
                    <div className="date-of-birth">
                        <p style={{marginTop: "15px", marginLeft: "12px",fontSize: "12px"}}>Date of birth ?</p>
                        <select
                            className="dob day"
                            value={dateOfBirth.day}
                            name="day"
                            onChange={handleDateOfBirth}
                            required
                        >
                            {calendarData.days.map(day => (
                                <option
                                        key={day}
                                        value={day} 
                                    >{day}</option>
                                    )
                            )}
                            
                        </select>
                        <select
                            className="dob month"
                            value={dateOfBirth.month}
                            name="month"
                            onChange={handleDateOfBirth}
                            required
                        >
                            {calendarData.months.map(month => (
                                <option
                                    key={month}
                                    value={month} 
                                >{month.substring(0, 3)}</option>
                                )
                            )}
                        </select>
                        <select
                            className="dob year"
                            value={dateOfBirth.year}
                            name="year"
                            onChange={handleDateOfBirth}
                            required
                        >
                            {calendarData.years.map(year => (
                                <option
                                    className="year"
                                    key={year}
                                    value={year} 
                                >{year}</option>
                                )
                            )}
                        </select>
                    </div>
                    
                    <div>
                        <p style={{marginTop: "15px", marginLeft: "12px", fontSize: "12px"}}>Gender ?</p>
                        <fieldset>
                            <div className="gender-radio">
                                <div><label htmlFor="female">Female</label></div>
                                <div>
                                    <input 
                                        type="radio"
                                        id="female"
                                        className="gender-input"
                                        name="gender"
                                        onChange={handleChange}
                                        checked={user.gender === "female"}
                                        value="female"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="gender-radio">
                                <div><label htmlFor="male">Male</label></div>
                                <div>
                                    <input 
                                        type="radio"
                                        id="male"
                                        className="gender-input"
                                        name="gender"
                                        onChange={handleChange}
                                        checked={user.gender === "male"}
                                        value="male"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="gender-radio">
                                <div><label htmlFor="custom">Custom</label></div>
                                <div>
                                    <input 
                                        type="radio"
                                        id="custom"
                                        className="gender-input"
                                        name="gender"
                                        onChange={handleChange}
                                        checked={user.gender === "custom"}
                                        value="custom"
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <p style={{marginTop: "15px", marginLeft: "12px",fontSize: "12px"}}>
                            People who our service may have uploaded your contact information to Facebook. <a href="#">Learn more</a>
                        </p>
                        <p style={{marginTop: "15px", marginLeft: "12px",fontSize: "12px"}}>
                            By clicking Sign Up, you agree to our <a href="#">Terms</a>,<a href="#"> Privacy Policy </a> 
                            and <a href="#">Cookie Policy</a>.<br/>
                            You may recieve SMS notifications from us and can opt out any time
                        </p>
                    </div>
                    <input type="submit" 
                        className="submit-btn"
                        value="Sign Up"  
                    /><br/>
                </form>
            </div>
        </div>
    )
}
