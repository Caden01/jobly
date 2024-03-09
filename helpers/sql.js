const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
// Helper for making updates to queries
//
// This can be used to make the SET cause in an SQL UPDATE statement.
//
// @param dataToUpdate {field1: val, field2: val}
// @param jsToSql {firstName: "first_name", age: "age"}
//
// @returns {Object} {setCols, values}
//
// @example {firstName: "Tom", age: 23} =>
//          {setCols: '"first_name"=$1, "age"=$2',
//           values: ["Tom", 23]
//          }

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
