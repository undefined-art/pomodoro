import Navbar from "./components/header";
import { AuthContextProvider } from "./context/auth";
import { ViewportContextProvider } from "./context/viewport";

const Layout = (props: any) => {
  return (
    <AuthContextProvider>
      <ViewportContextProvider>
        <Navbar />
        {props.children}
      </ViewportContextProvider>
    </AuthContextProvider>
  );
};

export default Layout;
