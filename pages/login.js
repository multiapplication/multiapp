import { useFormik } from "formik";
import { firebase } from "../utils/firebase";

const auth = firebase.auth();


const LoginPage = () => {
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        onSubmit: (values) => {
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
              // ...

              console.log("User logged in...");
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
            });
          
        },
      });
      return (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <br />
    
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
};

export default LoginPage;