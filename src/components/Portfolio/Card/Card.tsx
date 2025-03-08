import classes from "./Card.module.css";
import { portfolioProject } from "../Portfolio";

const Card: React.FC<{ item: portfolioProject }> = ({ item }) => {
  return (
    <div id="card" className={classes.card}>
      <div className={classes.image}>
        <img src={item.src} alt="" />
      </div>

      <div className={classes.cardContent}>
        <p className={classes.name}>
          Customer: <span className={classes.fields}>{item.title}</span>
        </p>
        <p className={classes.technologics}>
          Technologics:{" "}
          <span className={classes.fields}>
            {item.technologics.map((tech, index) => (
              <span className={classes.tech} key={index}>
                {tech}&nbsp;&nbsp;
              </span>
            ))}
          </span>
        </p>
        <p className={classes.description}>
          Description:{" "}
          <span className={classes.fields}>
            {item.description.length > 122
              ? `${item.description.substring(0, 119)}...`
              : item.description}
          </span>
        </p>
        <p className={classes.link}>
          Link:{" "}
          <span className={classes.fields}>
            <a
              rel="noreferrer"
              target="_blank"
              href={"https://" + item.link}
              className={classes.aLink}
            >
              {item.link.length > 50
                ? `${item.link.substring(0, 47)}...`
                : item.link}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
