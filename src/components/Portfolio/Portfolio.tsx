import { useEffect } from "react";

import classes from './Portfolio.module.css';
import Card from './Card/Card';
import DATA from '../../data/index.json';

export type portfolioProject = {
  id: string;
  src: string;
  title: string;
  description: string;
  link: string;
  technologics: string[];
};

const Portfolio: React.FC = (props) => {

  useEffect(() => {
    const items = document.querySelectorAll('#card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      rootMargin: '0% 0% -10% 0%',
      threshold: 0.5
    });

    items.forEach(item => {
      observer.observe(item);
    });


  }, []);

  const sortedPortfolio: portfolioProject[] = DATA?.portfolio?.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <section tabIndex={0} id="portfolio" className={classes.portfolio}>
      <ul className={classes.projectList}>
        {sortedPortfolio.map((project: portfolioProject, index: number) =>
          <Card key={index} item={project} />
        )}
      </ul>
    </section>
  );
};


export default Portfolio;
