
export default function Story(props){

    return(
        <>
            <div className="story">
                <img src={props.storyImg} width="114" height="200" className="story-preview-image" alt=""/>
                <div>
                    <img src={props.accImg} width="35" height="35" className="acc-circle" alt=""/>
                    <p className="acc-label">{props.contactName}</p>
                </div>
            </div>
        </>
    )
}