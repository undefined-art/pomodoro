import {
  Accessor,
  Setter,
  createContext,
  useContext,
  createSignal,
  JSXElement,
} from "solid-js";

const DEFAULT_USER_DATA = {
  username: "",
  avatar_url: "",
  is_authenticated: false,
};

type UserType = {
  username: string;
  avatar_url: string;
  is_authenticated: boolean;
};

type AuthContextPropsType = {
  user: Accessor<UserType>;
  setUser: Setter<UserType>;
};

const AuthContext = createContext<AuthContextPropsType>();

interface Props {
  children: JSXElement;
}

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = createSignal<UserType>(DEFAULT_USER_DATA, {
    equals: false,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext)!;
