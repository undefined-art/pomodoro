import { A } from "@solidjs/router";
import { For, createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { NAVIGATION_LINKS } from "./constants";

const MobileNav = () => {
  const [navbarOpen, setNavbarOpen] = createSignal(false);

  const navbarToggleHandler = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
    <>
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
          type="button"
          class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onclick={navbarToggleHandler}
        >
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>

          <svg
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <svg
            class="hidden h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {navbarOpen() && (
        <Portal mount={document.querySelector("#page-nav") as Node}>
          <div class="sm:hidden" id="mobile-menu">
            <div class="space-y-1 bg-gray-900 w-5/6 max-w-lg m-auto rounded-md">
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
        </Portal>
      )}
    </>
  );
};

export default MobileNav;
