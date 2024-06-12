import { Suspense } from "solid-js";
import { AuthContextProvider } from "./context/auth";
import { LocalizationContextProvider } from "./context/localization";
import { ViewportContextProvider } from "./context/viewport";

interface Props {
  children: Element;
}

const AppProviders = (props: Props) => {
  // TODO: refactor
  return (
    <Suspense>
      <LocalizationContextProvider>
        <AuthContextProvider>
          <ViewportContextProvider>{props.children}</ViewportContextProvider>
        </AuthContextProvider>
      </LocalizationContextProvider>
    </Suspense>
  );
};

export default AppProviders;
