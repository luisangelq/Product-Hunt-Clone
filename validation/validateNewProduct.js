export default function validateRegister(values) {
  let errors = {};

  //validate User Name
  if (!values.name) {
    errors.name = "Name Is Required";
  }

  //Validate Company
  if (!values.company) {
    errors.company = "Name of Company Is Required";
  }

  //Validate Desciption
  if (!values.description) {
      errors.description = "Add a Description"
  }

  return errors;
}
