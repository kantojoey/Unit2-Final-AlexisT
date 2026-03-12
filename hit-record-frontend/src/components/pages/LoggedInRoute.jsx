import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const LoggedInRoute = ({children}) => {
    const {isLoggedIn} = useAuth();

    // Prevents logged in user from landing on log in/sign up screen again
    if (isLoggedIn) {
        return <Navigate to="/home" />
    }
    return children;
};

export default LoggedInRoute;