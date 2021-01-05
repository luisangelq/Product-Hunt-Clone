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

  //Validate Url
  if (!values.url) {
    errors.url = "Url Is Required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Url is not Valid";
  }

  //Validate Desciption
  if (!values.description) {
      errors.description = "Add a Description"
  }

  return errors;
}
