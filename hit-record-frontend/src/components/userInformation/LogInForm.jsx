import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const LogInForm = () => {


    const [logInRequest, setLogInRequest] = useState({
        username: "",
        password: ""
    });

    const [validationError, setValidationError] = useState("");

    // Access to logged in user and logged in status
    const {setAuthUser, setIsLoggedIn} = useAuth();

    const navigate = useNavigate();

    // Updates values for username and password for request body
    const handleChange = (e) => {
        const { name, value } = e.target;

        setLogInRequest({
            ...logInRequest,
            [name]: value
        });
    };

    const handleReset = () => {
        setLogInRequest({
            username: "",
            password: ""
        });
        setValidationError("");
    };

    const logInUser = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logInRequest)
            });

            if (!response.ok) {
                setValidationError("Incorrect username or password. try again");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Saves confirmed user object from backend DTO
            const newUser = await response.json();

            setAuthUser(newUser);
            setIsLoggedIn(true);
            navigate("/home");

        } catch (error) {
            console.error("Signup failed: Incorrect username or password", error);
        }
    }

    return (
        <form className="user-validation-form" onSubmit={logInUser}>
            <h1>Log In:</h1>
            <div className="form-row">
                <label htmlFor="username">Username:</label>
                <input 
                type="text" 
                id="username" 
                name="username" 
                onChange={handleChange} 
                placeholder="Username..."
                required/>
            </div>

            <div className="form-row">
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                onChange={handleChange} 
                placeholder="Enter password..."
                required/>
            </div>
            {validationError && <p style={{ color: "red"}}>{validationError}</p>}

            <div className="user-buttons">
                <input className="validation-button" type="reset" value="Clear" onClick={handleReset} />
                <input className="validation-button" type="submit" value="Log in"/>
            </div>
        </form>
    );
};

export default LogInForm;