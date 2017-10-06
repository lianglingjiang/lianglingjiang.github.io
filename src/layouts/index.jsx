import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/header';
import MainScene from '../components/three';

import styles from './styles.module.css';
import '../css/reset.css';
import '../css/document.css';
import '../css/typography.css';


class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.func,
  }

  render() {
    const { children, location } = this.props;
    const appChildren = process.env.NODE_ENV === 'production' ? this.props.children({ location }) : children();

    return (
      <div> 
        <Header />
        <div className={styles.page}>{appChildren}</div>
        <MainScene />
      </div>
    );
  };
}

export default Layout;
