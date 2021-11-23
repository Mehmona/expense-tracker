import * as Yup from "yup";

export const LOGIN_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});
export const SIGNUP_YUP = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});
export const EXPENSE_YUP = Yup.object({
  amount: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
});
export const PDF_EXPORT_YUP = Yup.object({
  start_date: Yup.string().required("Required"),
  end_date: Yup.string().required("Required"),
});
