import React from "react";
import { translate } from "react-i18next";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import Utils from "./../utils";

class timeAgoi18n extends React.Component {
  constructor() {
    super();

    this.state = {
      language: "en",
      strings: null,
    };
  }

  getLocale(language) {
    this.cancelImport = Utils.makeCancelable(
      import(`./timeAgo/${language}.js`),
      locale => this.setState({ language, strings: locale.default }),
      () => this.getLocale("en")
    );
  }

  componentWillMount() {
    return this.getLocale(this.props.i18n.language);
  }

  componentWillUnmount() {
    if (typeof this.cancelImport === "function") this.cancelImport();
  }

  render() {
    const { strings } = this.state;
    const { date } = this.props;

    if (!strings) return <TimeAgo date={date} />;

    const formatter = buildFormatter(strings);

    return <TimeAgo date={date} formatter={formatter} live />;
  }
}

export default translate()(timeAgoi18n);
