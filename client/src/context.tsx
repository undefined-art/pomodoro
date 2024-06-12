import {
  ParentComponent,
  Suspense,
  createContext,
  createEffect,
  createResource,
  startTransition,
  useContext,
} from "solid-js";

import * as i18n from "@solid-primitives/i18n";
import * as storage from "@solid-primitives/storage";
import * as router from "@solidjs/router";

import { createStore } from "solid-js/store";
import { dict as en_dict } from "./locales/en";
import { Meta } from "@solidjs/meta";

type RawDictionary = typeof en_dict;
export type LocaleType = "en" | "de" | "pl";
export type DimensionsType = { width: number; height: number };

export type AuthType = {
  username: string;
  avatar_url: string;
  is_authenticated: boolean;
};

type DeepPartial<T> = T extends Record<string, unknown>
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

const DEFAULT_USER_DATA: AuthType = {
  username: "",
  avatar_url: "",
  is_authenticated: false,
};

const raw_dict_map: Record<LocaleType, () => Promise<{ dict: RawDictionary }>> =
  {
    en: () => null as any,
    de: () => import("./locales/de"),
    pl: () => import("./locales/de"),
  };

export type Dictionary = i18n.Flatten<RawDictionary>;

const en_flat_dict: Dictionary = i18n.flatten(en_dict);

async function fetchDictionary(locale: LocaleType): Promise<Dictionary> {
  if (locale === "en") {
    return en_flat_dict;
  }

  const { dict } = await raw_dict_map[locale]();
  const flat_dict = i18n.flatten(dict) as RawDictionary;

  return { ...en_flat_dict, ...flat_dict };
}

interface Settings {
  locale: LocaleType;
  dark: boolean;
  dimensions: DimensionsType;
  auth: AuthType;
}

const toLocale = (string: string): LocaleType | null => {
  if (string in raw_dict_map) {
    return string as LocaleType;
  }

  return null;
};

const initialLocale = (location: router.Location): LocaleType => {
  let locale: LocaleType | null;

  locale = toLocale(location.query.locale);

  if (locale) {
    return locale;
  }

  locale = toLocale(navigator.language.slice(0, 2));

  if (locale) {
    return locale;
  }

  locale = toLocale(navigator.language.toLocaleLowerCase());

  if (locale) {
    return locale;
  }

  return "en";
};

const initialSettings = (location: router.Location): Settings => {
  return {
    locale: initialLocale(location),
    dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    dimensions: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    auth: DEFAULT_USER_DATA,
  };
};

const deserializeSettings = (
  value: string,
  location: router.Location
): Settings => {
  const parsed = JSON.parse(value) as unknown;

  if (!parsed || typeof parsed !== "object") {
    return initialSettings(location);
  }

  return {
    locale:
      ("locale" in parsed &&
        typeof parsed.locale === "string" &&
        toLocale(parsed.locale)) ||
      initialLocale(location),
    dark:
      "dark" in parsed && typeof parsed.dark === "boolean"
        ? parsed.dark
        : false,
    dimensions:
      "dimensions" in parsed && typeof parsed.dimensions === "object"
        ? (parsed.dimensions as DimensionsType)
        : {
            width: window.innerWidth,
            height: window.innerHeight,
          },
    auth:
      "auth" in parsed && typeof parsed.auth === "object"
        ? (parsed.auth as AuthType)
        : DEFAULT_USER_DATA,
  };
};

interface AppState {
  get isDark(): boolean;
  setDark(value: boolean): void;
  get locale(): LocaleType;
  setLocale(value: LocaleType): void;
  get dimensions(): DimensionsType;
  get auth(): AuthType;
  setAuth(value: AuthType): void;
  t: i18n.Translator<Dictionary>;
}

const AppContext = createContext<AppState>({} as AppState);

export const useAppState = () => useContext(AppContext);

const AppContextProvider: ParentComponent = (props) => {
  const location = router.useLocation();

  const now = new Date();

  const cookieOptions: storage.CookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };

  const [settings, set] = storage.makePersisted(
    createStore(initialSettings(location)),
    {
      storageOptions: cookieOptions,
      storage: storage.cookieStorage,
      deserialize: (value) => deserializeSettings(value, location),
    }
  );

  const locale = () => settings.locale;

  const [dict] = createResource(locale, fetchDictionary, {
    initialValue: en_flat_dict,
  });

  createEffect(() => {
    document.documentElement.lang = settings.locale;
  });

  createEffect(() => {
    if (settings.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const handleWindowResize = () => {
    set("dimensions", {
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  createEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  });

  const t = i18n.translator(dict, i18n.resolveTemplate);

  const state: AppState = {
    get isDark() {
      return settings.dark;
    },
    setDark(value) {
      set("dark", value);
    },
    get locale() {
      return settings.locale;
    },
    setLocale(value) {
      void startTransition(() => {
        set("locale", value);
      });
    },
    get dimensions() {
      return settings.dimensions;
    },
    get auth() {
      return settings.auth;
    },
    setAuth(value) {
      void startTransition(() => {
        set("auth", value);
      });
    },
    t,
  };

  return (
    <Suspense>
      <AppContext.Provider value={state}>
        <Meta name="lang" content={locale()} />
        <div>{props.children}</div>
      </AppContext.Provider>
    </Suspense>
  );
};

export default AppContextProvider;

export const useIsMobile = (breakpoint: number = 620) => {
  const { dimensions } = useAppState();

  const { width } = dimensions || {};

  return width < breakpoint;
};
