import React from 'react';
import Link from 'gatsby-link';

import ContentPage from '../components/content-page';
import Meta from '../components/meta';
import Wrapper from '../components/wrapper';


const FourOhFour = ({ location }) => (
  <ContentPage>
    <Meta title="404" description="Page not found." noIndex location={location} />
    <Wrapper>
      <h1>Oops.</h1>
      <p>Page not found at the this time. Did you want to view <Link to="/work">my work</Link>?</p>
    </Wrapper>
  </ContentPage>
);

export default FourOhFour;
