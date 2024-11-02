import { getValueFor} from '../utils/localStorage';
import LanguageProvider from './LanguageProvider';

export default async function AssignLenguaje(setTextsLeng){
    let lenguage = await getValueFor("lenguage");
    if(lenguage){
        if (lenguage == "en") {
            setTextsLeng(LanguageProvider.en);
        } else {
            setTextsLeng(LanguageProvider.spa);
        }
    }else{
        setTextsLeng(LanguageProvider.spa);
    }
}