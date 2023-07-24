import React, { createContext, useEffect, useState } from "react";
import ApiService from "../../components/api/apiService";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
export default AuthContext;
