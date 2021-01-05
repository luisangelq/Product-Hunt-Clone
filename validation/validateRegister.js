export default function validateRegister(values) {
  let errors = {};

  //validate User Name
  if (!values.name) {
    errors.name = "Name Is Required";
  }

  //Validate Email
  if (!values.email) {
    errors.email = "Email Is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid Email";
  }

  //Validate Pass
  if (!values.password) {
    errors.password = "Password Is Required";
  } else if (values.password.length < 6) {
    errors.password = "Password Must Be At Least 6 Characters";
  }

  return errors;
}
