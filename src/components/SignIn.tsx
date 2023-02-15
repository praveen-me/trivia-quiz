import { useFormik } from "formik";

import { object, string } from "yup";
import storage from "../lib/storage";

let signInScheme = object({
  email: string().email().required(),
  password: string().required(),
});

interface ISignInScheme {
  email: string;
  password: string;
}

export default function SignIn() {
  const formik = useFormik<ISignInScheme>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: signInScheme,
  });

  async function getInitialUser(): Promise<ISignInScheme> {
    const email = await storage.get("email");
    const password = await storage.get("email");

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
      console.log("Form is submitted");
    } else {
      console.log("Something is wrong");
    }
  }

  return (
    <div>
      <div>
        <h3>Log In</h3>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue("email", event.target.value);
            }}
          />
        </div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => {
              formik.setFieldValue("password", event.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
