import React, { useEffect, useState, useRef } from "react";
import MainCard from "../../components/cards/MainCard";
import Accordion from "react-bootstrap/Accordion";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import { useDrag } from "react-dnd";
import { QueryBuilderAntD } from "@react-querybuilder/antd";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import ApiService from "../../components/api/apiService";
import {
	setLoading,
	setLoggedIn,
	setQueryValue,
	setQueryData,
} from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";

import {
	setSubscriberAttributes,
	setSelectFilters,
	setEditing,
	setHasFunctionReturn,
} from "../../redux/Actions";
import { Spin } from "antd";

const EMPTY_QUERY = {
	condition: "",
	combinator: "and",
	rules: [],
};

function Index() {
	const { Option } = Select;
	const apiservice = new ApiService();
	const history = useNavigate();
	const [refresh, setRefresh] = React.useState(true);
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() - 2);
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const day = String(currentDate.getDate()).padStart(2, "0");
	const [activeBtn, setActiveBtn] = React.useState(0);

	// ***** reducers usage ******
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.load);
	const subscriberAttributes = useSelector((state) => state.attributes);
	const queryValue = useSelector((state) => state.queryValue);
	const queryData = useSelector((state) => state.queryData);
	const subscriber = useSelector((state) => state.subscriber);
	const customer = useSelector((state) => state.customer);
	console.log("sss", subscriber, customer);

	const [query, setQuery] = useState(JSON.parse(localStorage.getItem("query")));
	const [cusQuery, cusSetQuery] = useState(
		JSON.parse(localStorage.getItem("cusQuery"))
	);
	// const [query, setQuery] = useState( EMPTY_QUERY);

	const addRule = (item) => {
		console.log("item", item);

		const newRule = {
			field: item.name,
			operator: "beginsWith",
			// value: Array.isArray(item.values) ? item.values : [],
			// value: Array.isArray(item.values) ? item.values[0] : '',
			value: item.defaultValue,
			valueEditorType: "select",
			values: item.values.map((item) => ({ label: item, label: item })),
		};
		setQuery((prevQuery) => ({
			...prevQuery,
			rules: [...prevQuery.rules, newRule],
		}));
	};
	console.log("kkk", formatQuery(query, "sql"));
	useEffect(() => {
		const sql = formatQuery(query, "sql");

		const cusSql = formatQuery(cusQuery, "sql");
		if (sql === "(1 = 1)") {
			dispatch(setQueryValue(""));
			dispatch(setQueryData(""));
		} else {
			dispatch(setQueryValue(sql));
			dispatch(setQueryData(cusSql));
		}
		if (cusSql === "(1 = 1)") {
			dispatch(setQueryData(""));
		} else {
			dispatch(setQueryData(cusSql));
		}
	}, [query, cusQuery]);

	const handleReset = () => {
		setQuery(EMPTY_QUERY);
	};

	const handleSubmit = () => {
		console.log("sss", query);
		localStorage.setItem("query", JSON.stringify(query));
		dispatch(setEditing(true));
		dispatch(setHasFunctionReturn(true));
		history("/");
	};

	const customerAttributes = [
		{
			name: "Earliest_Customer_Final_Customer_Name",
			label: "Earliest Customer Final Customer Name",
			defaultValue: "BASIC LIFER",
			valueEditorType: "select",
			values: [
				{ label: "BASIC LIFER" },
				{ label: "CAPTAIN" },
				{ label: "PASSION-DRIVEN" },
			],
		},
	];
	return (
		<>
			<Spin spinning={loading} size="large">
				<MainCard title="SAVED AUDIENCES" bodyCard={true}>
					<div className="">
						<div class="btn-group" role="group">
							<button
								type="button"
								onClick={() => setActiveBtn(0)}
								class={activeBtn == 0 ? `btn btn-danger` : "btn btn-default"}>
								Attributes
							</button>
							<button
								type="button"
								onClick={() => setActiveBtn(1)}
								class={activeBtn == 1 ? `btn btn-danger` : "btn btn-default"}>
								Personas
							</button>
						</div>
						<div className="queryDiv mt-3">
							<div className="row">
								{/* <div className="col-lg-4">
									<div className="querySidebar">
										<Accordion defaultActiveKey={["0"]} alwaysOpen>
											<Accordion.Item eventKey="0">
												<Accordion.Header>Subscribers</Accordion.Header>
												<Accordion.Body>
													<div className="attrSrch pb-2 mb-2 border-3 border-bottom">
														<div className="d-flex">
															<h6 className="attrSrchTxt">
																Search Attribute List
															</h6>
														</div>
													</div>
													<div className="queryItems">
														{subscriberAttributes.map((item) => (
															<p onClick={() => addRule(item)}>{item.label}</p>
														))}
													</div>
												</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="1">
												<Accordion.Header>Customers</Accordion.Header>
												<Accordion.Body>
													<div className="attrSrch pb-2 mb-2 border-3 border-bottom">
														<div className="d-flex">
															<h6 className="attrSrchTxt">
																Search Attribute List
															</h6>
														</div>
													</div>
													<div className="queryItems">
														<p>Earliest_Customer_Final_Customer_Name</p>
														<p>Earliest_Customer_Acquistion_Date</p>
														<p>Earliest Customer_Birth_Date</p>
														<p>Gender_Type_Description</p>
														<p>Highest_Monthly_Service_Fee_Amount</p>
														<p>Online_Shopper_Bucket</p>
														<p>Total_Broadband_Lines_Count</p>
														<p>Total_Lines_Count</p>
														<p>Total_Reload_Amount</p>
														<p>Total_Gross_Service_Revenue_Indicative_Amount</p>
														<p>Total_Promo_Avaimen_Count</p>
														<p>Total-Reward_Points_Earned_Quantity</p>
														<p>Highest_Net_Promoter_Score_Description</p>
														<p>Total_Data_Volume_Count</p>
														<p>Total_Voice_Minutes</p>
														<p>Total_Sms_Usage_Count</p>
													</div>
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
								</div> */}
								<div className="col-lg-12">
									<div className="queryContent">
										<div className="queryHeader">
											<h4 className="quertHeaderTxt my-3 text-center">
												Drag and Drop Attribute to create your own Rule
											</h4>
										</div>
										<div className="queryDropper">
											{subscriber && customer ? (
												<div className="sub-cus-query-builder-wrap">
													<div>
													<div className="queryHeading mb-2">
														<h5>Subscribers</h5>
													</div>
													<QueryBuilder
														fields={subscriberAttributes}
														query={query}
														onQueryChange={(q) => setQuery(q)}
														showCombinatorsBetweenRules
														controlClassnames={{
															queryBuilder: "queryBuilder-branches",
														}}
													/>
													
													<div className="d-flex align-items-center">
														<h5>
															<span className="ruleGroup-addRule me-5">
																Subscriber Filters:{" "}
															</span>
														</h5>
														<p className="mt-4 ms-2">
															<div id="test">{queryValue}</div>
														</p>
													</div>
													</div>
													<div style={{borderTop: "2px solid #D8E0FF"}}>
													<div className="queryHeading mt-2 mb-2">
														<h5>Customer</h5>
													</div>
													<QueryBuilder
														fields={customerAttributes}
														query={cusQuery}
														onQueryChange={(q) => cusSetQuery(q)}
														showCombinatorsBetweenRules
														controlClassnames={{
															queryBuilder: "queryBuilder-branches",
														}}
													/>
													<div className="d-flex align-items-center">
														<h5>
															<span className="ruleGroup-addRule me-5">
																Customer Filters:{" "}
															</span>
														</h5>
														<p className="mt-4 ms-2">
															<div id="test">{queryData}</div>
														</p>
													</div>
													</div>
												</div>
											) : subscriber ? (
												<div>
													<div className="queryHeading mb-2">
														<h5>Subscriber</h5>
													</div>

													{/* <QueryBuilderAntD> */}
														<QueryBuilder
															fields={subscriberAttributes}
															query={query}
															onQueryChange={(q) => setQuery(q)}
															showCombinatorsBetweenRules
															controlClassnames={{
																queryBuilder: "queryBuilder-branches",
															}}
														/>
													{/* </QueryBuilderAntD> */}
													<div className="d-flex align-items-center">
														<h5>
															<span className="ruleGroup-addRule me-5">
																Selected Filters:{" "}
															</span>
														</h5>
														<p className="mt-4 ms-2">
															<div id="test">{queryValue}</div>
														</p>
													</div>
												</div>
											) : (
												<div>
													<div className="queryHeading mb-2">
														<h5>Customer</h5>
													</div>
													<QueryBuilder
														fields={customerAttributes}
														query={cusQuery}
														onQueryChange={(q) => cusSetQuery(q)}
														showCombinatorsBetweenRules
														controlClassnames={{
															queryBuilder: "queryBuilder-branches",
														}}
													/>
													<div className="d-flex align-items-center">
														<h5>
															<span className="ruleGroup-addRule me-5">
																Selected Filters:{" "}
															</span>
														</h5>
														<p className="mt-4 ms-2">
															<div id="test">{queryData}</div>
														</p>
													</div>
												</div>
											)}

											<div className="btn-box text-end mt-5">
												<button
													className="btn btn-outline-primary me-2"
													onClick={handleReset}>
													Clear
												</button>
												<button
													className="btn btn-primary me-2"
													onClick={handleSubmit}>
													Submit
												</button>
												<Link to="/" className="btn btn-outline-primary">
													Cancel
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</MainCard>
			</Spin>
		</>
	);
}

export default Index;
