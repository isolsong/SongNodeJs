const moment = require("moment");

const header = ["BillingCycle", "StartDate", "EndDate"];

//Error handler
function exceptions(isFormValid, msg, err) {
  this.error = err;
  this.success = isFormValid;
  this.message = msg;
}

//Comparing keys and headers

function compareKeys(k1, k2) {
  let len1 = k1.length;
  let len2 = k2.length;
  if (len1 !== len2) return false;
  for (let i = 0; i < len1; i++) {
    if (!k2.includes(k1[i])) return { success: false, key1: k1[i], key2: k2 };
  }
  return { success: true };
}

//Validate date
//hard coded if better perfomance please change
function validateDate(date) {
  if (moment(date, "MM/DD/YYYY", true).isValid()) {
    return true;
  }
  return false;
}

//Validate payslip
function validateJson(json) {
  json.forEach(({ BillingCycle, StartDate, EndDate, ...data }, index) => {
    const message = new Object();
    const startDate = new Date(StartDate);
    if (parseInt(BillingCycle) < 1 || parseInt(BillingCycle) > 12) {
      message.error = `Billing Cycle not on range at row ${index + 1}`;
    }

    if (validateDate(StartDate))
      message.starDate = `Invalid Start Date format at row ${index + 1}`;

    if (validateDate(EndDate))
      message.endDate = `Invalid End Date at row ${index + 1}`;

    if (Object.keys(message).length >= 1)
      throw new exceptions(false, message, "Please fill the correct formats");
  });
}

exports.validateFile = (json) => {
  try {
    const key = Object.keys(json[0]);

    const result = compareKeys(key, header);
    if (!result.success) {
      if (!result.key1 || !result.key2)
        throw new exceptions(
          false,
          `Unable to process wrong in header input`,
          `It should be ${header}`
        );
      throw new exceptions(
        false,
        `Unable to process wrong in header input ${result.key1}`,
        `It should be ${result.key2}`
      );
    }

    validateJson(json);

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof exceptions) {
      return error;
    }
  }
};
