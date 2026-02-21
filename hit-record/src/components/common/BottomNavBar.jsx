import { Link } from "react-router";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeadphones } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaSearchPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";


const BottomNavBar = () => {

    const [selectedIcon, setSelectedIcon] = useState(null);
    const handleSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    return (
        <div className="bottom-nav">
            <Link to="/home" className={`nav-item ${selectedIcon==="home" ? "active" : ""}`} onClick={() => handleSelect("home")}>
                <IoHomeSharp />
            </Link>
            <Link to="/listening-log" className={`nav-item ${selectedIcon==="listening-log" ? "active" : ""}`} onClick={() => handleSelect("listening-log")}>
                <FaHeadphones />
            </Link>
            <Link to="/about" className={`nav-item ${selectedIcon==="about" ? "active" : ""}`} onClick={() => setSelectedIcon("about")}>
                <IoInformationCircleOutline />
            </Link>
            <Link to="/search" className={`nav-item ${selectedIcon==="search" ? "active" : ""}`} onClick={() => setSelectedIcon("search")}>
                <FaSearchPlus />
            </Link>
            <Link to="/profile" className={`nav-item ${selectedIcon==="profile" ? "active" : ""}`} onClick={() => setSelectedIcon("profile")}>
                <FaUserCircle />
            </Link>

        </div>
    );
};

export default BottomNavBar;
