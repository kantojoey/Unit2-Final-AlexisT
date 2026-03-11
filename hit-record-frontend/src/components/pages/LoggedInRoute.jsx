import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const LoggedInRoute = ({children}) => {
    const {isLoggedIn} = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/home" />
    }
    return children;
};

export default LoggedInRoute;