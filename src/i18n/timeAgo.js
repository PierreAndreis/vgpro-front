import React from "react";
import TimeAgo        from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { connect }    from "react-redux";


class timeAgoi18n extends React.Component {
  constructor() {
    super();

    this.state = {
      language: "en",
      strings: null
    }
  }

  async getLocale(language) {

    let locale;
    try {
      locale = await import(`./timeAgo/${language}.js`);
    }
    catch(e) {
      console.warn(language, "falling back to english");
      locale = await import(`./timeAgo/en.js`);
    }
    
    
    this.setState({
      language,
      strings: locale.default
    })
    
  }

  componentWillMount() {

    const {language} = this.props;
    
    return this.getLocale(language);
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
  