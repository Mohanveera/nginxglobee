import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import MainCard from "../../components/cards/MainCard";
import BarChart from "../../components/graphs/BarChart";
import PieGraph from "../../components/graphs/PieGraph";
import ContentModal from "../../components/modals/ContentModal";
import TableData from "../../components/tables/TableData";
import ApiService from "../../components/api/apiService";
import {
	setLoading,
	setChartItems,
	removeItem,
	setSubscriber,
	setCustomer,
	setSubscriberAttributes,
	setLoggedIn,
	setPreviewAttributes,
	setPreviewData,
	setQueryValue
} from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const apiservice = new ApiService();

function Home({ storedIndex }) {
	const [modalShow, setModalShow] = useState(false);
	const [activePage, setActivePage] = useState(0);
	const [activeChart, setActiveChart] = useState();	
	const queryValue = useSelector(state=>state.queryValue)
	

	const dispatch = useDispatch();
	const loading = useSelector((state) => state.load);
	const chartItems = useSelector((state) => state.chart);
	const subscriber = useSelector((state) => state.subscriber);
	const customer = useSelector((state) => state.customer);	
	const previewData = useSelector((state) => state.previewData);

	const handleActiveChart = (item) => {
		setModalShow(true);
		setActiveChart(item);
	};
	const handleRemoveItem = (item,index) => {	
		console.log("fff",item)	 
		dispatch(removeItem());
		 const updatedQuery = removeRulesByField(item.title)
		 console.log("ffff",updatedQuery)
		 dispatch(setQueryValue(updatedQuery))
	};

	function removeRulesByField(fieldNameToRemove) {
		// Check if fieldNameToRemove is provided
		if (!fieldNameToRemove) {
		  console.error("fieldNameToRemove is required.");
		  return queryValue;
		}
	  
		// Filter out the rule that has the field name to remove
		const updatedRules = queryValue.rules.filter(
		  (rule) => rule.field !== fieldNameToRemove
		);
	  
		// Create a new query object with the updated rules
		const updatedQuery = {
		  ...queryValue,
		  rules: updatedRules,
		};
		console.log(updatedQuery);		
		return updatedQuery;
	  }
	  
	  
	 
	  
	  

	  


	return (
		<Spin spinning={loading} size="large">
			<MainCard setActivePage={setActivePage}>
				{activePage === 0 ? (
					<>
						{subscriber && customer ? (
							<div className="row sub-cus-font">
								{chartItems && chartItems.length > 0 ? (
									<>
										<div className="col-lg-6 mb-4">
											<div className="row ss">
												{chartItems.map((item, index) => (
													<div
														className={
															subscriber && customer
																? "col-lg-6 mb-4 p-1"
																: "col-lg-12 mb-4"
														}
														key={index}>
														<div className="card shadow-sm">
															<div className="card-body px-4">
																<BarChart
																	setModalShow={setModalShow}
																	item={item}
																	handleRemoveItem={handleRemoveItem}
																	handleActiveChart={handleActiveChart}
																/>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
										<div className="col-lg-6 mb-4">
											<div className="row sub-cus-font">
												{chartItems.map((item, index) => (
													<div
														className={
															subscriber && customer
																? "col-lg-6 mb-4 p-1"
																: "col-lg-12 mb-4"
														}
														key={index}>
														<div className="card shadow-sm">
															<div className="card-body px-4">
																<PieGraph
																	setModalShow={setModalShow}
																	item={item}
																	handleRemoveItem={handleRemoveItem}
																	handleActiveChart={handleActiveChart}
																/>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</>
								) : (
									<div>No data</div>
								)}
							</div>
						) : subscriber ? (
							<div className="row ">
								{chartItems && chartItems.length > 0 ? (
									chartItems.map((item, index) => (
										<div className="col-lg-6 mb-4" key={index}>
											<div className="card shadow-sm">
												<div className="card-body px-4">
													<BarChart
														setModalShow={setModalShow}
														item={item}
														handleRemoveItem={handleRemoveItem}
														handleActiveChart={handleActiveChart}
													/>
												</div>
											</div>
										</div>
									))
								) : (
									<div>No data</div>
								)}
							</div>
						) : (
							<div className="row ">
								{chartItems && chartItems.length > 0 ? (
									chartItems.map((item, index) => (
										<div className="col-lg-6 mb-4" key={index}>
											<div className="card shadow-sm">
												<div className="card-body px-4">
													<PieGraph
														setModalShow={setModalShow}
														item={item}
														handleRemoveItem={handleRemoveItem}
														handleActiveChart={handleActiveChart}
													/>
												</div>
											</div>
										</div>
									))
								) : (
									<div>No data</div>
								)}
							</div>
						)}

						<div className="row">
							<div className="col-lg-12">
								<ContentModal
									show={modalShow}
									onHide={() => setModalShow(false)}
									// title="Graph View"
									hideFooter={true}
									width={800}
									content={
										subscriber ? (
											<BarChart modalShow={modalShow} item={activeChart} />
										) : customer ? (
											<PieGraph modalShow={modalShow} item={activeChart} />
										) : (
											<div>
												<BarChart modalShow={modalShow} item={activeChart} />
												<PieGraph modalShow={modalShow} item={activeChart} />
											</div>
										)
									}
								/>
							</div>
						</div>
					</>
				) : (
					<>
						<TableData
							// data={[
							// 	{
							// 		createdAt: "",
							// 		uidNo: "",
							// 		mobileNo: "",
							// 		timestampIds: "",
							// 	},
							// ]}

							orgData={true}
							data={previewData}
							filters={{}}
							paginate={false}
							// arrayData={[
							// 	{ label: "ID", name: "Date", date: true },
							// 	{ label: "GID 1", name: "Consumer ID" },
							// 	{ label: "GID 1", name: "Mobile No" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Date", date: true },
							// 	{ label: "GID 1", name: "Consumer ID" },
							// 	{ label: "GID 1", name: "Mobile No" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// 	{ label: "GID 1", name: "Image" },
							// ]}
						/>
					</>
				)}
			</MainCard>
		</Spin>
	);
}

export default Home;
