import { useState } from "react";
import { useNavigate } from "react-router";

const LogInForm = () => {


    const [logInRequest, setLogInRequest] = useState({
        username: "",
        password: ""
    });

    const [validationError, setValidationError] = useState("");

    const navigate = useNavigate();

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

            const newUser = await response.json();
            console.log("Successfully signed in user:", newUser);

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
                <input type="text" id="username" name="username" onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={handleChange} />
            </div>
            {validationError && <p style={{ color: "red"}}>{validationError}</p>}

            <div className="user-buttons">
                <input type="reset" value="Clear Form" onClick={handleReset} />
                <input type="submit" value="Log in"/>
            </div>
        </form>
    );
};

export default LogInForm;