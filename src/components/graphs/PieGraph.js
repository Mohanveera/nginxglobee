import React from "react";
import { setCustomer, setSubscriber } from "../../redux/Actions";

import PieChart, {
	Series,
	Label,
	Connector,
	Size,
	Legend,
} from "devextreme-react/pie-chart";

const resolveModes = ["shift", "hide", "none"];

// COLORS add colors if need more data sections
const customColors = ["#204496","#449BD5","#6B7A99","#505F7B","#EA4648","#4359AA","#00517C","#BEC6DA"];

const PieGraph = ({
	link,
	customText,
	key,
	item,
	handleRemoveItem,
	handleActiveChart,
	modalShow,
}) => {
	function customizeText(arg) {
		return `${arg.argument} (${arg.percentText})`;
		// return `${arg.argument}`;
	}

	const onPointClick = ({ target: point }) => {
		point.select();
	};

	const customColors = ["#204496","#449BD5","#6B7A99","#505F7B","#EA4648","#4359AA","#00517C","#BEC6DA"];

 

	return (
		<>
			<div className="row tt">
				<div className="col-lg-12 mb-4">
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
									onClick={() => handleRemoveItem(key)}
									alt=""
								/>
							</div>
						)}
					</div>
					<div className="py-2 pb-4">
						<PieChart
							id="pie"
							dataSource={item.data}
							palette={customColors}
							title=""
							type="doughnut"
							innerRadius={0.8}
							// onPointClick={pointClickHandler}
							// onLegendClick={legendClickHandler}
							onPointClick={onPointClick}
							resolveLabelOverlapping={resolveModes[2]}>
							<Series
								argumentField={item.argumentField}
								valueField={item.valueField}
								border={{
									visible: true,
									width: 3,
									color: 'white' // Set the desired border color
								  }}	
								>
								<Label length={50} visible={true} customizeText={customizeText}>
									<Connector visible={true} width={1} />
								</Label>
							</Series>
							<Legend
								visible={false}
								margin={2}
								horizontalAlignment="right"
								verticalAlignment="bottom"
							/>
							<Size width={"100%"} height={400} />
							{/* <Export enabled={true} /> */}
						</PieChart>
					</div>
				</div>
			</div>
		</>
	);
};

export default PieGraph;
