import { A } from "@solidjs/router";
import { NAVIGATION_LINKS } from "./constants";
import { For } from "solid-js";

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
        <For each={NAVIGATION_LINKS}>
          {({ title, path }) => (
            <A
              href={path}
              class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              {title}
            </A>
          )}
        </For>
      </div>
    </div>
  </>
);

export default WideNav;
