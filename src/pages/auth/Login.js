import React from "react";
import { useNavigate } from "react-router";

function Login() {
	const history = useNavigate();
	const [matches, setMatches] = React.useState(
		window.matchMedia("(min-width: 768px)").matches
	);

	const handleLogin = () => {
		var currentPageUrl = window.location.href;
		localStorage.setItem("loggedIn", true);
		history("/");
	};

	React.useEffect(() => {
		window
			.matchMedia("(min-width: 1497px)")
			.addEventListener("change", (e) => setMatches(e.matches));
	}, []);

	console.log(matches);

	return (
		<div className="bg-white">
			<div className="container-fluid">
				<div className="row">
					<div
						className={!matches ? "d-none" : `col-lg-6 login-bg`}
						style={{
							backgroundImage: `url('assets/img/signup-bg.png')`,
						}}></div>
					<div className="col-lg-6 login-page-card">
						<div className="login-wrap">
							<div className="d-flex justify-content-between align-items-center">
								<img
									src="./assets/img/brandLogo.png"
									alt=""
									style={{ height: "60px" }}
								/>
								<img src="./assets/img/globe.png" alt="" />
							</div>
							<form action="">
								<div className="form-group">
									<input
										type="email"
										placeholder="Email Address"
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										placeholder="Password"
										className="form-control"
									/>
								</div>
								<div className="my-3 text-end">
									<a href="" className="a-link">
										Recover Password ?
									</a>
								</div>
								<div className="form-group">
									<button
										disabled
										className="btn btn-danger mt-2 d-block w-100">
										Sign In
									</button>
								</div>
							</form>
							<div class="horizontal-lines my-5">
								<span class="before-line"></span>
								<h2 class="hr-lines">Or continue with</h2>
								<span class="after-line"></span>
							</div>
							<div className="my-1 d-flex justify-content-evenly align-items-center">
								<a
									onClick={handleLogin}
									href="https://uup-cpp.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=m2n2olsraqect1k1tkfj1o0h8&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fuup.globe.com.ph%2Flogin%2Foauth2%2Fcode%2Fcognito">
									<img
										src="./assets/img/icons/google.png"
										className="social-icon"
										alt=""
									/>
								</a>
								<img
									src="./assets/img/icons/apple-logo.png"
									className="social-icon"
									alt=""
								/>
								<img
									src="./assets/img/icons/facebook.png"
									className="social-icon"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
