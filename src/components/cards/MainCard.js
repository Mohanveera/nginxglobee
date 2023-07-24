import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Button, Checkbox, Popover, Dropdown, Select, Form, Input } from "antd";
import {
	CloseOutlined,
	CaretDownOutlined,
	DoubleRightOutlined,
} from "@ant-design/icons";
import { BsPlusLg } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import ContentModal from "../modals/ContentModal";
import FilterCard from "../forms/FilterCard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { formatQuery } from "react-querybuilder";
import ApiService from "../api/apiService";
import { setSelectFilters, setEditing, setUserName } from "../../redux/Actions";
import { ModalForm } from "../common/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckboxGroupModal from "../common/CheckboxGroupModal";

import {
	setSubscriber,
	setCustomer,
	setSubscriberAttributes,
	setLoading,
	setLoggedIn,
	setSelectedItems,
	setPreviewAttributes,
	setPreviewData,
	setChartItems,
	setHasFunctionReturn,
	setQueryValue,
} from "../../redux/Actions";
import userEvent from "@testing-library/user-event";
import { configConsumerProps } from "antd/es/config-provider";

const apiservice = new ApiService();

function MainCard({ children, setActivePage, bodyCard }) {
	const history = useNavigate();
	const { Option } = Select;
	const queryRef = useRef(null);
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() - 2);
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const day = String(currentDate.getDate()).padStart(2, "0");
	const [activeItem, setActiveItem] = useState(0);
	const [modalShow, setModalShow] = useState(false);
	const [saveAudiencemodalShow, setSaveAudiencemodalShow] = useState(false);
	const [previewModalShow, setPreviewModalShow] = useState(false);
	const [queryData, setQueryData] = useState(null);
	const [showPopover, setShowPopover] = useState(false);
	// const [editing, setEditing] = useState(false);
	const [editedQueryData, setEditedQueryData] = useState(queryData);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [selectedValue, setSelectedValue] = useState("B2B");
	const [data, setData] = useState([]);
	const [showLink, setShowLink] = useState(false);

	// ***dispatch & selector *******
	const dispatch = useDispatch();
	const subscriber = useSelector((state) => state.subscriber);
	const customer = useSelector((state) => state.customer);
	const subscriberAttributes = useSelector((state) => state.attributes);
	const selectedItems = useSelector((state) => state.selected);
	const previewAttributes = useSelector((state) => state.previewAttributes);
	const previewData = useSelector((state) => state.previewData);
	const selectFilters = useSelector((state) => state.selectFilters);
	const editing = useSelector((state) => state.editing);
	const hasFunctionReturn = useSelector((state) => state.hasFunctionReturn);
	const username = useSelector((state) => state.username);
	const queryValue = useSelector((state) => state.queryValue);
	const [formVisible, setFormVisible] = useState(false);
	const [insights, setInsights] = useState([
		"lifestage",
		"psychographic segment",
		"superapp user indicator",
	]);
	const [insightAttributes, setInsightAttributes] = useState([]);
	

	const [visible, setVisible] = useState(false);

	console.log("fff", insightAttributes);
	console.log("fff", selectFilters);

	const ClampedDiv = ({ children }) => {
		const [open, setOpen] = useState(false);
		const ref = useRef(null);

		// This is where I'd do the line number calculation, but it's just
		// using a placeholder instead.

		useLayoutEffect(() => {
			if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
				setShowLink(true);
			} else {
				setShowLink(false);
			}
		}, [ref]);

		let textClass = "text";

		return (
			<div className="container">
				<span class={textClass} ref={ref}>
					{children}
				</span>
				{showLink && !open}
			</div>
		);
	};
	const handleShowPopoverOpen = () => {
		setShowPopover(true);
	};

	const handlePopoverClose = () => {
		setShowPopover(false);
	};

	//**** */ check or uncheck subscriber *******
	const onChangeSubscriber = (e) => {
		dispatch(setSubscriber(!subscriber));
	};

	// ******* handle check or uncheck customer ******
	const onChangeCustomer = (e) => {
		if (e.target.checked) {
			setIsDropdownVisible(true);
		} else {
			setIsDropdownVisible(false);
		}
		dispatch(setCustomer(!customer));
	};

	const editFilter = () => {
		dispatch(setEditing(true));
		history("/queryBuilder");
	};
	const handleSaveQuery = (isVisible) => {
		// dispatch(setEditing(false));

		setVisible(isVisible);
	};

	const handleCusTypeChange = (e) => {
		setSelectedValue(e);
	};
	const handleSaveAudience = (formValues) => {
		const saveAudience = async () => {
			const res = await apiservice.saveAudience(
				formValues.audienceName,
				formValues.description,
				username
			);
			if (res.status === 200) {
				toast.success("Audience saved successfully");
				console.log("Successfully saved");
			} else if (res.code === "ERR_BAD_REQUEST") {
			} else if (res.statusText === "Unauthorized") {
				history("/");
			} else if (res.status === 500) {
				toast.error("Internal Server Error, please try again");
			}
		};
		saveAudience();
	};

	// ********* hanldesubmit insight attributes

	const handleInsightsSubmit = async (selectedCheckboxes) => {
		console.log("selectedCheckboxes", selectedCheckboxes);
		setInsights(selectedCheckboxes);
		if (selectedCheckboxes.length > 0) {
			fetchData(selectedCheckboxes, queryValue);
		}
		setModalShow(false);
		setLoading(false);
	};

	const prevSelectFiltersRef = useRef(selectFilters);
	const isFirstUpdate = useRef(true);

	useEffect(() => {
		if (
			!isFirstUpdate.current &&
			prevSelectFiltersRef.current !== selectFilters
		) {
			getMultiAttribute();
		}
		prevSelectFiltersRef.current = selectFilters;
		isFirstUpdate.current = false;
	}, [selectFilters]);

	const fetchData = async (selectedCheckboxes, queryValue) => {
		if (selectedCheckboxes) {
			console.log("selectedCheckboxes", selectedCheckboxes);
			let sqlQuery = "";
			selectedCheckboxes.forEach((item, index) => {
				if (index !== 0) {
					sqlQuery += "\n";
				}
				sqlQuery += `SELECT '${item.toUpperCase()}' AS variable_name, ${item.toUpperCase()} AS variable, COUNT(${item.toUpperCase()}) AS frequency
		  FROM PRD_DB_UUP.UUP_EXT.subscriber_profile_vw where profile_date = '${year}-${month}-${day}'`;
				if (queryValue) {
					// const removedParentheses = queryValue.replace(/[()]/g, "");
					// const convertedToUpper = removedParentheses.toUpperCase();
					sqlQuery += ` AND ${queryValue}`;
				}

				sqlQuery += `
		  GROUP BY ${item.toUpperCase()}`;

				if (index !== selectedCheckboxes.length - 1) {
					sqlQuery += "\nUNION ALL";
				}
			});

			// Wait for the completion of dispatching setSelectFilters
			await dispatch(setSelectFilters(sqlQuery));
			console.log("insights", sqlQuery);
		}
	};

	const handlePreviewSubmit = () => {
		getpreview(selectedItems);
		setPreviewModalShow(false);
	};
	const handleApply = () => {
		fetchData(insights, queryValue);
		dispatch(setEditing(false));
	};

	// apis

	const getMetadata = async () => {
		dispatch(setLoading(true));
		try {
			const res = await apiservice.getMetadata();
			const data = res.data ? res.data : [];

			const insight = data.map(({ values, ...rest }) => {
				return { ...rest, values: values.flat() };
			});

			const insightData = insight.filter(
				(item) =>
					item.inputType === "varchar(1000)" || item.inputType === "boolean"
			);

			console.log("insightData", insightData);

			console.log("insightData", insightData);
			
			const filteredData = data
				.map(({ values, ...rest }) => {
					return { ...rest, values: values.flat() };
				})
				.map((data) => ({
					name: data.name,
					label: data.label,
					defaultValue: data.values[0],
					valueEditorType: "select",
					values: data.values.map((item) => ({ label: item, label: item })),
				}));
				setInsightAttributes(filteredData);
			dispatch(setSubscriberAttributes(filteredData));
			
			dispatch(setLoading(false));
		} catch (error) {
			console.log(error);
			dispatch(setLoggedIn(false));
		}
	};

	const getpreview = async (keysToExtract) => {
		dispatch(setLoading(true));
		try {
			const res = await apiservice.getpreview();

			// const parsedData = JSON.parse(res.data);
			const parsedData = res.data;
			let extractedData;
			let formattedValues;

			if (!Array.isArray(keysToExtract) || keysToExtract.length === 0) {
				extractedData = parsedData;
			} else {
				formattedValues = keysToExtract?.map((key) => key.replace(/ /g, "_"));
				extractedData = parsedData.map((obj) => {
					const extractedObj = {};
					formattedValues.forEach((key) => {
						extractedObj[key] = obj[key];
					});
					return extractedObj;
				});
			}

			dispatch(setPreviewData(extractedData));

			const modifiedKeys = extractedData.map((obj) => {
				const modifiedObj = {};
				Object.keys(obj).forEach((key) => {
					const newKey = key.replace(/_/g, " ");
					modifiedObj[newKey] = obj[key];
				});
				return modifiedObj;
			});

			const keys = Object.keys(modifiedKeys[0]);

			dispatch(setPreviewAttributes(keys));
			dispatch(setLoading(false));
		} catch (error) {
			console.log(error);
			dispatch(setLoading(false));
		}
	};

	const getMultiAttribute = async () => {
		dispatch(setLoading(true));
		try {
			const res = await apiservice.getMultiAttribute(selectFilters);
			console.log(res);
			if (res && res.length > 0) {
				dispatch(setChartItems(res));
				dispatch(setLoading(false));
			}

			dispatch(setLoading(false));
		} catch (error) {
			console.log(error);
			dispatch(setLoggedIn(false));
			dispatch(setLoading(false));
		}
	};

	useEffect(() => {
		console.log("inital render fetch data");
		let key = localStorage.getItem("key")		
		setInsights(JSON.parse(key))
		if(!hasFunctionReturn){
			fetchData(insights, queryValue);
			dispatch(setHasFunctionReturn(true));
		}
		
	
	}, []);

	useEffect(() => {
		// Only fetch metadata when insightAttributes is empty
		if (insightAttributes.length === 0) {
		  console.log("inital render meta data");
		  getMetadata();
		}
	  }, []);

	

	return (
		<>
			<div className="m-3">
				<div class="row">
					<div class="col-lg-6">
						<h5 className="card-text mb-3">AUDIENCES</h5>
					</div>
					<div className="col-lg-6">
						<div className="d-flex justify-content-end">
							<p className="pe-2 me-3 text-right">
								Last profile Date <br />
								<span className="primary-text" style={{ fontSize: "16px" }}>
									27th, May 2023
								</span>
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white main-card">
					<div className="card rounded">
						<div className="card-header bg-white p-0">
							<div className="row d-flex w-100 justify-content-between align-items-center flex-wrap">
								<div className="d-flex align-items-center col-sm-3">
									<h4
										className="card-header-text py-3 px-3"
										style={{
											borderTopLeftRadius: "5px",
											height: "100%",
											background: "#293395",
										}}>
										DEFAULT
									</h4>
									{queryValue ? (
										<Link disabled>
										<img
											src="assets/img/filter.svg"
											className="logo px-3"
											alt=""
										/>
									</Link>
									) : (
										<Link to="/queryBuilder">
										<img
											src="assets/img/filter.svg"
											className="logo px-3"
											alt=""
										/>
									</Link>
									)}
									{queryValue ?(
										<div
										onClick={() => {
											editFilter();
										}}
										className="d-flex align-items-center"
										style={{ cursor: "pointer" }}>
										<FiEdit size={20} color="#D8DDEA" />
										<span style={{ color: "#D8DDEA" }}>Edit Filters</span>
									</div>
									):(
										<div										
										className="d-flex align-items-center"
										style={{ cursor: "pointer" }}>
										<FiEdit size={20} color="#D8DDEA" />
										<span style={{ color: "#D8DDEA" }}>Edit Filters</span>
									</div>
									)}

									
								</div>
								<div
									ref={queryRef}
									className="queryBox col-sm-7"
									style={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "wrap",
									}}>
									{showPopover ? (
										<Popover
											id="count-line"
											content={
												<div className="d-flex">
													<div
														className="d-flex align-items-center gap-2 p-2 "
														style={{ fontSize: "12px" }}>
														<span
															style={{
																color: "#EA4648",
																whiteSpace: "nowrap",
															}}>
															{" "}
															Selected Filters:{" "}
														</span>
														{selectFilters}
													</div>
													<div>
														<Button
															type="text"
															icon={<CloseOutlined />}
															onClick={handlePopoverClose}
															className="popupClose"
														/>
													</div>
												</div>
											}
											placement="center"
											visible={showPopover}
											display="relative">
											<ClampedDiv>{selectFilters}</ClampedDiv>
										</Popover>
									) : (
										<ClampedDiv
											style={{
												visibility: showPopover ? "hidden" : "visible",
											}}>
											{selectFilters}
										</ClampedDiv>
									)}
								</div>

								<div className="d-flex align-items-center justify-content-between col-sm-2">
									<div style={{ position: "relative", right: "20px" }}>
										<DoubleRightOutlined
											onClick={handleShowPopoverOpen}
											style={{
												visibility: showLink ? "visible" : "hidden",
												color: "#EA4648",
												fontSize: "15px",
											}}
										/>
									</div>
									{editing ? (
										<button
											className="btn me-3 btn-disabled prime-btn"
											onClick={handleApply}>
											Apply
										</button>
									) : (
										<button className="btn me-3 btn-disabled" disabled>
											Apply
										</button>
									)}

									<button
										className="btn me-3 btn-disabled-outline active-save-btn"
										onClick={() => handleSaveQuery(true)}>
										Save
									</button>

									{/* // 	<button
									// 		className="btn me-3 btn-disabled-outline"
									// 		onClick={handleSaveQuery}>
									// 		Save
									// 	</button> */}
								</div>
							</div>
						</div>
						<div className="card-body">
							<div className="main-content p-4">
								{!bodyCard ? (
									<>
										<div className="border-bottom border-2 pb-0">
											<div className="main-content-header d-flex">
												<div
													onClick={() => {
														setActiveItem(0);
														setActivePage(0);
													}}
													className={
														activeItem == 0
															? `main-content-header-text active d-flex px-3 py-3 mx-3`
															: `main-content-header-text d-flex px-3 py-3 mx-3`
													}>
													<RxDashboard style={{ fontSize: "20px" }} />
													<h3 className="ms-2 content-text">Insights</h3>
												</div>
												<div
													onClick={() => {
														setActiveItem(1);
														setActivePage(1);
														// getpreview(selectedItems);
													}}
													className={
														activeItem == 1
															? `main-content-header-text active d-flex px-3 py-3 mx-3`
															: `main-content-header-text d-flex px-3 py-3 mx-3`
													}>
													<RxDashboard style={{ fontSize: "20px" }} />
													<h3 className="ms-2 content-text">
														Preview and Export
													</h3>
												</div>
											</div>
										</div>
										<div className="sub-view p-3">
											<span className="text-grey me-2">Select View:</span>
											<Checkbox
												className="text-grey"
												checked={subscriber}
												onChange={onChangeSubscriber}>
												Subscriber
											</Checkbox>
											<Checkbox
												className="text-grey"
												checked={customer}
												onChange={onChangeCustomer}>
												Customer
											</Checkbox>
											{isDropdownVisible && (
												<Select
													suffixIcon={
														<CaretDownOutlined style={{ color: "#7887A6" }} />
													}
													defaultValue="B2B"
													onChange={handleCusTypeChange}>
													<Option value="B2B">B2B</Option>
													<Option value="B2C">B2C</Option>
												</Select>
											)}
										</div>
										<div className="filter-view pb-3">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<p className="mp-h1">
														<span className="text-blue">Subscribers:</span>
														<span className="mx-1 text-small">
															Audience Size:{" "}
														</span>
														<span className="text-blue">
															<b>85,466,232</b>
														</span>
													</p>
												</div>
												<div className="d-flex align-items-center">
													{activeItem == 0 ? (
														<Button
															className="me-2"
															type="outlined"
															icon={<BsPlusLg />}
															style={{
																color: "#1E4397",
																borderColor: "#1E4397",
																borderRadius: "5px",
															}}
															onClick={() => setFormVisible(!formVisible)}>
															<span className="text-black">Add Insights</span>
														</Button>
													) : (
														<div>
															<img
																src="assets/img/eye.svg"
																className="me-2"
																alt=""
																onClick={() => setPreviewModalShow(true)}
															/>
															<img src="assets/img/upload.svg" alt="" />
														</div>
													)}
												</div>
											</div>
										</div>
									</>
								) : null}
								<div className="children-content">{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<CheckboxGroupModal
					formVisible={formVisible}
					setFormVisible={setFormVisible}
					onSubmit={handleInsightsSubmit}
					options={insightAttributes.map((item) => item.label)}
					title="Add Insights"
					droplabel="Select Audience Insights"
					otherState={insights}
				/>

				<ContentModal
					show={previewModalShow}
					onHide={() => setPreviewModalShow(false)}
					onSubmit={handlePreviewSubmit}
					title="Add Preview Attributes"
					content={
						<FilterCard
							finalCount={100}
							// objectData={apiObject}
							// paginateApi={getConsumer}
							// download={false}
							// dataDownload={data}
							colFix="col-lg-12"
							multiple={true}
							staticData={true}
							hideBtns={true}
							data={[
								{
									label: "Add Preview Attributes",
									type: "select",
									value: "consumer",
									filterList: previewAttributes.map((item) => item),
								},
							]}
							title=""
						/>
					}
				/>
				<ModalForm
					visible={visible}
					onModalVisibility={handleSaveQuery}
					labelName="Audience"
					onSave={handleSaveAudience}
					title="Save an Audience"
				/>
			</div>
		</>
	);
}

export default MainCard;
