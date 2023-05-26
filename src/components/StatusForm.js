import IconInputForm from "./IconInputForm";
import FormButtons from "./ILButton";
import data from "../utils/status-form-buttons";

export default function Statusform(){

    const formButtons = data.map(button => (
        <FormButtons key={button.id} buttonIcon={button.buttonIcon} buttonLabel={button.buttonLabel} />
    ));
    const placeholderText = "What's on your mind, Bandile?";

    return(
        <div className="status-form-container">
            <IconInputForm text={placeholderText}/>
            <div className="form-buttons ">
                {formButtons}
            </div>
        </div>
    )
}

