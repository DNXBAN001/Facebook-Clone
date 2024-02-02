import React from "react";
import { Navigate } from "react-router-dom";
import { calendarData } from "../../utils/calendar"
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import backgroundImage from "../../utils/fb-login-page.PNG"

export default function SignupPage(){

    const [formData, setFormData] = React.useState({
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

    function handleChange(event){
        const {name, type, value, checked} = event.target
        setFormData(prevFormData => (
            {
                ...prevFormData, 
                [name]: type === "checkbox" ? checked: value,
                dateOfBirth: `${dateOfBirth.day}/${dateOfBirth.month}/${dateOfBirth.year}`
            })
        )
        // console.log(formData)
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
        submitToAPI(formData)
        setTimeout(() => {
            window.location = "/" //direct user back to home page after submitting the form data
        }, 5000);
         
    }

    function submitToAPI(formData){
        axios.post("http://localhost:5000/profiles/add", formData)
            .then(res => console.log(formData))
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
                    <div><ClearIcon /></div>
                </div>
                
                <hr/>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input type="text" 
                        placeholder="First Name"
                        value={formData.firstName}
                        name="firstName" 
                        onChange={handleChange} 
                        className="name-input static-inputs"
                    />
                    <input type="text" 
                        placeholder="Last Name"
                        value={formData.lastName} 
                        name="lastName" 
                        onChange={handleChange} 
                        className="name-input static-inputs"
                    /><br/>
                    <input type="email"
                        className="static-inputs email-password-inputs"
                        placeholder="Mobile number or email address" 
                        value={formData.username} 
                        name="username" 
                        onChange={handleChange} 
                    /><br/>
                    <input type="password" 
                        className="static-inputs email-password-inputs"
                        placeholder="New password"
                        value={formData.password} 
                        name="password" 
                        onChange={handleChange} 
                    /><br/>
                    <div className="date-of-birth">
                        <p style={{marginTop: "15px", marginLeft: "12px",fontSize: "12px"}}>Date of birth ?</p>
                        <select
                            className="dob day"
                            value={dateOfBirth.day}
                            name="day"
                            onChange={handleDateOfBirth}
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
                                        checked={formData.gender === "female"}
                                        value="female"
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
                                        checked={formData.gender === "male"}
                                        value="male"
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
                                        checked={formData.gender === "custom"}
                                        value="custom"
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
                        onChange={handleChange} 
                    /><br/>
                </form>
            </div>
        </div>
    )
}
