import React from 'react';
import projects from '../../../data/projects';

import Carousel from '../../../components/carousel';
import Iphone from '../../../components/iphone';
import Macbook from '../../../components/macbook';
import OutboundLink from '../../../components/outbound-link';
import Wrapper from '../../../components/wrapper';
import { ProjectDescription, ProjectIntro, ProjectPage } from '../../../components/project';

import styles from './styles.module.css';


const images = {
  desktop: [
    { src: require('./img/datadashboard.png'), description: 'Sells Dashboard' },
  ],
};

const sellsdashboard = ({ location }) => {
  const project = projects.find(p => p.slug === 'sellsdashboard');

  return (
    <ProjectPage project={project} location={location}>
      <ProjectIntro project={project} />
      
      <Wrapper>
        <Carousel images={images.desktop} />
      </Wrapper>
    </ProjectPage>
  );
};

export default sellsdashboard;
