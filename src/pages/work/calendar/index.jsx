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
    { src: require('./img/calendar.png'), description: 'Agile Calendar' },
  ],
};

const calendar = ({ location }) => {
  const project = projects.find(p => p.slug === 'calendar');

  return (
    <ProjectPage project={project} location={location}>
      <ProjectIntro project={project} />
      
      <Wrapper>
        <Carousel images={images.desktop} />
      </Wrapper>
    </ProjectPage>
  );
};

export default calendar;
