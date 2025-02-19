import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/Auth_Context";

const Protected = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if(loading) return <div>Loading...</div>;
    return user ? 
        children : <Navigate to="/login" />;
};

export default Protected;