import Navbar from "./components/header";
import { AuthContextProvider } from "./context/auth";
import { ViewportContextProvider } from "./context/viewport";

const Layout = (props: any) => {
  return (
    <AuthContextProvider>
      <ViewportContextProvider>
        <Navbar />
        <div class="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800">
          {props.children}
        </div>
      </ViewportContextProvider>
    </AuthContextProvider>
  );
};

export default Layout;
