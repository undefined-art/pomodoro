import {
  Accessor,
  Setter,
  createContext,
  useContext,
  createSignal,
  JSXElement,
  createResource,
  Resource,
  useTransition,
} from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { dict as default_dict } from "../locales/en";

export type Locale = "en" | "de";
export type RawDictionary = typeof default_dict;
export type Dictionary = i18n.Flatten<RawDictionary>;

type LocalizationContextPropsType = {
  locale: Accessor<Locale>;
  switchLocale: (locale: Locale) => void;
  t: i18n.Translator<Dictionary>;
  dictionary: Resource<RawDictionary>;
  duringTransition: Accessor<boolean>;
};

const raw_dict_map: Record<Locale, () => Promise<{ dict: RawDictionary }>> = {
  en: () => null as any,
  de: () => import("../locales/de.ts"),
};

const LocalizationContext = createContext<LocalizationContextPropsType>();

async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "en") {
    return i18n.flatten(default_dict);
  }

  const { dict } = await raw_dict_map[locale]();

  return i18n.flatten(dict) as RawDictionary;
}

interface Props {
  children: JSXElement;
}

export const LocalizationContextProvider = (props: Props) => {
  const [locale, setLocale] = createSignal<Locale>("en");

  const [dictionary] = createResource(locale, fetchDictionary, {
    initialValue: i18n.flatten(default_dict),
  });

  const [duringTransition, startTransition] = useTransition();

  const t = i18n.translator(dictionary, i18n.resolveTemplate);

  const switchLocale = (locale: Locale) => {
    startTransition(() => setLocale(locale));
  };

  return (
    <LocalizationContext.Provider
      value={{ locale, switchLocale, t, dictionary, duringTransition }}
    >
      {props.children}
    </LocalizationContext.Provider>
  );
};

export const useLocalizationContext = () => useContext(LocalizationContext)!;
