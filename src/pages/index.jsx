import React from 'react';
import Link from 'gatsby-link';

import Fullscreen from '../components/fullscreen';
import Meta from '../components/meta';
import Wrapper from '../components/wrapper';

import styles from './styles.module.css';

const Index = ({ location }) => (
  <div>
    <Meta location={location} />
    <Fullscreen className={styles.intro} firstItem>
      <Wrapper>
        <h1>
          <br />
          I am a Product Designer,
          <br />
          I design:
          <br />
          System Products for Enterprises.
          <br />
          <br />
          <br />
          <h3>Check out my <Link className={styles.link} to="/work">work</Link>.</h3>
        </h1>
      </Wrapper>
    </Fullscreen>
  </div>
);

export default Index;
