import Vue from "vue";
import VueI18n from "vue-i18n";
import enLocale from "./en";
import LangStorage from './../../helpers/lang'
import elementEnLocale from "element-ui/lib/locale/lang/en"; // element-ui lang
// 按需引入Element
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
};

const i18n = new VueI18n({
  locale: LangStorage.getLang('en'),
  messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value))
export default i18n;
