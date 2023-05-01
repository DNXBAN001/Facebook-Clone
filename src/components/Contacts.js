import { Search, VideoCall } from "@mui/icons-material"
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import data from "../utils/contacts-list"

export default function Friends(){

    const contacts = data.map(contact => (
        <div className="list-item-container friend" key={contact.id}>
            <img src={contact.icon} width="38" height="38" className="icon" style={{borderRadius: "20px"}} alt="" />
            <p className="label">{contact.contactName}</p>
        </div>
    ));

    return(
        <div className="friends-container">
            <div className="heading-contacts shortcuts">
                <h4 className="contacts">Contacts</h4>
                <div className="contacts-icons">
                    <div><VideoCall /></div>
                    <div><Search /></div>
                    <MoreHorizSharpIcon />
                </div>
            </div>
            <div className="friends-list">
                {contacts}
            </div>
        </div>
    )

}