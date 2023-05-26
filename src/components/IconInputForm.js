
export default function IconInputForm(props){

    return(
        <div className="inline-row form">
            <div className="acc-circle-container">
                <img src="./images/bandile-profile.jpg" width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
            </div>
            <form>
                <div className="status-field">
                    <input type="text" placeholder={props.text} />
                </div>
            </form>
        </div>
    )
}