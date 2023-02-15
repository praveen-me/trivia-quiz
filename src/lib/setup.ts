import storage from "./storage";

export default function setup() {
  storage.init();

  return () => {
    // clear stuff
  };
}
