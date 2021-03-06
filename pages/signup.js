import { useFormik } from "formik";
import { db, firebase } from "../utils/firebase.config";
import * as Yup from "yup";
import Router from "next/router";
import { SpinnerCircularFixed } from "spinners-react";
import { useState } from "react";
import FadeIn from 'react-fade-in';


const Schema = Yup.object().shape({
  password: Yup.string().required("This field is required"),
  changepassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      role: "",
      organisation: "",
      email: "",
      password: "",
      changepassword: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "Email should contain an @, use a valid email format.";
      }

      if (!(values.password == values.changepassword)) {
        errors.changepassword = "Password should match";
      }

      if (!values.first_name) {
        errors.first_name = "Required";
      }

      if (!values.last_name) {
        errors.last_name = "Required";
      }

      return errors;
    },
    onSubmit: (values) => {
      setLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;

          firebase.auth().onAuthStateChanged((user) => {
            var dbUser = db.collection("users").doc(user.uid).set({
              first_name: formik.values.first_name,
              last_name: formik.values.last_name,
              role: formik.values.role,
              organisation: formik.values.organisation,
              email: user.email,
              healthcare_occupation: "",
              about_me: "",
            });
          });

          // ...
          Router.push("/dashboard");
          console.log("User created");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          setErrorMessage(error.message);
          setLoading(false);
        });
    },
  });
  return (
    <div className="flex flex-row ">
      <div className="bg-gradient-to-b from-navy via-aqua to-green h-screen w-1/3 flex flex-col content-between justify-center items-center">
      <FadeIn delay={400}>
        <h1 className="text-6xl text-transparent bg-clip-text bg-white font-bold mb-24">Project Multi</h1>
        </FadeIn>

      </div>
      

      <div className="h-screen w-2/3 flex flex-col justify-center items-center content-between ">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="first_name"
                >
                  First Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
                  id="first_name"
                  name="first_name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                {formik.errors.first_name ? (
                  <div className="text-red">{formik.errors.first_name}</div>
                ) : null}
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="last_name"
                >
                  Last Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
                  id="last_name"
                  name="last_name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
                {formik.errors.last_name ? (
                  <div className="text-red">{formik.errors.last_name}</div>
                ) : null}
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="role"
                >
                  Role:
                </label>
              </div>
              <div className="md:w-2/3">
                <select
                  // className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-dark-grey leading-tight focus:outline-none focus:bg-white focus:border-my-green-300"
                  id="role"
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                >
                  <option value="" disabled selected>
                    Choose role
                  </option>

                  <option value="Clinician">Clinician</option>
                  <option value="Co-ordinator">Co-ordinator</option>
                  <option value="Scribe">Scribe</option>
                </select>
              </div>
            </div>

            {/* -------------- */}

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="organisation"
                >
                  Organisation
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
                  id="organisation"
                  name="organisation"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.organisation}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <div className="text-red">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />

                {formik.values.password.length >= 1 ? (
                  <p className="text-xs">
                    Password must be more than 6 characters long.
                  </p>
                ) : null}
              </div>
            </div>

            {formik.values.password.length >= 6 ? (
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="changepassword"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
                    id="changepassword"
                    name="changepassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.changepassword}
                  />
                  {formik.errors.changepassword ? (
                    <div className="text-red">
                      {formik.errors.changepassword}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-green hover:bg-aqua focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  {loading ? (
                    <SpinnerCircularFixed
                      size={30}
                      thickness={180}
                      speed={100}
                      color="#ffffff"
                      secondaryColor="rgba(0, 0, 0, 0)"
                    />
                  ) : (
                    "Create Account"
                  )}
                </button>

                {errorMessage ? (
                  <p className="text-xs text-red">{errorMessage}</p>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
