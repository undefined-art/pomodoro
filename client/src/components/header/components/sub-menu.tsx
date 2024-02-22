import { createSignal } from "solid-js";
import { useAuthContext } from "../../../context/auth";
import { useNavigate } from "@solidjs/router";

const SubMenu = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [subMenuOpen, setSubMenuOpen] = createSignal(false);

  const sideMenuToggleHandler = () => {
    setSubMenuOpen((prev) => !prev);
  };

  if (!user().is_authenticated) {
    return (
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onclick={() => navigate("/register")}
      >
        Get Started
      </button>
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
