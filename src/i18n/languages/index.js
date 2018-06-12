/* eslint-disable import/first */
import _forEach from "lodash/forEach";

let langs = {};

/** English */
import en from "./en";
langs['en'] = en;

/** Dutch */
import du from "./du";
langs['du'] = du;

// /** Japanese */
// import jp from "./jp";
// langs['jp'] = jp;

// /** Cambodian */
// import kh from "./kh";
// langs['kh'] = kh;

// /** Iran */
// import ir from "./ir";
// langs['ir'] = ir;

/** Spanish */
import es from "./es";
langs['es'] = es;

/** Portuguese */
import br from "./br";
langs['br'] = br;

// /** German */
// import de from "./de";
// langs['de'] = de;

/** Italian */
import it from "./it";
langs['it'] = it;

/** Indonesian */
import id from "./id";
langs['id'] = id;

/** French */
import fr from "./fr";
langs['fr'] = fr;

// /** Korean */
// import kr from "./kr";
// langs['kr'] = kr;

// /** Tagalog */
// import ph from "./ph";
// langs['ph'] = ph;

/** Traditional Chinese */
import cn from "./cn";
langs['cn'] = cn;

/** Traditional Chinese */
import sc from "./sc";
langs['sc'] = sc;

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
  }
});

export default res;