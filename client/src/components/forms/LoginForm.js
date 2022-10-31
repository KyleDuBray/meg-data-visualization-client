import React from "react";
import { Form, Field } from "react-final-form";
import setAuthTokenInLocalStorage from "../../utilities/setAuthTokenInLocalStorage";
import { useLoginMutation } from "../../slices/authApi";
import { setCredentials, setTokenFromLocal } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const LABELSTYLES = "block mb-2 text-sm font-medium text-gray-900 mt-5";
  const FIELDSTYLES =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await login(values);
      console.log(res);
      const { token, ...user } = res.data;
      setAuthTokenInLocalStorage(token);
      dispatch(setTokenFromLocal());
      dispatch(setCredentials(user));
      navigate("/dashboard");
    } catch {
      console.log("There was an error registering your account.");
    }
  };

  const required = (value) => (value ? undefined : "Required");

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className="h-screen">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Login
          </h1>
          <div>
            <label className={LABELSTYLES}>Email</label>
            <Field
              name="email"
              component="input"
              placeholder="Email"
              validate={required}
              className={FIELDSTYLES}
            />
          </div>

          <div>
            <label className={LABELSTYLES}>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
              validate={required}
              className={FIELDSTYLES}
            />
          </div>

          <div className="flex items-center mt-5">
            <button
              type="submit"
              className="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
            <div className="ml-5">
              <Link to="/register">Need to register?</Link>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default LoginForm;
