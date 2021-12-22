import { useFormik } from "formik";
import { firebase } from "../utils/firebase";
import Router from "next/router";



const auth = firebase.auth();

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
            Router.push("/confirm");
          console.log("User logged in...");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
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

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-green-400 hover:bg-green-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
