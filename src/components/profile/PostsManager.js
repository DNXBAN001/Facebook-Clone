import { GridView, Menu, Settings } from "@mui/icons-material";
import TuneIcon from '@mui/icons-material/Tune';


export default function PostsManager(){

    return(
        <div className="posts-manager-container">
            <div className="posts-manager-grid">
                <h3>Posts</h3>
                <div className="views-grid">
                    <div className="button-content button-one"><TuneIcon /><div>Filters</div></div>
                    <div className="button-content button-one"><Settings /> <div>Manage Posts</div></div>
                </div>
            </div>
            <div className="views-grid">
                <div className="button-content tab-one"><Menu className="icon"/> <div>Lists view</div></div>
                <div className="button-content tab-two"><GridView className="icon"/> <div>Grid view</div></div>
            </div>
        </div>
    )

}