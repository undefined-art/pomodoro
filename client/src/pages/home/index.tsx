import { type Component } from "solid-js";
import Hero from "./sections/hero";
import QA from "./sections/qa";
import Join from "./sections/join";

const Home: Component = () => {
  return (
    <>
      <Hero />
      <QA />
      <Join />
    </>
  );
};

export default Home;
