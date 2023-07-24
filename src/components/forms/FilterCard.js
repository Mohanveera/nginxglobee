import { useState, useEffect } from "react";
import { Input, Select, DatePicker, Button, Spin, Checkbox,  } from "antd";
import { formatQuery } from "react-querybuilder";
import { setSelectedItems } from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
// import {useDispatch, useSelector} from 'react-redux';
// import {addFilters} from "../redux/auth/userSlice";
// import moment from 'moment';
// import Messages from "./Messages";
// import  {ArrowLeftOutlined} from '@ant-design/icons';

function FilterCard({
	title,
	objectData,
	paginateApi,
	data,
	finalCount,
	download,
	selectLoading,
	staticData,
	dataDownload,
	loading,
	colFix,
	back,
	label,
	orgData,
	autoChange,
	multipleApis,
	setGetFilters,
	downloadUrl,
	hideBtns,
	multiple
}) {

	const { TextArea } = Input;
	const [objArr, setObjArr] = useState(objectData);	
	const [showMessage, setShowMessage] = useState(false);

	const dispatch = useDispatch();
	const selectedItems = useSelector((state) => state.selected);
	

	const onChangeHandler = (val, lop) => {	
		
		
		// setObjArr({...objArr, [lop]:val})
		// !setGetFilters ? null : setGetFilters({...objArr, [lop]:val})
		// if(autoChange == true) {
		//     dispatch(paginateApi({...objArr, [lop]:val}))
		//     dispatch(addFilters({"data":{...objArr, [lop]:val}}))
		// }
	};
	
	const handleReset = () => {
		// if(multipleApis && multipleApis.length > 0) {
		//     multipleApis.map((api) => {
		//         setObjArr(objectData)
		//         dispatch(api(objectData))
		//     })
		//     dispatch(paginateApi(objectData))
		// }else {
		//     setObjArr(objectData)
		//     dispatch(paginateApi(objectData))
		// }
		// !setGetFilters ? null : setGetFilters(objectData)
		// setShowMessage(true)
		// setTimeout(() => {
		//     setShowMessage(false)
		// }, 2000)
	};

	useEffect(()=>{
		
	})
	
	const handleSubmit = () => {
		

		// 	// if(multipleApis && multipleApis.length > 0) {
		// 	//     multipleApis.map((api) => {
		// 	//         dispatch(api(objArr))
		// 	//         dispatch(addFilters({"data":objArr}))
		// 	//     })
		// 	// }else {
		// 	//     dispatch(paginateApi(objArr))
		// 	//     dispatch(addFilters({"data":objArr}))
		// 	// }
	};

	const handleDeselectAll = () => {
		// selectedItems("")
	};

	if (loading) {
		return "loading filters....";
	}
	return (
		<>
			{/* {showMessage && <Messages type='success' messageText="Reset was successful" />} */}
			<div className="row align-items-end">
				{data &&
					data.map((item, i) => {
						if (item.type == "text") {
							return (
								<>
									<div className={!colFix ? "col-lg-3" : colFix}>
										<label htmlFor="">{item.label}</label>
										<Input
											placeholder={item.label}
											//    allowClear
											value={selectedItems[item.value]}
											onChange={(val) =>{
												dispatch(setSelectedItems(val));
												onChangeHandler(val.target.value, item.value)
											}}
										/>
									</div>
								</>
							);

						} else if (item.type == "textarea") {
							return (
								<>
									<div className={!colFix ? "col-lg-3" : colFix}>
										<label htmlFor="">{item.label}</label>
										<TextArea
										rows={4}										
										placeholder={item.label}
											//    allowClear
										value={selectedItems[item.value]}
										onChange={(val) =>{
											dispatch(setSelectedItems(val));
									     onChangeHandler(val.target.value, item.value)
											}}
										/>
									</div>
								</>
							);
						}
						else if (item.type == "select") {
							return (
								<>
									<div className={!colFix ? "col-lg-3" : colFix}>
										<label htmlFor="">{item.label}</label>
										{staticData == true ? (
											<Select
												// allowClear
												mode={multiple == true ? "multiple" : ""}
												placeholder={item.label}
												showSearch
												value={selectedItems[item.value]}
												// value={objArr && objArr[item.value]}
												style={{ width: "100%" }}
												onChange={(val) => {
													dispatch(setSelectedItems(val));
													onChangeHandler(val, item.value);
													
												}}>
												{item.filterList?.map((val, index) => (
													<Select.Option value={val} key={index}>
														
														{val}
													</Select.Option>
												))}
											</Select>
										) : (
											<Select
												// allowClear
												showSearch
												loading={selectLoading}
												value={objArr && objArr[item.value]}
												style={{ width: "100%" }}
												notFoundContent={
													selectLoading ? <Spin size="small" /> : null
												}
												onChange={(val) => onChangeHandler(val, item.value)}>
												{
													<Select.Option style={{ textAlign: "center" }}>
														<Spin size="small" />
													</Select.Option>
												}
											</Select>
										)}
									</div>
								</>
							);
						} else if (item.type === "date") {
							return (
								<>
									<div className={!colFix ? "col-lg-3" : colFix}>
										{label == false ? null : (
											<label htmlFor="">{item.label}</label>
										)}
										{/* <DatePicker  
                                        // allowClear
                                        placeholder={item.label}
                                        value={objArr && objArr[item.value] != "" && objArr[item.value] != "Invalid date" ? moment(objArr && objArr[item.value]) : ""}
                                        format="DD-MM-YYYY" 
                                        style={{width:'100%'}} 
                                        onChange={(date,dateString) => {
                                            let finalDate = moment(date).format('YYYY-MM-DD')
                                            if(finalDate == "Invalid date") {
                                                return onChangeHandler('',item.value)
                                            }else {
                                                return onChangeHandler(finalDate,item.value)
                                            }
                                        }} /> */}
									</div>
								</>
							);
						}
					})}
				{hideBtns == true ? null : (
					<div className={!colFix ? "col-lg-3 mt-2" : colFix}>
						{data.length > 0 ? (
							<>
								<Button type="primary" className="me-3" onClick={handleSubmit}>
									Submit
								</Button>
								<Button type="danger" onClick={handleReset}>
									Reset Filters
								</Button>
								<Button onClick={handleDeselectAll}>Deselect All</Button>
							</>
						) : null}
					</div>
				)}
			</div>
		</>
	);
}

export default FilterCard;
