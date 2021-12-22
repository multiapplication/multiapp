import { useFormik } from "formik";
import { firebase } from "../utils/firebase";
import * as Yup from "yup";

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
  const formik = useFormik({
    initialValues: {
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
        errors.email = "Email should contain an @";
      }

      if (!(values.password == values.changepassword)) {
        errors.changepassword = "Password should match";
      }

      return errors;
    },
    onSubmit: (values) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...

          console.log("User created");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },
  });
  return (
    <div className="flex flex-row ">
      <div className="bg-green-400 h-screen w-1/3 flex flex-col content-between justify-center items-center">
        <p className="font-bold text-white">
          Fugiat nulla deserunt aute elit aute labore ad culpa enim cillum et
          labore ex non. Anim eu id nisi consequat cupidatat nisi esse
          cupidatat. Aliquip sint qui commodo non sint proident dolor laborum
          mollit duis incididunt minim proident. Et occaecat elit pariatur irure
          sunt non irure mollit sit.
        </p>
      </div>
      <div className="h-screen w-2/3 flex flex-col gap-60 justify-center items-center content-between ">
        <div>
          <form onSubmit={formik.handleSubmit}>
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
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                { formik.errors.email ? <div className="text-red-600">{ formik.errors.email }</div> : null }
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
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
            </div>



            {formik.values.password.length >= 6 ? <div className="md:flex md:items-center mb-6">
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
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                  id="changepassword"
                  name="changepassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.changepassword}
                />
                { formik.errors.changepassword ? <div className="text-red-600">{ formik.errors.changepassword }</div> : null }
              </div>
            </div> : null}

            

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-green-400 hover:bg-green-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Create account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
