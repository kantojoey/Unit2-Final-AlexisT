import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();


    if (!isLoggedIn) {
        return <Navigate to="/" />
    }

    return children;
};

export default ProtectedRoute;