import React from "react";
import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";

import "./Heroes.css";

export default () => (
  <Box className="animated fadeInRight">
    <BoxTitle className="HeroesMeta-Title">
      <span>Top Pick Rate</span>
      <div className="HeroesMeta-Selector">
        <div className="HeroesMeta-Selector-PickRate" />
        <div className="HeroesMeta-Selector-PickRate" />
        <div className="HeroesMeta-Selector-PickRate" />
      </div>
    </BoxTitle>
    <BoxBody className="HeroesMeta">
      <div className="HeroesMeta_RegionSelect">
        <div className="active">ALL</div>
        <div>EU</div>
        <div>NA</div>
        <div>SEA</div>
        <div>CN</div>
        <div>CN</div>
      </div>

      <div className="HeroesMeta-Top3">
        <div className="HeroesMeta-Top">
          <div className="Heroes-Meta-Top-Image" style={{
              backgroundImage: `url(http://vgpro.gg/assets/images/heroes/varya.gif)`
          }}>
            <div className="Heroes-Meta-Top-Image-Tag Tag-2">2</div>
          </div>
          <div className="Heroes-Meta-Top-Name">Catherine</div>
          <span>25%</span>
        </div>

        <div className="HeroesMeta-Top">
          <div className="Heroes-Meta-Top-Image" style={{
              backgroundImage: `url(http://vgpro.gg/assets/images/heroes/varya.gif)`
          }}>
            <div className="Heroes-Meta-Top-Image-Tag Tag-1">1</div>
          </div>
          <div className="Heroes-Meta-Top-Name">Blackfeather</div>
          <span>25%</span>
        </div>

        <div className="HeroesMeta-Top">
          <div className="Heroes-Meta-Top-Image" style={{
              backgroundImage: `url(http://vgpro.gg/assets/images/heroes/varya.gif)`
          }}>
            <div className="Heroes-Meta-Top-Image-Tag Tag-3">3</div>
          </div>
          <div className="Heroes-Meta-Top-Name">Grumpjaw</div>
          <span>25%</span>
        </div>
      </div>

      <div className="Heroes-Meta-Divider" />

      <div className="Heroes-Meta-Others">
        <div className="HeroesMeta-Top">
          <div className="Heroes-Meta-Top-Image" style={{
              backgroundImage: `url(http://vgpro.gg/assets/images/heroes/varya.gif)`
          }}>
            <div className="Heroes-Meta-Top-Image-Tag">2</div>
          </div>
          <div className="Heroes-Meta-Top-Name">Catherine</div>
          <span>25%</span>
        </div>

        <div className="HeroesMeta-Top">
          <div className="Heroes-Meta-Top-Image" style={{
              backgroundImage: `url(http://vgpro.gg/assets/images/heroes/varya.gif)`
          }}>
            <div className="Heroes-Meta-Top-Image-Tag">2</div>
          </div>
          <div className="Heroes-Meta-Top-Name">Catherine</div>
          <span>25%</span>
        </div>

        <div className="HeroesMeta-Top">
          <div className="Heroes-Meta-Top-Image" style={{
              backgroundImage: `url(http://vgpro.gg/assets/images/heroes/varya.gif)`
          }}>
            <div className="Heroes-Meta-Top-Image-Tag">2</div>
          </div>
          <div className="Heroes-Meta-Top-Name">Catherine</div>
          <span>25%</span>
        </div>

      </div>
    
    </BoxBody>
    <BoxActions />
  </Box>
)