import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingPage = () => {
    return (
        <MainContainer>
            <ReactLoading type='spinningBubbles' color='#2196F3' height={100} width={100} />
        </MainContainer>
    );
};

export default LoadingPage;
