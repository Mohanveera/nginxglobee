import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "devextreme/dist/css/dx.light.css";
import "react-querybuilder/dist/query-builder.css";
import StackNavigation from "../src/components/navigation/StackNavigation";
import AuthNavigation from "../src/components/navigation/AuthNavigation";
import { AuthProvider } from "./pages/auth/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setUserName } from "./redux/Actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ApiService from "./components/api/apiService";

function App() {
	const apiservice = new ApiService();

	const loggedIn = useSelector((state) => state.login);
	const username = useSelector((state) => state.username);
	const dispatch = useDispatch();

	dispatch(setUserName("acabalos@globe.com.ph"));
	useEffect(() => {});
	const getToken = async () => {
		const res = await apiservice.getToken(username);
	};

	useEffect(() => {
		getToken();
		localStorage.setItem("key", JSON.stringify([
			"lifestage",
			"psychographic segment",
			"superapp user indicator",
		]));
		localStorage.setItem("query",JSON.stringify(
			{
				condition: "",
				combinator: "and",
				rules: [],
			}
		))
		localStorage.setItem("cusQuery",JSON.stringify(
			{
				condition: "",
				combinator: "and",
				rules: [],
			}
		))
	}, []);

	useEffect(() => {
		let loggedStatus = localStorage.getItem("loggedIn");
		dispatch(setLoggedIn(JSON.parse(loggedStatus)));
	}, [loggedIn]);

	return (
		<AuthProvider>
			<div>{loggedIn ? <StackNavigation /> : <AuthNavigation />}</div>
			<ToastContainer />
		</AuthProvider>
	);
}

export default App;
