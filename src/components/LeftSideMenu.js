import data from "../utils/side-menu-data"


export default function LeftSideMenu(props){

    
    const menuItems = data.map(menuItem => {
        return (
            <div className="list-item-container" key={menuItem.id} onClick={menuItem.id===1? (()=>props.changePage(menuItem.id)):(1)}>
                <img src={menuItem.icon} width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                <p className="label">{menuItem.label}</p>
            </div>
        )
    });

    return(
        <div className="side-menu-container">
            {menuItems}
            <h4 className="shortcuts">
                Your shortcuts
            </h4>
            <div className="list-item-container" >
                <img src="./images/pool-icon.png" width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                <p className="label">8 Ball Pool</p>
            </div>
            <div className="list-item-container" >
                <img src="./images/traffic-motorbike-icon.png" width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                <p className="label">Traffic Motorbike</p>
            </div>
            <div className="bottom-footer">
                <p>Privacy . Terms . Advertising . Ad Choices . Cookies .<br/> 
                     More . Meta <>&#169;</> 2023
                </p>
            </div>
           
        </div>
    )
}

