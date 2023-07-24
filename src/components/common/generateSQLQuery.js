import React from 'react';

const SQLQueryBuilder = ({ query }) => {
    const generateSQLQuery = () => {
		if (!query || !query.rules || query.rules.length === 0) {
		  return '';
		}
	
		const { combinator, rules } = query;
		let sqlQuery = '';
	
		rules.forEach((item, index) => {
		  sqlQuery += `SELECT '${item.field.toUpperCase()}' AS variable_name, ${item.field.toUpperCase()} AS variable, COUNT(${item.field.toUpperCase()}) AS frequency FROM PRD_DB_UUP.UUP_EXT.subscriber_profile_vw WHERE profile_date = '{year}-{month}-{day}'`;
	
		  if (item.value) {
			sqlQuery += ` AND ${item.field} ${item.operator} '${item.value}'`;
		  }
	
		  sqlQuery += ` GROUP BY ${item.field.toUpperCase()}`;
	
		  if (index !== rules.length - 1) {
			sqlQuery += ' AND ';
		  }
		});
	
		if (combinator && rules.length > 1) {
		  if (combinator === 'and') {
			sqlQuery = `(${sqlQuery})`;
		  } else if (combinator === 'or') {
			sqlQuery = `${sqlQuery.replace(/AND/g, 'OR')}`;
		  }
		}
	
		return sqlQuery;
	  };
	
}

export default SQLQueryBuilder;