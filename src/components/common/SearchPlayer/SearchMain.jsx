import React from "react";

import "./SearchMain.css";

export default ({status, onSearch, onChange, placeholder, value}) =>  {

    let icon = "fa fa-search";
    let formClasses = [];

    if (status === "loading") {
      formClasses.push("loading");
      icon = "fa fa-refresh fa-spin fa-3x fa-fw";
    }
    else if (status === "error"){
      formClasses.push("error");
      icon = "fa fa fa-exclamation-triangle";
    }

    return (
    <div className="SearchBar">
      <form action="" onSubmit={onSearch} className={formClasses.join(" ")}>

        <button type="submit" disabled={status === "loading"}> 
          <i className={icon} />
        </button>
        <input
          type="text"
          className="SearchBar-Input"
          disabled={status === "loading"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          autoComplete="off" 
          autoCorrect="off" 
          autoCapitalize="off" 
          spellCheck="false"
        />
      </form>
    </div>
    )
}