import { createSignal } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { useAppState } from "../../../context";

const SubMenu = () => {
  const { auth } = useAppState();
  const navigate = useNavigate();
  const [subMenuOpen, setSubMenuOpen] = createSignal(false);

  const sideMenuToggleHandler = () => {
    setSubMenuOpen((prev) => !prev);
  };

  if (!auth.is_authenticated) {
    return (
      <div class="flex items-center space-x-4">
        <A
          href="/sign-in"
          class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Sign In
        </A>
        <A
          href="/sign-up"
          class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        >
          Sign Up
        </A>
      </div>
    );
  }

  return (
    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
      <div class="relative ml-3 ">
        <div>
          <button
            type="button"
            class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            onclick={sideMenuToggleHandler}
          >
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">Open user menu</span>
            <img
              class="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </button>
        </div>
        {subMenuOpen() && (
          <div
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              Your Profile
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
            >
              Settings
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-2"
            >
              Sign out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubMenu;
