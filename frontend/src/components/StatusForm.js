import React from "react";
import { UserContext } from "./home/HomePage";
import FormButtons from "./ILButton";
import data from "../utils/status-form-buttons";

export default function Statusform(){

    const user = React.useContext(UserContext)

    const formButtons = data.map(button => (
        <FormButtons key={button.id} buttonIcon={button.buttonIcon} buttonLabel={button.buttonLabel} />
    ));
    const placeholderText = user.firstName ? `What's on your mind, ${user.firstName}?`: "What's on your mind?";

    return(
        <div className="status-form-container">
            <div className="inline-row form">
                <div className="acc-circle-container">
                    <img src={user.profilePhoto} width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                </div>
                <form>
                    <div className="status-field">
                        <input type="text" placeholder={placeholderText} />
                    </div>
                </form>
            </div>
            <div className="form-buttons ">
                {formButtons}
            </div>
        </div>
    )
}

