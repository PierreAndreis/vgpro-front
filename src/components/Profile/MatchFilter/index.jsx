import React from "react";
import Box from "../../common/Box";

import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import "./MatchFilter.css";

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log('Selected: ', val);
}

class MatchFilter extends React.Component {

  render() {

    return (
      <div>
      <Box.wrap className="MatchFilter">
        <Box.body>
          Filters here
        </Box.body>
      </Box.wrap>
      
      </div>
    )
  }
}

export default MatchFilter;