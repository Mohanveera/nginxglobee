import {
	REMOVE_ITEM,
	SET_ATTRIBUTES,
	SET_CHART_ITEMS,
	SET_LOADING,
	SET_LOGGEDIN,
	SET_USERNAME,
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
	
} from "./ActionTypes";

const loggedInInitialState = false;
const setUserNameInitialState = "";
const attributesInitialState = [];
const previewAttributeInitialState = [];
const loadingInitialState = false;
const chartItemsInitialState = [];
const subscriberInitialState = "true";

// const selectFilterInitialState = `SELECT 'AFFLUENCE' AS variable_name, AFFLUENCE AS variable, COUNT(AFFLUENCE) AS frequency
// FROM PRD_DB_UUP.UUP_EXT.subscriber_profile_vw where profile_date = '2023-06-14' GROUP BY AFFLUENCE
// UNION ALL
// SELECT 'LIFESTAGE' AS variable_name, LIFESTAGE AS variable, COUNT(LIFESTAGE) AS frequency
// FROM PRD_DB_UUP.UUP_EXT.subscriber_profile_vw where profile_date = '2023-06-14' GROUP BY LIFESTAGE
// UNION ALL
// SELECT 'SUBSCRIBER_STATUS_CODE' AS variable_name, SUBSCRIBER_STATUS_CODE AS variable, COUNT(SUBSCRIBER_STATUS_CODE) AS frequency
// FROM PRD_DB_UUP.UUP_EXT.subscriber_profile_vw where profile_date = '2023-06-14' GROUP BY SUBSCRIBER_STATUS_CODE order by variable_name;`


const selectFilterInitialState = ""
// const customerInitialState = fasle;
const selectedItemsInitialState = "null";
const queryValueInitialState = ""	
const previewDataInitialState = [];
const queryDataInitialState = "default";
export const loggedInReducer = (state = loggedInInitialState, action) => {
	switch (action.type) {
		case SET_LOGGEDIN:
			return action.payload;
		default:
			return state;
	}
};

export const userNameReducer = (state = setUserNameInitialState, action) => {
	switch (action.type) {
		case SET_USERNAME:
			return action.payload;
		default:
			return state;
	}
};
export const attributesReducer = (state = attributesInitialState, action) => {
	switch (action.type) {
		case SET_ATTRIBUTES:
			return action.payload;
		case SET_SUBSCRIBER_ATTRIBUTES:
			return action.payload;
		default:
			return state;
	}
};
export const loadingReducer = (state = loadingInitialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return action.payload;
		default:
			return state;
	}
};

export const chartItemsReducer = (state = chartItemsInitialState, action) => {
	switch (action.type) {
		case SET_CHART_ITEMS:
			return action.payload;
		case REMOVE_ITEM:
			const updatedItems = [...state];
			updatedItems.splice(action.payload, 1);
			return updatedItems;
		default:
			return state;
	}
};
export const subscriberReducer = (state = subscriberInitialState, action) => {
	switch (action.type) {
		case SET_SUBSCRIBER:
			return action.payload;
		default:
			return state;
	}
};
export const customerReducer = (state = false, action) => {
	switch (action.type) {
		case SET_CUSTOMER:
			return action.payload;
		default:
			return state;
	}
};
export const selectReducer = (state = selectedItemsInitialState, action) => {
	switch (action.type) {
		case SET_SELECTED_ITEMS:
			return action.payload;
		default:
			return state;
	}
};

export const queryReducer = (state = queryValueInitialState, action) => {
	switch (action.type) {
	  case 'SET_QUERY_VALUE':
		return action.payload;
	  default:
		return state;
	}
  };
  
  
  
export const queryDataReducer = (state = queryDataInitialState, action) => {
	switch (action.type) {
		case SET_QUERY_DATA:
			return action.payload;
		default:
			return state;
	}
};
export const previewAttributeReducer = (state = previewAttributeInitialState, action) => {
	switch (action.type) {
		case SET_PREVIEW_ATTRIBUTES:
			return action.payload;
		default:
			return state;
	}
};
export const previewDataReducer = (state = previewDataInitialState, action) => {
	switch (action.type) {
		case SET_PREVIEW_DATA:
			return action.payload;
		default:
			return state;
	}
};
export const selectFilterReducer = (state = selectFilterInitialState, action) => {
	switch (action.type) {
		case SET_SELECT_FILTERS:
			return action.payload;			
		default:
			return state;
	}
};
export const setEditingReducer = (state = false, action) => {
	switch (action.type) {
		case SET_EDITING:
			return action.payload;
		default:
			return state;
	}
};
export const setHasFunctionReturnReducer = (state = false, action) => {
	switch (action.type) {
		case SET_HAS_FUNCTION_RETURN:
			return action.payload;
		default:
			return state;
	}
};
export const refElementReducer = (state = null, action) => {
	switch (action.type) {
	  case 'SET_ELEMENT_REFERENCE':
		return action.payload;
	  default:
		return state;
	}
  };