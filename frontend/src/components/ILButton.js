
export default function ILButton(props){

    return(
        <div className="ilbutton-container">
            <img src={props.buttonIcon} width="24" height="24" alt=""/>
            <p>{props.buttonLabel}</p>
        </div>
    )
}