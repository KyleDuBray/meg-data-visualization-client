import React from "react";
import { Form, Field } from "react-final-form";
import setAuthTokenInLocalStorage from "../../utilities/setAuthTokenInLocalStorage";
import { useLoginMutation } from "../../slices/authApi";
import { setCredentials, setTokenFromLocal } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const LABELSTYLES = "block mb-2 text-sm font-medium text-gray-900 mt-5";
  const INPUTSTYLES =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-blue-500 block w-full p-2.5";
  const ERRORSTYLES = "text-red-600";

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
    <div className="max-w-lg basis-full mt-20">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 mb-4">
              Log in to your account
            </h1>
            <div className="bg-white pt-2 px-8 pb-4 rounded">
              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label className={LABELSTYLES}>Email</label>
                    <input
                      {...input}
                      className={INPUTSTYLES}
                      type="text"
                      placeholder="Email"
                    />
                    {meta.error && meta.touched && (
                      <span className={ERRORSTYLES}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="password" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label className={LABELSTYLES}>Password</label>
                    <input
                      {...input}
                      className={INPUTSTYLES}
                      type="password"
                      placeholder="Password"
                    />
                    {meta.error && meta.touched && (
                      <span className={ERRORSTYLES}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              <div className="flex items-center mt-5">
                <button
                  type="submit"
                  className="basis-8/12 text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Log In
                </button>
                <div className="ml-5">
                  <Link to="/register">Need to register?</Link>
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default LoginForm;
