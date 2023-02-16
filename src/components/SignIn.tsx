import { useFormik } from "formik";

import { object, string } from "yup";
import storage from "../lib/storage";
import { useTriviaStore } from "../utils/useTriviaStore";
import { useState } from "react";

let signInScheme = object({
  email: string().email().required(),
  password: string().required(),
});

interface ISignInScheme {
  email: string;
  password: string;
}

export default function SignIn() {
  const { actions, dispatch } = useTriviaStore();
  const formik = useFormik<ISignInScheme>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: signInScheme,
  });
  const [error, setError] = useState("");

  async function getInitialUser(): Promise<ISignInScheme> {
    const email = await storage.get("email");
    const password = await storage.get("password");

    return {
      email,
      password,
    };
  }

  async function handleSubmit(values: ISignInScheme) {
    const initValues = await getInitialUser();

    if (
      initValues.email === values.email &&
      initValues.password === values.password
    ) {
      dispatch(actions.setUser({ isAuthenticated: true, email: values.email }));
    } else {
      setError("User Credentials are wrong.");
    }
  }

  return (
    <div className="main-wrapper">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="center vertical-gutter">
          <h3>Log In</h3>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="praveen@email.com"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue("email", event.target.value);
            }}
            value={formik.values.email}
            className={formik.errors.email ? "error" : ""}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => {
              formik.setFieldValue("password", event.target.value);
            }}
            value={formik.values.password}
          />
        </div>
        <button
          type="submit"
          className="button-primary"
          disabled={Object.keys(formik.errors).length > 0}
        >
          Submit
        </button>
      </form>

      {error && <strong className="error">{error}</strong>}
    </div>
  );
}
