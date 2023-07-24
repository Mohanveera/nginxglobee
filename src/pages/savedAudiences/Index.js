import React, { useEffect, useState } from "react";
import TableData from "../../components/tables/TableData";
import DefaultCard from "../../components/cards/DefaultCard";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ApiService from "../../components/api/apiService";
import { Button } from "antd";
import { setLoading } from "../../redux/Actions";

function Index() {
	const apiservice = new ApiService();

	const [editData, setEditData] = useState([]);
	const [audienceType, setAudienceType] = useState("saved");
	const [savedAudienceData, setSavedAudienceData] = useState([]);
	const [sharedAudienceData, setSharedAudienceData] = useState([]);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [editAccess, setEditAccess] = useState(null);
	const [viewAccess, setviewAccess] = useState(null);

	const handleDeleteItem = (record) => {
		const updatedItems =
			audienceType === "saved"
				? [...savedAudienceData]
				: [...sharedAudienceData];

		const index = updatedItems.findIndex((item) => item.id === record.id);
		if (index !== -1) {
			updatedItems.splice(index, 1);

			if (audienceType === "saved") {
				setSavedAudienceData(updatedItems);
			} else if (audienceType === "shared") {
				setSharedAudienceData(updatedItems);
			}
		}
	};

	const handleEditRecord = (item) => {
		const labelsToRender = ["NAME", "des"];

		const newData = labelsToRender.map((label) => ({
			label: getModifiedLabel(label),
			type: "text",
			value: item[label] || "",
		}));

		setEditData(newData);
	};

	const getModifiedLabel = (label) => {
		if (label === "NAME") {
			return "Audience Name";
		} else if (label === "des") {
			return "Description";
		}

		return label;
	};

	const fetchSavedAudienceData = async () => {
		setLoading(true);
		try {
			const res = await apiservice.fetchListAudience();
			const data = res.data;
			console.log(data);
			setSavedAudienceData(data);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const fetchSharedAudienceData = async () => {
		setLoading(true);

		try {
			const res = await apiservice.fetchSharedAudience();
			const data = res.data;	
			console.log("sss",data)		
			setSharedAudienceData(data);			
			const firstDataItem = data[0];	
			let viewAccessValue;
			let editAccessValue

			if (firstDataItem && firstDataItem.viewAccess && firstDataItem.viewAccess[0] && firstDataItem.editAccess && firstDataItem.editAccess[0]) {
			 viewAccessValue = firstDataItem.viewAccess[0].S;
				console.log("viewAccessValue:", viewAccessValue);
			  
			 editAccessValue = firstDataItem.editAccess[0].S;
				console.log("editAccessValue:", editAccessValue);
			  } else {
				console.log("Unable to retrieve values from firstDataItem");
			  }
			
			setviewAccess(viewAccessValue);
			setEditAccess(editAccessValue);
			
			
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (audienceType === "saved") {
			fetchSavedAudienceData();
		} else if (audienceType === "shared") {
			fetchSharedAudienceData();
		}
	}, [audienceType]);

	

	return (
		<>
			<DefaultCard
				title="AUDIENCES"
				btnList={[
					{
						label: "Saved Audience",
						onClick: () => setAudienceType("saved"),
					},
					{
						label: "Shared Audience",
						onClick: () => setAudienceType("shared"),
					},
				]}>
				<div className="">
					<div className="search">
						<div className="row justify-content-end">
							<div className="col-lg-4">
								<Input placeholder="Search Here" suffix={<SearchOutlined />} />
							</div>
						</div>
					</div>
					{audienceType === "saved" && (
						<TableData
							dynamicClass="saved"
							data={savedAudienceData}
							editData={editData}
							filters={{}}
							orgData={true}
							paginate={false}
							handleDeleteItem={handleDeleteItem}
							handleEditRecord={handleEditRecord}
							arrayData={[
								{ label: "ID", name: "audienceId" },
								{ label: "NAME", name: "audienceName" },
								{ label: "DESCRIPTION", name: "description" },
								{ label: "USERNAME", name: "userName" },
								{ label: "PROFILE DATE", name: "profileDate" },
								{ label: "ACTION", name: "action" },
							]}
						/>
					)}
					{audienceType === "shared" && (
						<TableData
							dynamicClass="shared"
							data={sharedAudienceData}
							audienceType={audienceType}
							editData={editData}
							filters={{}}
							orgData={true}
							paginate={false}
							handleDeleteItem={handleDeleteItem}
							handleEditRecord={handleEditRecord}
							arrayData={[
								{ label: "ID", name: "audienceId" },
								{ label: "NAME", name: "audienceName" },
								{ label: "DESCRIPTION", name: "description" },
								{ label: "USERNAME", name: "userName"},
								{ label: "PROFILE DATE", name: "profileDate" },
								{ label: "SHARED DATE", name: "sharedDate" },
								{ label: "EDIT ACCESS", name: "editAccess", value: editAccess},
								{ label: "VIEW ACCESS", name: "viewAccess", value: viewAccess},
								{ label: "ACTION", name: "action" },
							]}
						/>
					)}
				</div>
			</DefaultCard>
		</>
	);
}

export default Index;
