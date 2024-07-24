import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const validationSchema = Yup.object({
    firstName: Yup.string("name must be a string").required(
      "first name is required",
    ),
    lastName: Yup.string("name must string").required("last name is required"),
    emailAddress: Yup.string("email should be a string")
      .email("email must be valid")
      .required("email is required"),

    password: Yup.string("password must be a string")
      .required("password is required")
      .min(8, "password must be atleast 8 characters long"),
  });
  const handleSubmit = async (formValues) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      if (data.success === true) {
        console.log(data);
        toast(data.message, {
          theme: "success",
          duration: 4000,
        });
        navigate("/Welcome");
      } else {
        toast(data.message),
          {
            theme: "failure",
            duration: 4000,
          };
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  return (
    <div>
      <div className="registerContainer">
        <div className="title">
          <h3>request for an account</h3>
        </div>
        <div className="formRegister">
          <form action="" onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">first name</label>
            <input
              type="text"
              name="firstName"
              placeholder="john"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p>{formik.errors.firstName}</p>
            )}
            <label htmlFor="lastName">last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="doe"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p>{formik.errors.lastName}</p>
            )}
            <label htmlFor="emailAddress">email adress</label>
            <input
              type="text"
              name="emailAddress"
              placeholder="johndoe@example.com"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.emailAddress && formik.errors.emailAddress && (
              <p>{formik.errors.emailAddress}</p>
            )}
            <label htmlFor="phoneNumber">phone number</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="234567"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p>{formik.errors.phoneNumber}</p>
            )}
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p>{formik.errors.password}</p>
            )}
            <button type="submit">request for an account</button>
          </form>

          <p>{error}</p>

          <p>
            don't have an account?
            <Link to="/Login" className="links">
              log in
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
