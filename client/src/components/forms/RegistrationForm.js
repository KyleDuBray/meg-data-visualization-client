import React from "react";
import { Form, Field } from "react-final-form";
import setAuthTokenInLocalStorage from "../../utilities/setAuthTokenInLocalStorage";
import { useRegisterMutation } from "../../slices/authApi";
import { useDispatch } from "react-redux";
import { setTokenFromLocal } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const LABELSTYLES = "block mb-2 text-sm font-medium text-gray-900 mt-5";
  const FIELDSTYLES =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5";

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { confirmPassword, ...regVals } = values;
    console.log(regVals);
    try {
      const res = await register(regVals);
      console.log(res);
      setAuthTokenInLocalStorage(res.data.token);
      dispatch(setTokenFromLocal());
      navigate("/dashboard");
    } catch {
      console.log("There was an error registering your account.");
    }
  };

  const required = (value) => (value ? undefined : "Required");

  return (
    <div className="max-w-lg basis-full mt-10">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Register new account
            </h1>
            <div className="bg-white pt-2 px-8 pb-4 rounded">
              <label className={LABELSTYLES}>First Name</label>
              <Field
                name="firstName"
                component="input"
                placeholder="First Name"
                validate={required}
                className={FIELDSTYLES}
              />
              <label className={LABELSTYLES}>Last Name</label>
              <Field
                name="lastName"
                component="input"
                placeholder="Last Name"
                validate={required}
                className={FIELDSTYLES}
              />

              <div>
                <label className={LABELSTYLES}>Organization</label>
                <Field
                  name="organization"
                  component="input"
                  placeholder="Organization"
                  className={FIELDSTYLES}
                />
              </div>

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

              <div>
                <label className={LABELSTYLES}> Confirm Password</label>
                <Field
                  name="confirmPassword"
                  component="input"
                  type="password"
                  placeholder="Confirm Password"
                  validate={required}
                  className={FIELDSTYLES}
                />
              </div>
              <div className="flex items-center mt-5">
                <button
                  type="submit"
                  className="basis-8/12 text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Submit
                </button>

                <div className="ml-5">
                  <Link to="/login">Already have an account?</Link>
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default RegistrationForm;
