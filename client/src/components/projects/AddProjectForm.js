import React from "react";
import { Form, Field } from "react-final-form";
import { useCreateProjectMutation } from "../../slices/projectApi";

const AddProjectForm = ({ handleClose }) => {
  const [createProject] = useCreateProjectMutation();

  const LABELSTYLES = "block mb-2 text-sm font-medium text-gray-900 mt-5";
  const INPUTSTYLES =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-blue-500 block w-full p-2.5";
  const ERRORSTYLES = "text-red-600";
  const onSubmit = async (values) => {
    try {
      const res = await createProject(values.projectName);
      console.log(res);
      handleClose();
    } catch (err) {
      console.log("There was an error adding a new project.");
    }
  };

  const required = (value) => (value ? undefined : "Required");

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center font-bold tracking-tight mb-4">
            Add New Project
          </h1>
          <div className="bg-white pt-2 px-8 pb-4 rounded">
            <Field name="projectName" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label className={LABELSTYLES}>Project Name</label>
                  <input
                    {...input}
                    className={INPUTSTYLES}
                    type="text"
                    placeholder="project name"
                  />
                  {meta.error && meta.touched && (
                    <span className={ERRORSTYLES}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <button
              type="submit"
              className="mt-5 text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Add Project
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default AddProjectForm;
