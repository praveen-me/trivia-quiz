import { useFormik } from "formik";

import { object, string } from "yup";
import storage from "../lib/storage";
import { useTriviaStore } from "../utils/useTriviaStore";

let signInScheme = object({
  email: string().email().required(),
  password: string().required(),
});

interface ISignInScheme {
  email: string;
  password: string;
}

export default function SignIn() {
  const { actions, state, dispatch } = useTriviaStore();
  const formik = useFormik<ISignInScheme>({
    initialValues: {
      email: "praveen@email.com",
      password: "1234qwer",
    },
    onSubmit: handleSubmit,
    validationSchema: signInScheme,
  });

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

    console.log({ initValues });

    if (
      initValues.email === values.email &&
      initValues.password === values.password
    ) {
      dispatch(actions.setUser({ isAuthenticated: true, email: values.email }));
    } else {
      console.log("Something is wrong");
    }
  }

  // console.log({ state });

  return (
    <div className="container main-wrapper">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
        className="main-wrapper"
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
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
