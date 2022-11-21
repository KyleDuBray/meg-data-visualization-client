import React from "react";
import { Form, Field } from "react-final-form";
import { useAddUserToProjectMutation } from "../../slices/projectApi";

const AddUserForm = ({ handleClose, project_id }) => {
  const [addUser] = useAddUserToProjectMutation();
  const LABELSTYLES = "block mb-2 text-sm font-medium text-gray-900 mt-5";
  const INPUTSTYLES =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-blue-500 block w-full p-2.5";
  const ERRORSTYLES = "text-red-600";
  const onSubmit = async (values) => {
    try {
      console.log(values);
      console.log(values.email, project_id, values.admin);
      const body = { email: values.email, project_id, isAdmin: values.admin };
      const res = await addUser(body);
      console.log(res);
      handleClose();
    } catch (err) {
      console.log("There was an error adding a new user to the project.");
    }
  };

  const required = (value) => (value ? undefined : "Required");
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 mb-4">
            Add New User to Project
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
            <Field name="admin" type="checkbox">
              {({ input, meta }) => (
                <div className="flex items-center ">
                  <label className={LABELSTYLES}>Make Admin</label>
                  <input {...input} className="ml-4 mt-3.5" type="checkbox" />
                </div>
              )}
            </Field>
            <button
              type="submit"
              className="mt-5 text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Add User
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default AddUserForm;
