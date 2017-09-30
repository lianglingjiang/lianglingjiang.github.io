import React from 'react';
import Link from 'gatsby-link';
import classNames from 'classnames';

import Wrapper from '../../wrapper';

import themeStyles from '../themes.module.css';
import styles from './styles.module.css';

const ProjectPanel = ({ project }) => (
  <Link
    to={`/work/${project.slug}`}
    className={classNames(styles.panel, themeStyles[project.theme.light ? 'light' : 'dark'], styles[project.className])}
    style={{ background: `${project.theme.background}` }}
  >
    
    <div className={styles.inner} style={{ backgroundImage: `url(${project.cover})` }}></div>
    <div className={styles.content}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  </Link>
);

export default ProjectPanel;
