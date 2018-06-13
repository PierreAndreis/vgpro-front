/* eslint-disable import/first */
import _forEach from "lodash/forEach";

let langs = {};

/** English */
import en from "./en";
langs["en"] = en;

// /** Japanese */
// import jp from "./jp";
// langs['jp'] = jp;

// /** Cambodian */
// import kh from "./kh";
// langs['kh'] = kh;

// /** Iran */
// import ir from "./ir";
// langs['ir'] = ir;

/** Dutch */
import du from "./du";
langs["du"] = du;

/** Spanish */
import es from "./es";
langs["es"] = es;

/** Portuguese */
import pt from "./pt";
langs["pt"] = pt;

/** Indonesian */
import id from "./id";
langs["id"] = id;

// /** French */
// import fr from "./fr";
// langs["fr"] = fr;

// /** German */
// import de from "./de";
// langs['de'] = de;

/** Traditional Chinese */
import zh from "./zh";
langs["zh"] = zh;

/** Traditional Chinese */
import zhTW from "./zhTW";
langs["zh-TW"] = zhTW;

// /** Korean */
// import kr from "./kr";
// langs['kr'] = kr;

// /** Tagalog */
// import ph from "./ph";
// langs['ph'] = ph;

// /** Russian */
// import ru from "./ru";
// langs['ru'] = ru;

/** Romanian */
import ro from "./ro";
langs['ro'] = ro;

// /** Malasyan */
// import my from "./my";
// langs['my'] = my;

/** Arabic */
import ar from "./ar";
langs['ar'] = ar;

/** Vietnamese */
import vi from "./vi";
langs['vi'] = vi;

/** Thai */
import th from "./th";
langs['th'] = th;

/** Turkish */
import tu from "./tu";
langs['tu'] = tu;

let res = {};

// Due to i18next needing a namespace, we will insert all translations into a ghost namespace
_forEach(langs, (lang, i) => {
  res[i] = {
    translations: lang,
  };
});

export default res;
