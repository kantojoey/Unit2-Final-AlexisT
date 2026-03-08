import { useState } from "react";
import { useNavigate } from "react-router";


const SignUpForm = () => {


    const [signInRequest, setSignInRequest] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    });

    const [signInError, setSignInError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSignInRequest({
            ...signInRequest,
            [name]: value
        });
    };

    const handleReset = () => {
        setSignInRequest({
            firstName: "",
            lastName: "",
            username: "",
            password: ""
        });
        setSignInError("");
    };

    const signUpUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signInRequest)
            });

            if (!response.ok) {
                setSignInError("Please enter a valid username and password");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const newUser = await response.json();
            console.log("New user registered:", newUser);

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
                    onChange={handleChange}
                    required
                />
            </div>

            {signInError && <p style={{ color: "red" }}>{signInError}</p>}

            <div className="user-buttons">
                <input className="validation-button" type="reset" value="Clear" onClick={handleReset} />
                <input className="validation-button" type="submit" value="Register" />
            </div>
        </form>
    );
};

export default SignUpForm;