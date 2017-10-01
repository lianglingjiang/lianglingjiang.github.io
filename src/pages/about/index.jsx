import React from 'react';
import Link from 'gatsby-link';

import ContentPage from '../../components/content-page';
import Meta from '../../components/meta';
import OutboundLink from '../../components/outbound-link';
import Wrapper from '../../components/wrapper';

import ahmSrc from './img/ahm.png';
import inlightSrc from './img/inlight.png';
import lighthouseSrc from './img/lighthouse.png';


import styles from './styles.module.css';

const About = ({ location }) => (
  <ContentPage>
    <Meta title="About" location={location} />
    <Wrapper>
      <div className={styles.about}>
        <section className={styles.intro}>
          <h1>Hello.</h1>
          <p>I’m a Product Designer/Product Manager from China. I've been work for Internet Industry for years. I design Apps for both Web and Mobile.</p>
          <p>I first began my journey into Product Design as Web Designer. I gained a considerable amount of experience that I needed to step into the industry.</p>

          <p>I now work as a Product Designer/Product Manager in PingAn Technology.</p>
        </section>
        <aside className={styles.skills}>
          <div>
            <h3>Skills</h3>
            <h4>Presentation</h4>
            <p>Bootstrap, Css, Html, Less, Postcss, Sass, Stylus</p>
            <h4>Javascript</h4>
            <p>Angular, Grunt, Gulp, jQuery, Pug, React, React Native, Redux, Webpack</p>
            <h4>Server</h4>
            <p>Express, Mongo, Node, SQL</p>
            <h4>Other</h4>
            <p>C, CI, Git, Svn, Unity 3D</p>
          </div>

        </aside>
      </div>

    </Wrapper>
  </ContentPage>
);

export default About;
