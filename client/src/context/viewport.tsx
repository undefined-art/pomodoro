import {
  Accessor,
  JSXElement,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

interface Props {
  children: JSXElement;
}

type AuthContextPropsType = {
  width: Accessor<number>;
  height: Accessor<number>;
};

const ViewportContext = createContext<AuthContextPropsType>();

export const ViewportContextProvider = (props: Props) => {
  const [width, setWidth] = createSignal(window.innerWidth);
  const [height, setHeight] = createSignal(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  createEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  });

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {props.children}
    </ViewportContext.Provider>
  );
};

export const useViewportContext = () => useContext(ViewportContext)!;

export const useIsMobile = (breakpoint: number = 620) => {
  const { width } = useViewportContext();

  return width() < breakpoint;
};
