import { combineReducers } from "redux";
import {
	attributesReducer,
	loggedInReducer,
	userNameReducer,
	loadingReducer,
	chartItemsReducer,
	subscriberReducer,
	customerReducer,
	selectReducer,
	queryReducer,
	queryDataReducer,
	previewAttributeReducer,
	previewDataReducer,
	selectFilterReducer,
	setEditingReducer,
	setHasFunctionReturnReducer,
	refElementReducer
} from "./Reducers";

export const rootReducer = combineReducers({
	login: loggedInReducer,
	username: userNameReducer,
	attributes: attributesReducer,
	load: loadingReducer,
	chart: chartItemsReducer,
	subscriber: subscriberReducer,
	customer: customerReducer,
	selected: selectReducer,
	queryValue: queryReducer,
	queryData: queryDataReducer,
	previewAttributes: previewAttributeReducer,
	previewData: previewDataReducer,
	selectFilters: selectFilterReducer,
	editing: setEditingReducer,
	hasFunctionReturn:setHasFunctionReturnReducer,
	elementReference:refElementReducer
});
