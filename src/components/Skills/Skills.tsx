import classes from "./Skills.module.css";
import DATA from "../../data/index.json";
import "./customIcons.css";

type skillItem = {
  id: string;
  title: string;
  stack: (
    | string
    | {
        name: string;
        icon: string;
      }
  )[];
};

const Skills: React.FC = (props) => {
  return (
    <section id="myskills" tabIndex={0} className={classes.skills}>
      <ul className={classes.skillList}>
        {DATA?.skills?.map((item: skillItem, index: number) => (
          <div key={index} className={classes.skillCard}>
            <p className={classes.subject}>{item.title}</p>

            <ul className={classes.stack}>
              {item?.stack?.map((skill, stackIndex: number) => (
                <li key={stackIndex} className={classes.skillItem}>
                  <i
                    className={`${classes.icon} bx bx-sm bxl-${
                      typeof skill === "string"
                        ? skill.toLowerCase()
                        : skill.icon.toLowerCase()
                    }`}
                  ></i>
                  <p className={classes.skillName}>
                    {typeof skill === "string" ? skill : skill.name}
                  </p>
                </li>
              ))}
            </ul>

            {/* <ul className={classes.stack}>
              {item?.stack?.map((skill, stackIndex: number) => (
                <li key={stackIndex} className={classes.skillItem}>
                  <i className={`${classes.icon} bx bx-sm bxl-${(skill.icon || skill).toLowerCase()}`}></i>
                  <p className={classes.skillName}>{skill.name || skill}</p>
                </li>
              ))}

            </ul> */}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
