import { Table } from "antd";
import React from "react";
import ContentModal from "../modals/ContentModal";
import FilterCard from "../forms/FilterCard";
import { useState } from "react";
import { ModalForm } from "../common/Form";
import ApiService from "../api/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoggedIn } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function TableData({
	orgData,
	data,
	paginateApi,
	filters,
	paginate,
	year,
	arrayData,
	apiObject,
	handleEditRecord,
	handleDeleteItem,
	editData,
	dynamicClass,
}) {
	const apiservice = new ApiService();
	const navigate = useNavigate();
	let finalData = orgData == true ? data : data.data;

	const [page, setPage] = React.useState(1);
	const [show, setShow] = React.useState(false);
	const [modalShow, setModalShow] = React.useState(false);
	const [modalContent, setModalContent] = React.useState("");
	// const [zoomImage, setZoomImage] = React.useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [isVisibleUpdateAudience, setIsVisibleUpdateAudience] = useState(false);
	const [isVisibleShareAudience, setIsVisibleShareAudience] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const dispatch = useDispatch();

	const handleUpdateAudienceModal = (isVisible, record) => {
		setSelectedRecord(record);
		setIsVisibleUpdateAudience(isVisible);
	};

	const handleShareAudienceModal = (isVisible, record) => {
		setSelectedRecord(record);
		setIsVisibleShareAudience(isVisible);
	};

	const handleShareAudience = (formValues) => {
		const audienceID = selectedRecord.audienceId;
		const audienceName = selectedRecord.audienceName;
		const description = selectedRecord.description;
		const createdAt = selectedRecord.createdAt;
		const modifiedAt = selectedRecord.modifiedAt;
		const profileDate = selectedRecord.profileDate;
		const userName = selectedRecord.userName;
		const sharedDate = new Date().toISOString();
		let editAccess = "";
		let viewAccess = "";
		console.log("aaaa", formValues);
		if (formValues.permissions === "edit") {
			if (formValues.emailIds) {
				editAccess = formValues.emailIds;
			}
		} else {
			if (formValues.emailIds) {
				viewAccess = formValues.emailIds;
			}
		}

		const data = {
			audienceId: audienceID,
			audienceName: audienceName,
			description: description,
			createdAt: createdAt,
			modifiedAt: createdAt,
			profileDate: createdAt,
			userName: userName,
			sharedDate: sharedDate,
			editAccess: [editAccess],
			viewAccess: [viewAccess],
		};

		const shareAudience = async () => {
			try {
				const res = await apiservice.shareAudience(data);
				if (res.status === 200) {
					toast.success("Audience shared successfully");
					console.log("Successfully saved Shared Audience");
				} else {
					console.log(res);
				}
			} catch (error) {
				if (error.response.status === 401) {					
					localStorage.setItem("loggedIn", false);
					navigate("/");
					window.location.reload();
					console.log("signature expired");
				}
				toast.error(
					"Error occurred while sharing audience, please try again later"
				);
			}
		};

		shareAudience();
		setModalShow(false);
	};
	const handleUpdateAudience = async (formValues) => {
		try {
			const audienceID = selectedRecord.audienceId;
			const audienceName = formValues.audienceName;
			const description = formValues.description;
	
			const editAccess = selectedRecord.editAccess;
			const viewAccess = selectedRecord.viewAccess;
			let editAccessValue;
			let viewAccessValue;
			if (editAccess && editAccess[0] && editAccess[0].S) {
				editAccessValue = editAccess[0].S;
			}
			if (viewAccess && viewAccess[0] && viewAccess[0].S) {
				viewAccessValue = viewAccess[0].S;
			}
	
			console.log(audienceID);
			console.log(audienceName);
	
			const data = new URLSearchParams();
			data.append("audienceID", audienceID);
			data.append("audienceName", audienceName);
			data.append("description", description);
			console.log("ssss", editAccessValue);
	
			const body = {
				editAccess: [editAccessValue],
				viewAccess: [viewAccessValue],
			};
	
			if (dynamicClass === "saved") {
				const res = await apiservice.updateSavedAudience(data);
				if (res.status === 200) {
					toast.success("Audience updated successfully");
					console.log("Audience updated successfully");
				} else if (res.code === "ERR_BAD_REQUEST") {
					console.log(res.code);
				}
			} else {
				const res = await apiservice.updateSharedAudience(data, body);
				if (res.status === 200) {
					console.log(res);
					toast.success("Audience updated successfully");
					console.log("Successfully Updated Shared Audience");
				} else if (res.code === "ERR_BAD_REQUEST") {
					toast.error("An error occurred while updating the audience");
					console.log(res.code);
				}
			}
		} catch (error) {
			if (error.response.status === 401) {					
				localStorage.setItem("loggedIn", false);
				navigate("/");
				window.location.reload();
				console.log("signature expired");
			}
			toast.error(
				"Error occurred while updating audience, please try again later"
			);
		}
	};
	

	const handleRemoveItem = async (record) => {
		try {
			console.log(record);
			const audienceID = record.audienceId;
			console.log(record.audienceId);
			const audienceName = record.audienceName;
			const data = new URLSearchParams();
			data.append("audienceId", audienceID);
			data.append("audienceName", audienceName);
	
			let res;
			if (dynamicClass === "saved") {
				console.log("deleted saved");
				res = await apiservice.deleteSavedAudience(data);
				if (res.status === 200) {
					toast.success("Audience deleted successfully");
					console.log("Saved audience deleted successfully");
				} else if (res.code === "ERR_BAD_REQUEST") {
					console.log(res.code);
				}
			} else {
				res = await apiservice.deleteSharedAudience(data);
				if (res.status === 200) {
					toast.success("Audience deleted successfully");
					console.log("Successfully Deleted");
				} else if (res.code === "ERR_BAD_REQUEST") {
					console.log(res.code);
				}
			}
		} catch (error) {
			if (error.response.status === 401) {					
				localStorage.setItem("loggedIn", false);
				navigate("/");
				window.location.reload();
				console.log("signature expired");
			}
			toast.error(
				"Error occurred while updating audience, please try again later"
			);
		}
	};

	// const getAudience = async (record) =>{
	// 	  const id = record.audienceId;
	// 	console.log(id)
	// 	try {
	// 		const res = await apiservice.getAudience(id);
	// 		console.log("row clicked",id)
			
	// 	} catch (error) {			
	// 		toast.error(
	// 			"Error occurred while updating audience, please try again later"
	// 		);
	// 	}
	// }
	
	let objectData = finalData?.find((item, index) => index == 0);
	let mapData = objectData ? Object.keys(objectData) : [];

	let lp = !arrayData
		? mapData &&
		  mapData.map((item, i) => {
				const cleanedItem = item.replace(/_/g, " ");

				return {
					title: `${cleanedItem}`,
					dataIndex: `${item}`,
					key: i,
					width: 350,
					// textWrap: 'word-break',
					// ellipsis: true,
					// fixed: i < 1 ? 'left' : null,
					// sorter: true,
					render: (val) => <>{val}</>,
				};
		  })
		: arrayData.map((item, i) => {
				if (item.name === "action") {
					return {
						title: `${!item.label ? item.name : item.label}`,
						dataIndex: `${item.name}`,
						key: i,
						width: 300,
						textWrap: "break-word",
						ellipsis: true,
						render: (val, record) => {
							return (
								<div className={`text-center ${dynamicClass}`}>
									<img
										id="shared"
										src="./assets/img/share.svg"
										onClick={(e) => {
											// setModalContent("Share an audience");
											// setModalShow(!modalShow);
											handleShareAudienceModal(true, record);
										}}
										className="action-icon"
										alt=""
									/>
									<img
										src="./assets/img/edit-01.svg"
										onClick={() => {
											handleUpdateAudienceModal(true, record);
											// setModalContent("Edit an audience");
											// setModalShow(!modalShow);
										}}
										className="action-icon"
										alt=""
									/>
									<img
										src="./assets/img/delete.svg"
										onClick={() => {
											handleRemoveItem(record);
											handleDeleteItem(record);
										}}
										className="action-icon"
										alt=""
									/>
								</div>
							);
						},
					};
				} else if (item.name === "viewAccess") {
					return {
						title: `${!item.label ? item.name : item.label}`,
						dataIndex: `${item.name}`,
						key: i,
						width: 300,
						textWrap: "break-word",
						ellipsis: true,
						render: (val, record) => {
							return <span style={{ whiteSpace: "normal" }}>{item.value}</span>;
						},
					};
				} else if (item.name === "editAccess") {
					return {
						title: `${!item.label ? item.name : item.label}`,
						dataIndex: `${item.name}`,
						key: i,
						width: 300,
						textWrap: "break-word",
						ellipsis: true,
						render: (val, record) => {
							return <span style={{ whiteSpace: "normal" }}>{item.value}</span>;
						},
					};
				} else {
					return {
						title: `${!item.label ? item.name : item.label}`,
						dataIndex: `${item.name}`,
						key: i,
						width: 300,
						textWrap: "break-word",
						ellipsis: true,
						render: (val, record) => {
							return <span style={{ whiteSpace: "normal" }}>{val}</span>;
						},
					};
				}
		  });

	return (
		<>
			<div className="row mt-3">
				<div className="col-lg-12">
					<Table
					// onRow={(record) => ({
					// 	onClick: () => getAudience(record),
					//   })}
						className="custom-table"
						style={{ whiteSpace: "break-spaces" }}
						// loading={data.loading}
						columns={lp}
						dataSource={finalData}
						bordered
						scroll={{
							x: 300,
							y: 400,
						}}
						pagination={
							paginate == true
								? {
										pageSize: 20,
										total: finalData.length == 20 ? page * 20 + 1 : page * 20,
										current: page,
										onChange: (page) => {
											setPage(page);
											// dispatch(paginateApi({...filtersData.filterObject,page:page}))
										},
								  }
								: { showSizeChanger: true, pageSize: 20 }
						}
						
					/>
				</div>
			</div>
			<ContentModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				title={modalContent}
				hideFooter={true}
				width={800}
				// height={300}
				content={
					<>
						{modalContent == "Share an audience"
							? "Enter the user email Id in the below field to whom you want share the audience data and choose what type of access you wan to give them"
							: null}

						<div className="mt-2"></div>

						{modalContent == "Share an audience" ? (
							<>
								<FilterCard
									finalCount={100}
									// objectData={apiObject}
									// paginateApi={getConsumer}
									// download={false}
									// dataDownload={data}
									colFix="col-lg-6"
									multiple={false}
									staticData={true}
									hideBtns={true}
									data={[
										{
											label: "Email Id",
											type: "select",
											value: "consumer",
											filterList: [
												{ label: "test1@gmail.com", value: "test1@gmail.com" },
												{ label: "test2@gmail.com", value: "test2@gmail.com" },
												{ label: "test3@gmail.com", value: "test3@gmail.com" },
											],
										},
										{
											label: "Permissions",
											type: "select",
											value: "consumer",
											filterList: [
												{ label: "Can View", value: true },
												{ label: "Can`t View", value: false },
											],
										},
									]}
									title=""
								/>

								<div className="btn-box text-end mt-2">
									<button className="btn btn-outline-primary me-2">
										Cancel
									</button>
									<button className="btn btn-primary me-2">Share</button>
								</div>
							</>
						) : modalContent == "Edit an audience" ? (
							<>
								<FilterCard
									finalCount={100}
									// objectData={apiObject}
									// paginateApi={getConsumer}
									// download={false}
									// dataDownload={data}
									colFix="col-lg-12"
									multiple={false}
									staticData={true}
									hideBtns={true}
									data={editData}
									title=""
								/>
								<div className="btn-box text-end mt-2">
									<button className="btn btn-outline-primary me-2">
										Cancel
									</button>
									<button className="btn btn-primary me-2">Update</button>
								</div>
							</>
						) : null}
					</>
				}
			/>
			<ModalForm
				visible={isVisibleUpdateAudience}
				onModalVisibility={handleUpdateAudienceModal}
				labelName="Audience Name"
				onSave={handleUpdateAudience}
				record={selectedRecord}
				showShareFields={false}
				title="Edit an Audience"
			/>
			<ModalForm
				visible={isVisibleShareAudience}
				onModalVisibility={handleShareAudienceModal}
				labelName="Audience Name"
				onSave={handleShareAudience}
				record={selectedRecord}
				title="Share an Audience"
				showShareFields="true"
				subtitle="Enter the user emaild id in the below field to whom you want to share the audience data and choose what type of access you want to give them"
			/>
		</>
	);
}

export default TableData;
