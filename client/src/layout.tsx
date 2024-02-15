import { AuthContextProvider } from "./context/auth";
import Navbar from "./components/navbar";

const Layout = (props: any) => {
  return (
    <div>
      <Navbar />
      <AuthContextProvider>{props.children}</AuthContextProvider>
    </div>
  );
};

export default Layout;
