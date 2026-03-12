import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

// Prevents non-verified user from accessing rest of website
    if (!isLoggedIn) {
        return <Navigate to="/" />
    }

    return children;
};

export default ProtectedRoute;