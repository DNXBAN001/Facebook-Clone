
export default function MenuItem(props){

    return(
        <div className="menu-item-container">
            <div className="sidebar-menu-icon-container"><img src={props.icon} className="sidebar-menu-icon" alt=""/></div>
            <p className="menu-label">{props.label}</p>
        </div>
    )
}