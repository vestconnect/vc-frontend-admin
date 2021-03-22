import styled, { css, keyframes } from 'styled-components';
import Button from '../Button';

interface IContainerProps {
  openModal: boolean;
}

const apperFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateY(-100px)
    }

    to {
        opacity: 1;
        transform: translateY(0px)
    }
`;

export const Container = styled.div<IContainerProps>`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);

  ${props =>
    props.openModal &&
    css`
        display: flex;
        align-items: center;
        justify-content: center;
      `
  }
`;

export const ContentContainer = styled.div`
  background-color: #1F1F1F;
  
  border: 1px solid #003D00;
  width: 650px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${apperFromLeft} 0.3s;

  @media(max-height: 786px) {
    max-height: 500px;
    overflow-y: auto;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex: 0.2;

  align-items: flex-start;

  padding: 20px;

  width: 100%;

  border-bottom: 1px solid #003D00;

  button {
    align-self: center;
  }
`;

export const ContainerDetail = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;
  align-items: center;

  padding: 20px;

  width: 100%;
`;

export const ContainerFooter = styled.div`
  display: flex;
  flex: 0.2;
  
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid #003D00;

  padding: 10px 20px;

  width: 100%;

  button {
    align-self: center;
  }
`;

export const TextHeader = styled.h3`
  text-transform: uppercase;
`;

export const ButtonModal = styled(Button)`
  max-width: 100px;
  border-radius: 5px;

  margin-bottom: 0px;

  ${props => props.isTransparent && css`
    transition: all 0.2s;
    
    &:hover{
      background: green;
      color: #FFF;
    }
  `}
`;