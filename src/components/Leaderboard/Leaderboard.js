import React                from "react";
import AssetLoader          from "./../common/AssetLoader";
import {fetchLeaderboards}  from "./../../actions/api";
import Utils                from "./../../utils";

import "./Leaderboard.css"
import "./../common/Box.css"

const Leaderboards = (props) => {

    return (
        <div className="LeaderboardsMeta PlayerInfo-info">
             <AssetLoader type="tiers" className="LeaderboardsMeta PlayerInfo-tier" name={props.vst}></AssetLoader>  <span className="LeaderboardsData LeaderboardsIgn">{props.name}</span>    <span className="LeaderboardsData LeaderboardsKDA">{props.kda}</span>   <span className="LeaderboardsData LeaderboardsVpr">{props.vpr}</span>    <span className="LeaderboardsData LeaderboardsWins">{props.wins}</span> <span className="LeaderboardsData LeaderboardsLosses">{props.losses}</span>
        </div>
    );
};

const REGIONS = [
    "all",
    "na",
    "eu",
    "ea",
    "sea",
    "sa",
    "cn"
];

export default class extends React.Component {

    state = {
        region: "all",
        status: "loading",
        page: 0,
        payload: [
            {
                id: "Skillz4Killz",
                vst: 26,
                kills: 200,
                deaths: 900,
                assists: 1000,
                vpr: 2745,
                wins: 789,
                losses: 699,
            },
            {
                id: "4ever",
                vst: 29,
                kills: 2000,
                deaths: 500,
                assists: 100,
                vpr: 2990,
                wins: 2142,
                losses: 3235,
            },
            {
                id: "L3oN",
                vst: 26,
                kills: 200,
                deaths: 900,
                assists: 1000,
                vpr: 2745,
                wins: 789,
                losses: 699,
            },
            {
                id: "EZLinEU",
                vst: 29,
                kills: 2000,
                deaths: 500,
                assists: 100,
                vpr: 2990,
                wins: 2142,
                losses: 3235,
            },
        ],
    };
    componentDidMount() {
        this.fetch();
    }

    componentWillUnmount() {
        this.cancel();
    }

    changeRegion = (region) => (e) => {
        if (this.state.region === region) return;
        this.setState({
            region: region,
        }, this.fetch)
    };

    async fetch() {
        const {region} = this.state;

        this.setState({
            status: "loading",
            page: 0,
            payload: [
                {
                    id: "Skillz4Killz",
                    vst: 26,
                    kills: 200,
                    deaths: 900,
                    assists: 1000,
                    vpr: 2745,
                    wins: 789,
                    losses: 699,
                },
                {
                    id: "4ever",
                    vst: 29,
                    kills: 2000,
                    deaths: 500,
                    assists: 100,
                    vpr: 2990,
                    wins: 2142,
                    losses: 3235,
                },
                {
                    id: "L3oN",
                    vst: 26,
                    kills: 200,
                    deaths: 900,
                    assists: 1000,
                    vpr: 2745,
                    wins: 789,
                    losses: 699,
                },
                {
                    id: "EZLinEU",
                    vst: 29,
                    kills: 2000,
                    deaths: 500,
                    assists: 100,
                    vpr: 2990,
                    wins: 2142,
                    losses: 3235,
                },
            ]
        });

        const server_region = (region === "sea") ? "sg" : region;


        this.cancel = Utils.makeCancelable(
            fetchLeaderboards(server_region),
            (res) => {
                let test = res
                test = [
                    {
                        id: "Skillz4Killz",
                        vst: 26,
                        kills: 200,
                        deaths: 900,
                        assists: 1000,
                        vpr: 2745,
                        wins: 789,
                        losses: 699,
                    },
                    {
                        id: "4ever",
                        vst: 29,
                        kills: 2000,
                        deaths: 500,
                        assists: 100,
                        vpr: 2990,
                        wins: 2142,
                        losses: 3235,
                    },
                    {
                        id: "L3oN",
                        vst: 26,
                        kills: 200,
                        deaths: 900,
                        assists: 1000,
                        vpr: 2745,
                        wins: 789,
                        losses: 699,
                    },
                    {
                        id: "EZLinEU",
                        vst: 29,
                        kills: 2000,
                        deaths: 500,
                        assists: 100,
                        vpr: 2990,
                        wins: 2142,
                        losses: 3235,
                    },
                ]
                this.setState({status: "loaded", payload: test})
            }
        );
    }

    nextPage = (e) => {
        e.preventDefault();
        if (e.target.id === "disabled") return;
        this.setState((prevState) => ({
            page: prevState.page + 1,
        }));
    };

    prevPage = (e) => {
        e.preventDefault();
        if (e.target.id === "disabled") return;
        this.setState((prevState) => ({
            page: prevState.page - 1,
        }));
    };

    render() {
        const {payload, page} = this.state;

        let perPage = 2;
        let rank = 1 + (perPage * page);
        const totalHeroes = 4;

        const nextBlocked = rank + perPage >= (totalHeroes);
        const prevBlocked = page === 0;

        return (
            <div>
                <div className="LeaderboardsMeta_RegionSelect">
                    {
                        REGIONS.map(region => (
                            <div key={region}
                                 onClick={this.changeRegion(region)}>
                                {region}
                            </div>
                        ))
                    }
                </div>
                <div>
                    {
                        payload.map(p => (
                            <Leaderboards name={p.id} vst={p.vst} kda={Math.round((p.kills + p.assists) / p.deaths)} vpr={p.vpr} wins={p.wins} losses={p.losses}/>
                        ))
                    }

                </div>

                <div className="button" id={prevBlocked ? "disabled" : ""} onClick={this.prevPage}>View Less</div>
                <div className="button" id={nextBlocked ? "disabled" : ""} onClick={this.nextPage}>View more</div>
            </div>
        )
    }
}