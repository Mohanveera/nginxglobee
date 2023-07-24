import React, { useState } from "react";
import {
	Chart,
	Series,
	ZoomAndPan,
	CommonSeriesSettings,
	Title,
	Tooltip,
	Legend,
	ValueAxis,
} from "devextreme-react/chart";
import { Skeleton, Popover } from "antd";
import ContentModal from "../modals/ContentModal";
import { ConsoleSqlOutlined } from "@ant-design/icons";




const BarChart = ({
	loading,
	key,
	item,
	handleRemoveItem,
	handleActiveChart,
	modalShow,
}) => {
	// const [chartItems, setChartItems] = useState(items);
	// const handleRemoveItem = (index) => {
	//     const updatedItems = [...chartItems];
	//     updatedItems.splice(index, 1);
	//     setChartItems(updatedItems);
	//   };
	



	const onPointClick = ({ target: point }) => {
		point.select();
	};

	if (loading) {
		return (
			<Skeleton
				active
				paragraph={{
					rows: 10,
				}}
				size="small"
			/>
		);
	}


	

	return (
		<>
			<div className="row">
				<div className="col-lg-12">
					<div className=" mb-3 d-flex align-items-center justify-content-between">
						<h5 className="my-3 graph-title">
							<b>{item.title}</b>
						</h5>
						{!modalShow && (
							<div>
								<img
									src="assets/img/zoom.svg"
									onClick={() => handleActiveChart(item)}
									className="me-3"
									alt=""
								/>
								<img
									src="assets/img/close.svg"
									onClick={() => handleRemoveItem(item,key)}
									alt=""
								/>
							</div>
						)}
					</div>
					<div className="py-2 pb-4">
						<Chart
							id="chart"
							height={425}
							palette={["#4359AA", "#EE4D4D"]}
							onPointClick={onPointClick}
							rotated={true}
							dataSource={item.data}>
							<CommonSeriesSettings
								argumentField={item.argumentField}
								valueField={item.valueField}
								type="bar"
								ignoreEmptyPoints={true}
							/>
							
							{/* <SeriesTemplate nameField={item.valueField} /> */}
							<Series
								argumentField={item.argumentField}
								valueField={item.valueField}
								horizontal={false}
						
								color="#4359AA"
								
								width={0.8}
								
							/>
							<ValueAxis inverted={false} />
							{/* <Title
                                            text={item.title}
                                        /> */}
							<Legend
								visible={false}
								margin={0}
								horizontalAlignment="right"
								verticalAlignment="bottom"
							/>
							<Tooltip enabled={true} location="edge" />
							{/* <Export enabled={true} /> */}
							{/* <ZoomAndPan
                                            argumentAxis="both"
                                            valueAxis="both"
                                        />  */}
						</Chart>
					</div>
				</div>
			</div>
		</>
	);
};

export default BarChart;
