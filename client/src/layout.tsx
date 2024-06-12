import Navbar from "./components/header";
import { useLocalizationContext } from "./context/localization";

interface Props {
  children: Element;
}

const Layout = (props: Props) => {
  const { duringTransition } = useLocalizationContext();

  return (
    <div style={{ opacity: duringTransition() ? 0.5 : 1 }}>
      <Navbar />
      <div class="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
