import classes from "./ExperienceTimeline.module.css";
import experienceData from "../../../data/index.json";
// import DesktopExperience from "./DesktopExperience";
// import MobileExperience from "./MobileExperience";

export default function ExperienceTimeline() {
  const data = experienceData.experience;
  return (
    <div className={classes.timelineContainer}>
      <div className={classes.timeline}>
        <div className={classes.timelineHeader}>
          {data.map((index: any) => (
            <div key={index} className={classes.timelineNode}>
              <div className={classes.iconContainer}>
                <i className="bx bx-briefcase"></i>
              </div>
            </div>
          ))}
          <div className={classes.timelineArrow}>›</div>
        </div>

        <div className={classes.timelineContent}>
          {data.map((exp: any, index: any) => (
            <div key={index} className={classes.timelineItem}>
              <h3 className={classes.institution}>{exp.company}</h3>
              <p className={classes.title}>{exp.title}</p>
              <p className={classes.date}>{exp.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
