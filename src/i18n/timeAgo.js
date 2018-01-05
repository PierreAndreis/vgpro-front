import React from "react";
import TimeAgo        from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { connect }    from "react-redux";
import Utils          from "./../utils";


class timeAgoi18n extends React.Component {
  constructor() {
    super();

    this.state = {
      language: "en",
      strings: null
    }
  }

  getLocale(language) {

    this.cancelImport = Utils.makeCancelable(
      import(`./timeAgo/${language}.js`),
      (locale) => this.setState({language, strings: locale.default}),
      ()       => this.getLocale("en")
    );
  }

  componentWillMount() {

    const {language} = this.props;
    
    return this.getLocale(language);
  }
  
  componentWillUnmount() {
    if (typeof this.cancelImport === "function") this.cancelImport();
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.props.language !== nextProps.language) {
      this.getLocale(nextProps.language);
    }
  }

  render() {

    const {strings} = this.state;
    const {date} = this.props;

    if (!strings) return <TimeAgo date={date} />

    const formatter = buildFormatter(strings)
  
    return <TimeAgo date={date} formatter={formatter} live />
  }

}


const mapStateToProps = state => {
  
    return {
      language: state.i18n.current
    }
  }
  
  
  export default connect(
    mapStateToProps,
    null
  )(timeAgoi18n);
  