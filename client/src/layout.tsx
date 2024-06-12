import Navbar from "./components/header";
import AppContextProvider from "./context";
import { MetaProvider } from "@solidjs/meta";

interface Props {
  children: Element;
}

const Layout = (props: Props) => {
  return (
    <MetaProvider>
      <AppContextProvider>
        <div>
          <Navbar />
          <div class="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800">
            {props.children}
          </div>
        </div>
      </AppContextProvider>
    </MetaProvider>
  );
};

export default Layout;
