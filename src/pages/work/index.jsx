import React from 'react';
import Meta from '../../components/meta';
import Contact from '../../components/contact';
import { ProjectPanel } from '../../components/project';
import Wrapper from '../../components/wrapper';

import projects from '../../data/projects';

import styles from './styles.module.css';

const Work = ({ location }) => (
  <div className={styles.mainWrapper}>
    <Meta title="Work" description="Design by Liang Lingjiang" location={location} />
    <h1 className={styles.worksTitle}>2017</h1>
    <Wrapper className={styles.profolio}>
      
      {projects.map(project => <ProjectPanel project={project} key={project.slug} />)}

    </Wrapper>
  </div>
);

export default Work;
