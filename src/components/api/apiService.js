import axios from "axios";

const today = new Date();
const currentDate = new Date();

const formatDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
};

const createdAt = formatDateString(currentDate);
const modifiedAt = formatDateString(currentDate);
const profileDate = formatDateString(currentDate);


class ApiService {
	instance;
	constructor(token) {
		this.instance = axios.create({
		    // baseURL: `https://jbsyly5h3mkczysvyeltcofohm0plxtl.lambda-url.ap-southeast-1.on.aws/`,
			baseURL: `http://localhost:8000//`,
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,				
			},
		});
	}

	

	getToken = async (storedUsername) => {
		const data = {
			email: storedUsername,
		};
		try {
			const response = await this.instance.post(`/auth/getToken`, data);
			const storeToken = response.data.jwt_token;
			localStorage.setItem("token", storeToken);
			return storeToken;
		} catch (error) {
			throw error;
		}
	};

	getMetadata = async () => {
		try {
			const res = await this.instance.get(`audiences/getMetadata/`);
			return res;
		} catch (error) {
			throw  error;
		}
	};

	getMultiAttribute = async (value) => {
		try {
			const res = await this.instance.post(
				`/audiences/query/multiAttributeV2/`,
				{},
				{
					params: {
						query: value,
					},
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			const data = res.data.data;
			const dynamicValues = {};
			data.forEach((item) => {
				const { VARIABLE_NAME, VARIABLE, FREQUENCY } = item;

				if (!dynamicValues[VARIABLE_NAME]) {
					dynamicValues[VARIABLE_NAME] = {};
					dynamicValues[VARIABLE_NAME].title = VARIABLE_NAME;
					dynamicValues[VARIABLE_NAME].data = [];
				}

				if (VARIABLE) {
					dynamicValues[VARIABLE_NAME].data.push({
						region: VARIABLE,
						val: FREQUENCY,
					});
				}
			});

			//Generate the dynamic API response
			const apiResponse = {
				defaultChart: Object.values(dynamicValues).map((chart) => ({
					title: chart.title,
					data: chart.data,
					valueField: "val",
					argumentField: "region",
				})),
			};

			// Print the dynamic API response

			const defaultData = JSON.parse(
				JSON.stringify(apiResponse.defaultChart, null, 2)
			);
			localStorage.setItem("defaultChartData", JSON.stringify(res));

			// // Retrieving the state from localStorage (e.g., in a component's initialization)
			const savedDefaultChartData = localStorage.getItem("defaultChartData");

			const initialDefaultChartData = savedDefaultChartData
				? JSON.parse(savedDefaultChartData)
				: [];

			return defaultData;
		} catch (error) {
			
			throw error;
		}
	};

	getpreview = async () => {
		try {
			const res = await this.instance.get(`/audiences/preview/`);
			return res;
		} catch (error) {
			return error;
		}
	};

	saveAudience = async (audienceName, description, username) => {
		const data = {
		  "audienceName": audienceName,
		  "deleteFlag": false,
		  "description": description,
		  "createdAt": createdAt,
		  "modifiedAt":createdAt,
		  "multiAttributeQueryForm": {},
		  "profileDate": createdAt,	
		  "result": "string",	 
		  "userName": username,
		};
	  
		try {
		  const res = await this.instance.post(`/audiences/saved/saveAudience`,data
			
		  );
		  return res;
		} catch (error) {			
			throw error;
		}
	  };
	  fetchListAudience = async () => {
		try {
			const res = await this.instance.post(`/audiences/saved/listAudience`);
			return res;
		} catch (error) {
			throw error;
		}
	};
	fetchSharedAudience = async () => {
		try {
			const res = await this.instance.post(`/audiences/shared/list`);
			return res;
		} catch (error) {
			throw error;
		}
	};

	updateSavedAudience = async (data) => {
		try {
		  const res = await this.instance.put(`/audiences/saved/updateAudience?${data}`);
		  return res;
		} catch (error) {
			throw error;
		}
	  };
	  updateSharedAudience = async (data,body) => {
		try {
		  const res = await this.instance.put(`/audiences/shared/update?${data}`,body);
		  return res;
		} catch (error) {
			throw error;
		}
	  };	 
	  getSavedAudience = async (data) => {
		try {
		  const res = await this.instance.get(`/audiences/saved/getAudience?data?data` );
		  return res;
		} catch (error) {
			throw error;
		}
	  };
	  shareAudience = async (data) => {
		try {
		  const res = await this.instance.post(`/audiences/shared/share`,data);
		  return res;
		} catch (error) {
		  throw error;
		}
	  };
	   deleteSavedAudience = async (data) => {
		try {
		  const res = await this.instance.delete(`/audiences/saved/delete?${data}`);
		  return res;
		} catch (error) {
			throw error;
		}
	  };
	  deleteSharedAudience = async (data) => {
		try {
		  const res = await this.instance.delete(`/audiences/shared/delete?${data}`);
		  return res;
		} catch (error) {
			throw error;
		}
	  };
	  
	  
	  
	  
}

export default ApiService;
