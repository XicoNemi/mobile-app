import { getValueFor } from "../utils/localStorage";
import LanguageProvider from "./LanguageProvider";
import { setLanguage, setTextsLeng } from "../features/languageSlice";

export default async function AssignLenguaje(dispatch) {
  let lenguage = await getValueFor("lenguage");
  if (lenguage) {
    if (lenguage == "en") {
      dispatch(setLanguage("en"));
      dispatch(setTextsLeng(LanguageProvider.en));
    } else {
      dispatch(setLanguage("spa"));
      dispatch(setTextsLeng(LanguageProvider.spa));
    }
  } else {
    dispatch(setLanguage("spa"));
    dispatch(setTextsLeng(LanguageProvider.spa));
  }
}
