import React from "react";
import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";

import "./Heroes.css";

export default () => (
  <Box className="animated fadeInRight">
    <BoxTitle>Meta</BoxTitle>
    <BoxBody className="HeroesMeta">
      <div className="HeroesMeta_RegionSelect">
        <div className="active">ALL</div>
        <div>EU</div>
        <div>NA</div>
        <div>SEA</div>
        <div>CN</div>
        <div>CN</div>
      </div>
    
    </BoxBody>
    <BoxActions />
  </Box>
)