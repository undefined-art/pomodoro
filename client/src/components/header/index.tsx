import SubMenu from "./components/sub-menu";
import MobileNav from "./components/mobile-nav";
import WideNav from "./components/wide-nav";

const Navbar = () => {
  return (
    <nav class="bg-white dark:bg-gray-800" id="page-nav">
      <div class="m-auto w-5/6 max-w-7xl">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <MobileNav />
            <WideNav />
          </div>
          <SubMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
