import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AuthContext from "../../../../server/src/Authentication/Authentication";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const validationSchema = Yup.object({
    emailAddress: Yup.string("email should be a string")
      .email("email must be valid")
      .required("email is required"),

    password: Yup.string("password must be a string")
      .required("password is required")
      .min(8, "password must be atleast 8 characters long"),
  });
  const handleSubmit = async (formValues) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/loginUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.success === true) {
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("firstName", data.data.firstName);
        localStorage.setItem("lastName", data.data.lastName);
        localStorage.setItem("access_token", data.token);
        setIsLoggedIn(true);
        console.log(data);
        if (data.data.role === "admin") {
          navigate("/Admin");
        } else {
          navigate("/UsersLibrary");
        }
      } else {
        toast(data.message),
          {
            theme: "failure",
            duration: 4000,
          };
        setError(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  return (
    <div>
      <div className="registerContainer">
        <div className="title">
          <h3>log in</h3>
        </div>
        <div className="formRegister">
          <form action="" onSubmit={formik.handleSubmit}>
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
            <button type="submit">log in</button>
          </form>

          {/* <p>{error}</p> */}
          <p>
            don't have an account?
            <Link to="/Register" className="links">
              get here
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
