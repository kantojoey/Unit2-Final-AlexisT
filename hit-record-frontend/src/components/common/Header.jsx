import { BsVinylFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const Header = () => {

    const navigate = useNavigate();

    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
    const logOutUser = () => {

        setAuthUser(null);
        setIsLoggedIn(false);

        localStorage.removeItem("authUser");
        localStorage.removeItem("isLoggedIn");

        navigate("/");
    }


    return (
        <>
            <header>
                <div className="header-content">
                    <BsVinylFill className="record-icon" />
                    <h1 className="header-text">Hit Record</h1>
                </div>
                {(authUser && isLoggedIn) ? (
                    <div className="logout-section" onClick={logOutUser}>
                    <FaSignOutAlt className="sign-out-icon" />
                    <p>Log out</p>
                </div>
                ) : null   
                }
            </header>

        </>
    );
    };

    export default Header;
