import { Search, VideoCall } from "@mui/icons-material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from "../MenuItem";
import data from "../../utils/contacts-list";

export default function Contacts(){

    const contactsList = data.map(contact => (
        <MenuItem key={contact.id} icon={contact.icon} label={contact.contactName} />
    ));

    return(
        <div className="contacts-container">
            <div className="contacts-header">
                <div className="hrline">
                    <h4 className="shortcuts-label">Contacts</h4>
                    <div>
                        <VideoCall className="contacts-header-icons"/>
                        <Search className="contacts-header-icons"/>
                        <MoreHorizIcon className="contacts-header-icons" />
                    </div>
                </div>
            </div>
            <div className="">
                {contactsList}
            </div>
        </div>
    )
}