import React from 'react';
import Link from 'gatsby-link';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop'
import PropTypes from 'prop-types';

import Fullscreen from '../components/fullscreen';
import Meta from '../components/meta';
import Wrapper from '../components/wrapper';

import styles from './styles.module.css';

class Index extends React.Component {

  render() {

    return (
      <div>

        <Fullscreen className={styles.intro} firstItem>
          <Wrapper>
            <h1>
              <br />
              I am a Product Designer,
              <br />
              I design 
              <TypistLoop interval={3000}>
                {[
                  'Products for your Enterprises.',
                  'UX for your Web and Mobile.',
                  'Visual for your Brand.',
                ].map(text => <Typist key={text} startDelay={2000} className={styles.highlight}><span>{text}</span></Typist>)}
              </TypistLoop>
              <br />
              <br />
              <br />
            </h1>
            <h3>Check out my <Link className={styles.link} to="/work">work</Link>.</h3>
            
          </Wrapper>
        </Fullscreen>
      </div>
    );
  }
}

export default Index;
