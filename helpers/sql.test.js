const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("Works with 2 items", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Tom", age: 23 },
      { age: "age" },
    );
    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Tom", 23],
    });
  });
});
