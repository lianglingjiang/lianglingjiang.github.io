import React from 'react';
import Link from 'gatsby-link';

import ContentPage from '../../components/content-page';
import Meta from '../../components/meta';
import OutboundLink from '../../components/outbound-link';
import Wrapper from '../../components/wrapper';
import Avatar from '../../components/avatar';


import styles from './styles.module.css';

const About = ({ location }) => (
  <ContentPage>
    <Meta title="About" location={location} />
    <Wrapper>
      <div className={styles.about}>
        <section className={styles.addinfo}>
          <Avatar className={styles.avatar} />
          <h2>梁凌江</h2>
          <h5>Liang Lingjiang</h5>
        </section>
        <section className={styles.intro}>
          <h1>Hello World.</h1>
          <p>I’m a Product Designer/Product Manager from China. I've been work for Internet Industry for years. I design Apps for both Web and Mobile.</p>
          <p>I first began my journey into Product Design as Web Designer from 2002. Witnessed the changes of www and mobile industry over a decade. During years of design pactices, I came across designning many kinds of application and gained a considerable amount of experience of the industry.</p>
          <p>I also interest in full-stack web dev, the <a href="https://jamstack.org/" target="_blank">Future Web Applications</a> solutions, best practices and other cutting edge field such as Deep-Learning and AI. </p>
          <p>I am currently work as a Product Designer/Product Manager in <a href="http://tech.pingan.com" target="_blank">PingAn</a>. This works shown in this site are perosonal <bold>side projects only</bold>.</p>
        </section>
      </div>

    </Wrapper>
  </ContentPage>
);

export default About;
