//@ts-ignore
import secureLocalStorage from "react-secure-storage";

export const keys = {
  email: "email",
  password: "password",
};

class Storage {
  init() {
    this.set("email", process.env.REACT_APP_LOGIN_EMAIL as string);
    this.set("password", process.env.REACT_APP_LOGIN_PASSWORD as string);
  }

  set(key: keyof typeof keys, value: string | number | boolean | object): void {
    return secureLocalStorage.setItem(key, value);
  }

  get(key: string): any {
    return secureLocalStorage.getItem(key);
  }
}

const storage = new Storage();

export default storage;
