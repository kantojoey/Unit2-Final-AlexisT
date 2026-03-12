import { useEffect, useRef, useState } from "react";
import VinylRecord from "../images/VinylRecord.png"
import LogInForm from "../userInformation/LogInForm";
import SignUpForm from "../userInformation/SignUpForm";

const LoadingPage = () => {

    const [formType, setFormType] = useState(null);

    const formRef = useRef(null);

    // Focuses the log-in or sign-up form
    useEffect(() => {
        if (formType && formRef.current) {
            formRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [formType]);

    return (
        <main>
            <div className="loading-page-main-div">
                <img src={VinylRecord} alt="Spinning vinyl record stock image" title="Spinning vinyl record stock image" className="spin"></img>
                <div className="user-buttons">
                    <button className="loading-button" onClick={() => setFormType("login")}>Log In</button>
                    <button className="loading-button" onClick={() => setFormType("signup")}>Sign Up</button>
                </div>
                <div ref={formRef}>
                    {formType === "login" && <LogInForm />}
                    {formType === "signup" && <SignUpForm />}
                </div>
            </div>
        </main>

    );
};

export default LoadingPage;