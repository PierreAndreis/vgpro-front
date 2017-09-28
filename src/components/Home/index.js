import React from "react";
import ProFeed from "./ProFeed";


import "./Home.css";
import "./Lead5.css";

class HomePage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="content">
        <div className="wrap">
          <div className="home-Card">
          <div className="home-Card-Title">{t("pro-history")}{" "}</div>
          <div className="home-Card-Body">
            <ProFeed t={t} />
          </div>
          <div className="home-Card-Footer" />
            
          </div>
          <div className="home-Card">
            <div className="home-Card-Title">{t("leadboard")}{" "}</div>
            <div className="home-Card-Body">

              <div className="Lead5">

                <div className="Lead5-each" id="featured">
                  <div className="Lead5-each-pos">1</div>
                  <div className="Lead5-each-info">
                    <div className="Lead5-each-info-name">MiniDookie <span>SA</span></div>
                    <div className="Lead5-each-info-skilltier">Vainglorious Gold</div>
                    <div className="Lead5-each-info-stats">AVG KDA 5.11 - CARRY</div>
                  </div>
                  <div className="Lead5-each-vpr">
                    <div className="Lead5-each-vpr-number">3031</div>
                    <div className="Lead5-each-vpr-name">VPR</div>
                  </div>
                </div>

                <div className="Lead5-each">
                  <div className="Lead5-each-pos">2</div>
                  <div className="Lead5-each-info">
                    <div className="Lead5-each-info-name">MiniDookie <span>SA</span></div>
                    <div className="Lead5-each-info-skilltier">Vainglorious Gold</div>
                    <div className="Lead5-each-info-stats">AVG KDA 5.11 - CARRY</div>
                  </div>
                  <div className="Lead5-each-vpr">
                    <div className="Lead5-each-vpr-number">3031</div>
                    <div className="Lead5-each-vpr-name">VPR</div>
                  </div>
                </div> 
                
                <div className="Lead5-each">
                  <div className="Lead5-each-pos">3</div>
                  <div className="Lead5-each-info">
                    <div className="Lead5-each-info-name">MiniDookie <span>SA</span></div>
                    <div className="Lead5-each-info-skilltier">Vainglorious Gold</div>
                    <div className="Lead5-each-info-stats">AVG KDA 5.11 - CARRY</div>
                  </div>
                  <div className="Lead5-each-vpr">
                    <div className="Lead5-each-vpr-number">3031</div>
                    <div className="Lead5-each-vpr-name">VPR</div>
                  </div>
                </div> 

                <div className="Lead5-each">
                  <div className="Lead5-each-pos">4</div>
                  <div className="Lead5-each-info">
                    <div className="Lead5-each-info-name">MiniDookie <span>SA</span></div>
                    <div className="Lead5-each-info-skilltier">Vainglorious Gold</div>
                    <div className="Lead5-each-info-stats">AVG KDA 5.11 - CARRY</div>
                  </div>
                  <div className="Lead5-each-vpr">
                    <div className="Lead5-each-vpr-number">3031</div>
                    <div className="Lead5-each-vpr-name">VPR</div>
                  </div>
                </div> 

                <div className="Lead5-each">
                  <div className="Lead5-each-pos">5</div>
                  <div className="Lead5-each-info">
                    <div className="Lead5-each-info-name">MiniDookie <span>SA</span></div>
                    <div className="Lead5-each-info-skilltier">Vainglorious Gold</div>
                    <div className="Lead5-each-info-stats">AVG KDA 5.11 - CARRY</div>
                  </div>
                  <div className="Lead5-each-vpr">
                    <div className="Lead5-each-vpr-number">3031</div>
                    <div className="Lead5-each-vpr-name">VPR</div>
                  </div>
                </div> 

              </div>
              
            </div>
            </div>
          <div className="home-Card">
            <div className="home-Card-Title">{t("leadboard")}{" "}</div>
            <div className="home-Card-Body">
            

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
