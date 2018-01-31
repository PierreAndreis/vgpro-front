import React from "react";
import Match from "./Match"

import { fetchMatchDetails } from "./../../../actions/api";

class MatchPage extends React.Component {

    constructor(props) {
        super(props);

        /* because this is all local given data we don't need redux?
        i have a feeling this is wrong */
        this.state = null;
    }

    componentWillMount() {
        const {match} = this.props;
        const {player} = match.params;
        /* Sense we don't want ALL of the user's matches we fetch for this one id */
        fetchMatchDetails(match.params.matchId, match.params.region)
        .then(res => {
            /* This is a hack because I currently don't know
            the procedure of correctly setting "me" true. */
            if (player && typeof player !== "undefined") {
                for (let index in res.players) {
                    if (res.players[index].name === player) {
                        res.players[index].me = true;
                        break;
                    }
                }
            } else {
                res.players[0].me = true;
            }
            this.setState(res)
        });
    }

    render() {
        if (!this.state)
            return false;
        return (
            <Match key={0} payload={this.state} status={"loaded"}/>
        );
    }
}

export default MatchPage;