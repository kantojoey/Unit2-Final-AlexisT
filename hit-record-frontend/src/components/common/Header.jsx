import { BsVinylFill } from "react-icons/bs";

const Header = () => {
    return (
        <>
            <header>
                <div className="header-content">
                    <BsVinylFill className="record-icon"/>
                    <h1 className = "header-text">Hit Record</h1>
                </div>
            </header>

        </>
    );
};

export default Header;
