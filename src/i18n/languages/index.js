/* eslint-disable import/first */
import _forEach from "lodash/forEach";

let langs = {};

/** English */
import en from "./en";
langs["en"] = en;

/** Dutch */
import du from "./du";
langs["du"] = du;

/** Spanish */
import es from "./es";
langs["es"] = es;

/** Portuguese */
import br from "./br";
langs["br"] = br;

/** Indonesian */
import id from "./id";
langs["id"] = id;

/** French */
import fr from "./fr";
langs["fr"] = fr;

/** Traditional Chinese */
import cn from "./cn";
langs["cn"] = cn;

/** Traditional Chinese */
import sc from "./sc";
langs["sc"] = sc;

/** Romanian */
import ro from "./ro";
langs["ro"] = ro;

/** Arabic */
import ar from "./ar";
langs["ar"] = ar;

/** Vietnamese */
import vi from "./vi";
langs["vi"] = vi;

/** Thai */
import th from "./th";
langs["th"] = th;

let res = {};

// Due to i18next needing a namespace, we will insert all translations into a ghost namespace
_forEach(langs, (lang, i) => {
  res[i] = {
    translations: lang,
  };
});

export default res;
