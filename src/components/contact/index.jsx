import React from 'react';

import Icon from '../icon';
import OutboundLink from '../outbound-link';

import styles from './styles.module.css';

const Contact = ({ title }) => (
  <div className={styles.contact}>
    <h1>{title || 'I like messages.'}</h1>
    <p className={styles.email}>
      Say hello and send an email:<br />
      <a href="mailto:lianglj@yahoo.com?subject=Hello%20Liang!" className={styles.link}>lianglj@yahoo.com</a>
    </p>
    <div className={styles.lineBreak} />
    <ul className={styles.social}>
      <li>
        <OutboundLink to="https://dribbble.com/lianglj">
          <Icon name="dribbble" />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink to="https://github.com/lianglingjiang/">
          <Icon name="github" />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink to="https://www.linkedin.com/in/lianglingjiang/">
          <Icon name="linkedin" />
        </OutboundLink>
      </li>
      <li>
        <OutboundLink to="https://www.instagram.com/lianglingjiang/">
          <Icon name="instagram" />
        </OutboundLink>
      </li>
    </ul>
  </div>
);

export default Contact;
