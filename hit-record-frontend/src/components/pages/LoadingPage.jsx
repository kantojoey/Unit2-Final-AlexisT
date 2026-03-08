import { useState } from "react";
import VinylRecord from "../images/VinylRecord.png"
import LogInForm from "../userInformation/LogInForm";
import SignUpForm from "../userInformation/SignUpForm";

const LoadingPage = () => {

    const [formType, setFormType] = useState(null);

    return (
        <main>
            <div className="loading-page-main-div">
                <img src={VinylRecord} alt="Spinning vinyl record stock image" title="Spinning vinyl record stock image" className="spin"></img>
                <div className="user-buttons">
                    <button className="loading-button" onClick={() => setFormType("login")}>Log In</button>
                    <button className="loading-button" onClick={() => setFormType("signup")}>Sign Up</button>
                </div>
                {formType === "login" && <LogInForm />}
                {formType === "signup" && <SignUpForm />}
            </div>
        </main>

    );
};

export default LoadingPage;