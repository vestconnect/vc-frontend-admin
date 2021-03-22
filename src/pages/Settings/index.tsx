import React from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';

import programming from '../../assets/icons/programming.png';

const Container = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const Providers: React.FC = () => {
  return (
    <Page header="MINHA CONTA">
      <Container>
        <img src={programming} alt="No records" width={60} height={60} style={{ marginBottom: 10 }} />
        <span>Em desenvolvimento</span>
      </Container>

    </Page>
  );
}

export default Providers;