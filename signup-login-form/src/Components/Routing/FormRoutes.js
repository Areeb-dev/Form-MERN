import React from "react";
import SignIn from "../SignIn";
import SignUp from "../SignUpForm";
import { Route ,Routes } from "react-router-dom";
const FormRoute = () => {
    return(
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
        </Routes>
    )
};
export default FormRoute;