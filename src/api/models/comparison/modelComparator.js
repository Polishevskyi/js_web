const getNestedField = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

const compareModels = (request, response, fieldMap) => {
  const mismatches = [];

  Object.entries(fieldMap).forEach(([reqField, resField]) => {
    const reqValue = getNestedField(request, reqField);
    const resValue = getNestedField(response, resField);

    if (String(reqValue) !== String(resValue)) {
      mismatches.push({
        field: `${reqField} → ${resField}`,
        expected: reqValue,
        actual: resValue,
        toString() {
          return `[${this.field}] Expected: ${this.expected}, Actual: ${this.actual}`;
        },
      });
    }
  });

  return {
    success: mismatches.length === 0,
    mismatches,
  };
};

module.exports = { compareModels };
