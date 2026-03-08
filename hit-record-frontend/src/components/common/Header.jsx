import { BsVinylFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <header>
                <div className="header-content">
                    <BsVinylFill className="record-icon" />
                    <h1 className="header-text">Hit Record</h1>
                </div>
                <div className="logout-section">
                    <FaSignOutAlt className="sign-out-icon" />
                    <p>Log out</p>
                </div>
            </header>

        </>
    );
};

export default Header;
