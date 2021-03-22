import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form as UnForm } from '@unform/web';

import background from '../../assets/images/backgroundPassword.jpg';
import logoVc from '../../assets/images/logoVcBlack.png';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;

  height: 100vh;
`;

export const ContainerLogin = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  
  padding: 30px;

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;

  background: url(${logoVc}) no-repeat center center;
  background-size: contain;
`;

export const Form = styled(UnForm)`
  display: flex;
  flex: 1;
  flex-direction: column;

  width: 100%;
  
  align-items: center;
  justify-content: center;

  max-width: 550px;

  button {
    margin-top: 10px;
  }
`;

export const Background = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background: url(${background}) no-repeat center;
  background-size: cover;

  @media(max-width: 480px) {
    display: none;
  }
`;

export const Forgot = styled(Link)`
    font-weight: 400;
    font-size: 16px;
    margin-top: 10px;
    
    text-align: center;

    text-decoration: none;
    color: #FFF;
`;

export const Title = styled.span`
    font-weight: 500;
    font-size: 20px;
`;

export const SubTitle = styled.span`
    font-weight: 400;
    font-size: 16px;
    margin-top: 10px;
    
    text-align: center;
`;

export const Powered = styled.span`
  position: relative;
  bottom: 20px;
  font-size: 10px;
  text-align: center;
`;