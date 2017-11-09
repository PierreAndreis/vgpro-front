import React from "react";

const RecentRoles = ({t}) => (
  <div>
    <div className="allroles">
      <div className="eachrole">
        <div className="role_img" id="carry" data-tooltip={t("role-Carry")}/>
        <div className="role_desc" id="carry">
          <span>1</span>
          /<span className='d'>
            2
          </span>/
          <span>3</span>
        </div>
        <div className="role_kda" id="carry">
          2.6 {t("kda")}
        </div>
        <div className="role_winrate" id="carry">
          0%
        </div>
        <div className="role_games" id="carry">
          15% {t("sidebar-played")}
        </div>
      </div>
      <div className="eachrole">
        <div className="role_img" id="jungler" data-tooltip={t("role-Jungler")}/>
        <div className="role_desc" id="jungler">
          1/2/3</div>
        <div className="role_kda" id="jungler">
          2.6 {t("kda")}
        </div>
        <div className="role_winrate" id="jungler">
          0%
        </div>
        <div className="role_games" id="jungler">
          15% {t("sidebar-played")}
        </div>
      </div>
      <div className="eachrole">
        <div className="role_img" id="captain" data-tooltip={t("role-Captain")}/>
        <div className="role_desc" id="captain">
          1/2/3</div>
        <div className="role_kda" id="captain">
          2.6 {t("kda")}
        </div>
        <div className="role_winrate" id="captain">
          0%
        </div>
        <div className="role_games" id="captain">
          15% {t("sidebar-played")}
        </div>
      </div>
    </div>
    <div className="role" id="charts" style={{
      width: "200px"
    }}>
    </div>
  </div>
)

export default RecentRoles;