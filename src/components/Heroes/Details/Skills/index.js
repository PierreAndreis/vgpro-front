import React from "react";
import Spinner from "react-spinkit";
import Media from "react-media";

import * as Styled from "./Skills.style";
import { Rate } from "../../../common/ColoredValues";

// Query to show content below skills, and not on content div
const queryToMobile = "(max-width: 768px)";

const Skill = ({hero, skill}) => {

  let order = skill.key.split(",");

  // Used to detect overdrives
  let abilitiesLevels =  {a: 0, b: 0, c: 0};

  let winRate = skill.winRate;
  let pickRate = skill.pickRate;

  return (
    <Styled.Each>
      <Styled.SkillOrder>
        {
          Array(12).fill(1).map((value, index) => {
            let ability = order[index];
            let level = ++abilitiesLevels[ability];
            // Ult is level 3, anything else is level 5
            let isOverdriveLevel = (ability === "c") ? level === 3 : level === 5;
            return (
              <div key={index}>
                {index + 1}
                <Styled.Order type="abilities" name={(isOverdriveLevel && `${hero}_${order[index]}`) || undefined}>
                  {!isOverdriveLevel && order[index]}
                </Styled.Order>
              </div>
            );
          })
        }
      </Styled.SkillOrder>
      <section>
        <div>
          <b><Rate rate={winRate} /></b>
          <span>Win Rate</span>
        </div>
        <div>
          <b><Rate rate={pickRate} /></b>
          <span>Pick Rate</span>
        </div>
      </section>
    </Styled.Each>
  )
}

const ContentSkill = ({hero, skills}) => {

  skills.sort((a, b) => a.pickRate > b.pickRate ? -1 : 1);

  return (
    <React.Fragment>
      {skills.map(skill => (
        <Skill key={skill.key} hero={hero} skill={skill} />
      ))}
    </React.Fragment>
  )

}

const CategorySkill = ({onClick, selected, hero, category, skills}) => {

  let skillOrder = category.key.split("");
  let winRate = category.winRate;
  let pickRate = category.pickRate;

  return (
    <React.Fragment>
      <Styled.Category hover active={selected} onClick={onClick}>
        <div>
        {skillOrder.map((ability, index) => (
          <Styled.CategorySkills key={index} type="abilities" name={`${hero}_${ability}`} />
        ))}
        </div>
        <section>
          <div>
            <b><Rate rate={winRate} /></b>
            <span>Win Rate</span>
          </div>
          <div>
            <b><Rate rate={pickRate} /></b>
            <span>Pick Rate</span>
          </div>
        </section>
      </Styled.Category>
      <Media query={queryToMobile}>
        {matches => matches && selected && <ContentSkill hero={hero} skills={skills} />}
      </Media>
    </React.Fragment>
  )
}

class Skills extends React.Component {

  state = {
    category: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.payload && !prevState.category) {
      return {
        category: nextProps.payload.categorySkills[0]
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  selectCategory = (category) => (e) => {
    // if (this.state.category && this.state.category.key === category.key) return;
    this.setState((prevState) => {
      if (prevState.category === category.key) return ({category: null})
      return ({category});
    })
  }


  render() {
    let payload = this.props.payload;
    let hero = this.props.hero;

    if (!payload) {
      return (
        <div style={{margin: "10% auto", gridColumn: "2 / 2"}}>
            <Spinner name="line-spin-fade-loader" color="rgba(0, 0, 0, 0.2)" fadeIn="none"/>
        </div>
      )
    }

    let currentCategory = this.state.category;

    let skills = payload.skills;
    let categories = payload.categorySkills;
    let skillsSelected = skills.filter((skill) => skill.category === currentCategory.key);

    return (
      <React.Fragment>
        <Styled.Sidebar>
          {
            categories.map((category, index) => (
              <CategorySkill key={index} 
                hero={hero}
                selected={currentCategory && currentCategory.key === category.key}
                skills={skills && skills.filter((skill) => skill.category === category.key)} 
                category={category} 
                onClick={this.selectCategory(category)}
              />
            ))
          }
        </Styled.Sidebar>

        <Styled.Content>
        <Media query={queryToMobile}>
          {matches => !matches && <ContentSkill hero={hero} skills={skillsSelected} />}
        </Media>
        </Styled.Content>
      </React.Fragment>
    )
  }
}

export default Skills;