
import classes from './Navigation.module.css';
import footerClasses from '../Footer/Footer.module.css';
import { useDispatch } from 'react-redux';
import { expandTerminal as expandTerminalAction } from '../../store/terminalSlice';

const Navigation: React.FC = (props) => {

  const dispatch = useDispatch();

  return (
    <nav tabIndex={0} id='navigation'>
      <ul className={classes.nav_links}>

        <li className={classes.nav_item}>
          <a href="#about">about me</a>
        </li>

        <li className={classes.nav_item}>
          <a href="#myskills">my skills</a>
        </li>

        <li className={classes.nav_item}>
          <a href="#portfolio">portfolio</a>
        </li>

        <li className={classes.nav_item}>
          <a onClick={() => dispatch(expandTerminalAction())}>contact</a>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;


