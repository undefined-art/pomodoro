import { A } from "@solidjs/router";

const WideNav = () => (
  <>
    <div class="hidden flex flex-shrink-0 items-center sm:block">
      <span class="h-8 w-auto">
        <A href="/" aria-current="page">
          <img
            src="./src/images/hero.png"
            alt="hero image"
            class="w-12 h-auto"
          />
        </A>
      </span>
    </div>
    <div class="hidden sm:ml-6 sm:block">
      <div class="flex space-x-4">
        {/* <A
          href="/technique"
          class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page"
        >
          Technique
        </A>
        <A
          href="/about"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >
          About this app
        </A> */}
        <A
          href="/todos"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >
          TODO List
        </A>
      </div>
    </div>
  </>
);

export default WideNav;
