import { A } from "@solidjs/router";
import { Component } from "solid-js";

const Error: Component = () => (
  <div class="flex flex-grow items-center justify-center bg-gray-800 min-h-screen">
    <div class="rounded-lg bg-white p-8 text-center shadow-xl">
      <h1 class="mb-4 text-4xl font-bold">404</h1>
      <p class="text-gray-600">
        Oops! The page you are looking for could not be found.
      </p>
      <A
        href="/"
        class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      >
        Go back to Home
      </A>
    </div>
  </div>
);

export default Error;
