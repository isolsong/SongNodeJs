const moment = require("moment");

const header = ["BillingCycle", "StartDate", "EndDate"];

//Error handler
function exceptions(isFormValid, msg, err) {
  this.error = err;
  this.success = isFormValid;
  this.message = msg;
}

//Validate date
//hard coded if better perfomance please change
function validateDate(date) {
  if (moment(date, "MM/DD/YYYY", true).isValid()) {
    return true;
  } else {
    return false;
  }
}

//Validate payslip
function validateJson(json) {
  json.forEach(({ field1, field2, field3 }, index) => {
    const message = new Object();

    if (parseInt(field1) < 1 || parseInt(field1) > 12) {
      message.error = `Billing Cycle not on range at row ${index + 1}`;
    }

    if (!validateDate(field2)) {
      message.starDate = `Invalid Start Date format at row ${index + 1}`;
    }

    if (!validateDate(field3)) {
      message.endDate = `Invalid End Date at row ${index + 1}`;
    }

    if (Object.keys(message).length >= 1)
      throw new exceptions(false, message, "Please fill the correct formats");
  });
}

exports.validateFile = (json) => {
  try {
    if (json.length === 0) {
      throw new exceptions(
        false,
        { error: "No request(s) to read from the input file" },
        "Please fill the correct formats"
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
