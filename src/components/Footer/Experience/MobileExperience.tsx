interface ExperienceProps {
  data: any;
  classes: any;
}

export default function MobileExperience({ data, classes }: ExperienceProps) {
  return (
    <>
      {data.map((exp: any, index: any) => (
        <div key={index} className={classes.timlineSmall}>
          <i className="bx bx-briefcase"></i>
          <h3 className={classes.institution}>{exp.company}</h3>
          <p className={classes.title}>{exp.title}</p>
          <p className={classes.date}>{exp.date}</p>
        </div>
      ))}
    </>
  );
}
