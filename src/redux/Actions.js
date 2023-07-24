import {
	SET_LOGGEDIN,
	SET_USERNAME,
	SET_ATTRIBUTES,
	SET_LOADING,
	REMOVE_ITEM,
	SET_CHART_ITEMS,
	SET_SUBSCRIBER,
	SET_CUSTOMER,
	SET_SUBSCRIBER_ATTRIBUTES,
	SET_SELECTED_ITEMS,
	SET_QUERY_VALUE,
	SET_QUERY_DATA,
	SET_PREVIEW_ATTRIBUTES,
	SET_PREVIEW_DATA,
	SET_SELECT_FILTERS,
	SET_EDITING,
	SET_HAS_FUNCTION_RETURN,
	SET_ELEMENT_REFERENCE,
} from "./ActionTypes";

export const setLoggedIn = (loggedIn) => {
	return {
		type: SET_LOGGEDIN,
		payload: loggedIn,
	};
};
export const setUserName = (userName) => {
	return {
		type: SET_USERNAME,
		payload: userName,
	};
};
export const setAttributes = (attributes) => {
	return {
		type: SET_ATTRIBUTES,
		payload: attributes,
	};
};
export const setLoading = (loading) => {
	return {
		type: SET_LOADING,
		payload: loading,
	};
};
export const removeItem = (index) => {
	return {
		type: REMOVE_ITEM,
		payload: index,
	};
};
export const setChartItems = (items) => {
	return {
		type: SET_CHART_ITEMS,
		payload: items,
	};
};
export const setSubscriber = (subscriber) => {
	return {
		type: SET_SUBSCRIBER,
		payload: subscriber,
	};
};
export const setCustomer = (customer) => {
	return {
		type: SET_CUSTOMER,
		payload: customer,
	};
};
export const setSubscriberAttributes = (subscriberAttributes) => {
	return {
		type: SET_SUBSCRIBER_ATTRIBUTES,
		payload: subscriberAttributes,
	};
};
export const setSelectedItems = (selectedItems) => {
	return {
		type: SET_SELECTED_ITEMS,
		payload: selectedItems,
	};
};
export const setQueryValue = (query) => {
	return {
		type: SET_QUERY_VALUE,
		payload: query,
	};
};
export const setQueryData = (queryData) => {

	return {
		type: SET_QUERY_DATA,
		payload: queryData,
	};
};
export const setPreviewAttributes = (previewAttributes) => {
	return {
		type: SET_PREVIEW_ATTRIBUTES,
		payload: previewAttributes,
	};
};
export const setPreviewData = (previewData) => {
	return {
		type: SET_PREVIEW_DATA,
		payload: previewData,
	};
};
export const setSelectFilters = (selectFilters) => {
	return {
		type: SET_SELECT_FILTERS,
		payload: selectFilters,
	};
};
export const setEditing = (editing) => {
	return {
		type: SET_EDITING,
		payload: editing,
	};
};
export const setHasFunctionReturn = (hasFunctionReturn) => {
	return {
		type: SET_HAS_FUNCTION_RETURN,
		payload: hasFunctionReturn,
	};
};

export const setElementReference = (reference) => {
	return {
		type: "SET_ELEMENT_REFERENCE",
		payload: reference,
	};
};
