import React    from "react";

import AssetLoader         from "./../../AssetLoader";
import { SkeletonPayload } from "./../../Skeleton";

// import "./Builds.css";
import * as Styled from "./Builds.style.js"

const MAX_LEVEL = 12;

function addTimes (startTime, endTime) {
  let times = [ 0, 0]
  let max = times.length

  let a = (startTime || '').split(':')
  let b = (endTime || '').split(':')

  // normalize time values
  for (let i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i], 10)) ? 0 : parseInt(a[i], 10)
    b[i] = isNaN(parseInt(b[i], 10)) ? 0 : parseInt(b[i], 10)
  }

  // store time values
  for (let i = 0; i < max; i++) {
    times[i] = a[i] + b[i]
  }

  let hours = times[0];
  let minutes = times[1];

  if (minutes > 60) {
    let h = (minutes / 60) << 0
    hours += h
    minutes -= 60 * h
  }

  if (minutes < 0) {
    minutes = 60 + minutes;
    hours -= 1;
  }

  return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
}

const Abilities = ({name, levels}) => (
  <Styled.AbilitiesRow>
    <span>{name.substring(name.indexOf("_") + 1)}</span>
    <Styled.AbilitiesLabel type="abilities" name={name}/>
    {SkeletonPayload(MAX_LEVEL).map((number, i) => (
      <Styled.AbilityLevel key={i} active={levels[i] === 1 && "active"}>{i + 1}</Styled.AbilityLevel>
    ))}
  </Styled.AbilitiesRow>
);

export default class extends React.PureComponent {

  state = {
    playerLoaded: "",
  }

  componentWillMount() {
    this.setState({
      playerLoaded: this.props.me
    })
  }

  changePlayer = (player) => () => {
    this.setState({
      playerLoaded: player
    })
  }

  render() {
    const {teams, telemetry, status} = this.props;
    const { playerLoaded } = this.state;
    
    if (status === "loading" || !telemetry) return "Loading...";

    const detailsTeam = teams.find((team) => (
      team.players.find(player => player.name === playerLoaded)
    ));
     
    const detailsPlayer = detailsTeam.players.find(player => player.name === playerLoaded);

    const teamName = detailsTeam.side === "left/blue" ? "blue" : "red";

    // this is really prune to give undefined errors.... god.
    const telemetryPlayer = telemetry.facts[teamName][detailsPlayer.hero];

    // Create an array of unique abilities and sort...
    // we will use this to create each array of abilities
    const uniqueAbilities = Array.from(new Set(telemetryPlayer.skill)).sort();
    let abilities = [];
    for (let ability of uniqueAbilities) {
      abilities.push({
        name: ability,
        levels: []
      })
    };
    // Now we will fill the levels, with 1 as leveled and 0 as not leveled
    telemetryPlayer.skill.forEach(ably => {
      abilities = abilities.map(ab => ({
        ...ab,
        levels: [...ab.levels, (ab.name === ably) ? 1 : 0]
      }));
    });

    // Find the overdrives.
    // Overdrive of first two abilities is 5 levels, last ability is 3
    let overdrive = abilities.filter(ab => {
      const abl = ab.levels.filter(s => s === 1);
      const overdrive = ab.name.includes("_c") ? 3 : 5;
      return abl.length >= overdrive;
    });

    const items = [];

    telemetryPlayer.items.forEach(item => {
      const startAt = addTimes(item.Time, "00:-5");
      const endAt = addTimes(item.Time, "00:05");

      let found = false;
      for (let i = 0; i < items.length; i++) {
        let itemx = items[i];
        if (itemx.label > startAt && itemx.label <= endAt) {
          found = true;
          items[i].values[item.Item] = (items[i].values[item.Item]) ? items[i].values[item.Item] + 1: 1;
          break;
        }
      }
      if (!found) {
        items.push({
          label: item.Time,
          values: {
            [item.Item]: 1
          }
        })
      }
    });


    return (
      <Styled.Wrap>
        <Styled.Sidebar>
          {
            teams.map(team => (
              <Styled.Team key={team.side}>
              { 
                team.players.map(player => (
                  <Styled.Player key={player.id} 
                       onClick={this.changePlayer(player.name)}
                       active={playerLoaded === player.name}
                       >
                    <Styled.PlayerHero type="heroes" name={player.hero} />
                    <span>{player.name}</span>
                  </Styled.Player>
                ))
              }
              </Styled.Team>
            ))
          }
        </Styled.Sidebar>
        <Styled.Content>

          <h2>Abilities</h2>
          <Styled.Abilities>
              <Styled.AbilitiesGrid>
                <Styled.AbilitiesRow>
                  <span>OVERDRIVE</span>
                  {overdrive.map(ability => (
                    <Styled.AbilitiesLabel key={ability.name} type="abilities" name={ability.name} />
                  ))}
                </Styled.AbilitiesRow>
                {abilities.map(ability => (
                  <Abilities key={ability.name} {...ability} />
                ))}
            </Styled.AbilitiesGrid>
          </Styled.Abilities>

          <h2>Build</h2>
          <Styled.Builds>
            {items.map(i => (
              <Styled.BuildGroup key={i.label}>
                <Styled.BuildItems>
                  {Object.keys(i.values).map((item) => (
                    <Styled.BuildItem key={item} type="items" name={item}>
                      {i.values[item] > 1 && <span>{i.values[item]}</span>}
                    </Styled.BuildItem>
                  ))}
                </Styled.BuildItems>
                <span>{i.label}</span>
              </Styled.BuildGroup>
            ))}

          </Styled.Builds>
        </Styled.Content>
      </Styled.Wrap>
    )
  }
};