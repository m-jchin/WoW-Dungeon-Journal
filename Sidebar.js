
import "./sidebar.css";
import React from "react";

export const Sidebar = ({ width, height, children, dungeonName }) => {

    // user clicks name on sidebar -> setState in parent to rerender DisplayDungeon

    return (
        <div className='side-bar' style={{ width: width, minHeight: height }}>
            <React.Fragment>
                <h2 id='dungeonTitle'>{dungeonName}</h2>
                {children}
            </React.Fragment>
        </div>
    );
};

export default Sidebar;