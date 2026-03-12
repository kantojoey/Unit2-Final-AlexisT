import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";


const SignUpForm = () => {

    const [signUpRequest, setsignUpRequest] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    });

    const [signUpError, setsignUpError] = useState("");

    // Access to logged in user and logged in status
    const { setAuthUser, setIsLoggedIn } = useAuth();

    const navigate = useNavigate();

    // Sets values for sign up request body
    const handleChange = (e) => {
        const { name, value } = e.target;

        setsignUpRequest({
            ...signUpRequest,
            [name]: value
        });
    };

    const handleReset = () => {
        setsignUpRequest({
            firstName: "",
            lastName: "",
            username: "",
            password: ""
        });
        setsignUpError("");
    };

    const signUpUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signUpRequest)
            });

            if (!response.ok) {
                setsignUpError("Please enter a valid username and password");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Saves new registered user object from backend DTO
            const newUser = await response.json();

            setAuthUser(newUser);
            setIsLoggedIn(true);
            navigate("/home");

        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <form className="user-validation-form" onSubmit={signUpUser}>
            <h1>Sign up:</h1>

            <div className="form-row">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name..."
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Last Name..."
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Username..."
                    minLength={4}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password..."
                    minLength={8}
                    onChange={handleChange}
                    required
                />
            </div>

            {signUpError && <p style={{ color: "red" }}>{signUpError}</p>}

            <div className="user-buttons">
                <input className="validation-button" type="reset" value="Clear" onClick={handleReset} />
                <input className="validation-button" type="submit" value="Register" />
            </div>
        </form>
    );
};

export default SignUpForm;