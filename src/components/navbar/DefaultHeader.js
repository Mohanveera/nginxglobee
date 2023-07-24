import React, { useContext } from "react";
import { Layout as MainLayout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { createBrowserHistory } from "history";
import AuthContext from "../../pages/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { setUserName } from "../../redux/Actions";
import logout from "../common/global";

const { Header } = MainLayout;

function DefaultHeader() {
	const navigate = useNavigate();

	const userName = useSelector((state) => state.username);

	const handleLogout = () => {
		localStorage.setItem("loggedIn", false);
		navigate("/");
		window.location.reload();
	};	
	return (
		<Header
			className="header-antd"
			style={{
				paddingLeft: "90px",
				paddingRight: "20px",
				background: "#F5F5F5",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				// height: '65px',
				borderBottom: "1.5px solid #A9ABAC",
			}}>
			<div>
				<Link to="/">
					<img
						src="/assets/img/brandLogo.png"
						className="img-fluid border-end border-2 border-grey pe-3"
						alt=""
						style={{ height: "80px" }}
					/>
				</Link>
				<Link to="/">
					<img
						src="/assets/img/globe.png"
						className="img-fluid logo ps-3"
						alt=""
					/>
				</Link>
			</div>
			<div className="d-flex align-items-center">
				<img src="/assets/img/bell.svg" alt="" />

				<div className="d-flex">
					<div>
						<img src="/assets/img/user.png" className="user-icon" alt="" />
					</div>
					<div className="d-flex flex-column">
						<p className="text-coral ms-2">Alma Lawson</p>
						<p className="text-muted ms-2">{userName}</p>
					</div>
				</div>
				<div className="d-flex flex-column">
					<LogoutOutlined onClick={handleLogout} style={{ fontSize: "22px" }} />
				</div>
			</div>
		</Header>
	);
}

export default DefaultHeader;
