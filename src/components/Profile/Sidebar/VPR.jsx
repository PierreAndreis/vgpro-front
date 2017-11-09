import React from "react";

const VPR = ({t}) => (
  <div>
    <div className="rating">
      <div className="rating_number" data-tooltip="You need to play more ranked!">
        ?
      </div>
      <div className="rating_caption" data-tooltip="VGPRO RATING">
        VPR
      </div>
      <div className="position">
        <span>#?</span>
        GLOBAL
      </div>
      <div className="position">
        <span>#?</span>
        REGION ?
      </div>
    </div>
    <div className="rating">
      {/* if (rating >= 2000) {
                style = "avg"
            };
            if (rating >= 2600) {
                style = "high";
            }
            if (rating >= 2950) {
                style = "superhigh";
            }
            if (rating <= 1900) {
                style = "low";
            }
            if (rating <= 1000) {
                style = "suplow";
            } */}
      <div className="rating_number" id=' + style + '>123</div>
      <div className="rating_caption" data-tooltip="VGPRO RATING">VPR</div>
      <div className="position">
        <span>#1</span>
        GLOBAL</div>
      <div className="position">
        <span>#2</span>
        REGION SA</div>
    </div>
    <div className="info">
      <p style={{
        color: "rgb(242, 191, 0)"
      }} id="alert_ranked">
        {t('rating-alert')}
        {/* You need a minimium of 10 ranked games wins. */}
      </p>
      <p>
        {t("rating-info-one")}
        {/* VGPRO RATING is a rating calculated by VGPRO.gg based on
            your skill tier, perfomance, and kda in Ranked Matches. */}
      </p>
      <p>
        {t("rating-info-two")}
        {/* Rank is a representative of your position against others
            players using VGPRO.gg services. */}
      </p>
      <p>
        {t("rating-info-three")}
        {/* This data does not represent the entire Vainglory Game. */}
      </p>
    </div>
  </div>
);

export default VPR;