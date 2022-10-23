import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import setAuthTokenInLocalStorage from "../../utilities/setAuthTokenInLocalStorage";
import { useRegisterMutation } from "../../slices/authApi";
import { authenticate } from "../../slices/authSlice";

const RegistrationForm = () => {
  const LABELSTYLES = "block mb-2 text-sm font-medium text-gray-900 mt-5";
  const FIELDSTYLES =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (values) => {
    const { confirmPassword, ...regVals } = values;
    console.log(regVals);
    try {
      const res = await register(regVals);
      console.log(res);
      setAuthTokenInLocalStorage(res.data.token);
      authenticate();
    } catch {
      console.log("There was an error registering your account.");
    }
  };

  const required = (value) => (value ? undefined : "Required");

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label className={LABELSTYLES}>First Name</label>
            <Field
              name="firstName"
              component="input"
              placeholder="First Name"
              validate={required}
              className={FIELDSTYLES}
            />
          </div>

          <div>
            <label className={LABELSTYLES}>Last Name</label>
            <Field
              name="lastName"
              component="input"
              placeholder="Last Name"
              validate={required}
              className={FIELDSTYLES}
            />
          </div>

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

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
          >
            Submit
          </button>
        </form>
      )}
    />
  );
};

export default RegistrationForm;
