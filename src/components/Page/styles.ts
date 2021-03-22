import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import logoVc from '../../assets/images/logoVcBlack.png';

import { shade } from 'polished';

interface ContainerMenuItemProps {
  $activeMenu?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const ContainerSideBar = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  
  max-width: 250px;
  min-width: 250px;

  height: 100vh;
  min-height: 100%;

  padding: 20px 20px;

  border-right: 0.5px solid green;
  box-shadow: 1px 0px 5px 0px green;
  -webkit-box-shadow: 1px 0px 5px 0px green;

  @media(max-width: 414px) {
    max-width: 130px;
    min-width: 130px;
    padding: 10px 10px;
  }
`;

export const LogoSideBar = styled.div`
  display: flex;
  flex: 1;
  width: 100%;

  align-items: center;
  justify-content: center;

  max-height: 200px;
  flex-direction: column;

  @media(max-width: 414px) {
    max-height: 150px;
  }
`;

export const MenuSideBar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  
  padding: 20px 0px;
  
  align-items: center;
`;

export const Logo = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;

  background: url(${logoVc}) no-repeat center center;
  background-size: contain;

  @media(max-width: 414px) {
    width: 80px;
    height: 80px;
  }
`;

export const CompanyName = styled.span`
  margin-top: 5px;
  font-size: 20px;

  @media(max-width: 414px) {
    font-size: 15px;
  }
`;

export const ContainerMenuSignOut = styled.button`
  display: flex;
  width: 100%;
  height: 50px;
  background: transparent;
  
  margin-top: 20px;

  border: 1px solid green;
  border-radius: 10px;

  transition: color 0.2s;
  transition: border-color 0.2s;
  transition: background-color 0.2s;

  text-decoration: none;

  &:hover {
    border-color: #E0E0E0;
    background-color: #E0E0E0;
    color: ${shade(0.2, 'green')};

    div, svg {
      color: ${shade(0.2, 'green')};
    }
  }

  @media(max-width: 320px) {
    margin-top: 10px;
    height: 40px;
  }
`;

export const ContainerMenuItem = styled(Link) <ContainerMenuItemProps>`
  display: flex;
  width: 100%;
  height: 50px;
  
  margin-top: 20px;

  border: 1px solid green;
  border-radius: 10px;

  transition: color 0.2s;
  transition: border-color 0.2s;
  transition: background-color 0.2s;

  text-decoration: none;

  ${(props) =>
    props.$activeMenu &&
    css`
        border-color: #E0E0E0;
        background-color: #E0E0E0;
        color: ${shade(0.2, 'green')};

        div, svg {
          color: ${shade(0.2, 'green')};
        }
      `
  }

  &:hover {
    border-color: #E0E0E0;
    background-color: #E0E0E0;
    color: ${shade(0.2, 'green')};

    div, svg {
      color: ${shade(0.2, 'green')};
    }
  }

  @media(max-width: 320px) {
    margin-top: 10px;
    height: 40px;
  }
`;

export const MenuIcon = styled.div`
  display: flex;
  width: 70%;
  height: 100%;

  align-items: center;
  justify-content: center;

  transition: color 0.2s;

  @media(max-width: 414px) {
    width: 100%;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  color: #E0E0E0;
  
  align-items: center;

  transition: color 0.2s;
  font-weight: 500;
  font-size: 15px;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const Line = styled.hr`
    width: 100%;
    height: 1px;
    color: green;
    border: 1px solid green;
    margin-top: 20px;
`;

export const Powered = styled.span`
  position: relative;
  bottom: 20px;
  font-size: 10px;
  text-align: center;

  @media(max-width: 414px) {
    bottom: 5px;
  }

  @media(max-height: 768px) {
    bottom: 10px;
  }
`;

export const ContainerContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  
  width: 100%;
  height: 100px;

  font-size: 20px;

  padding: 30px;

  @media(max-width: 414px) {
    font-size: 15px;
  }
`;

export const ContainerDetail = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 0px 30px;

  overflow-y: auto;

  &::-webkit-scrollbar {
      width: 0.1em;
  }

  &::-webkit-scrollbar-thumb {
      background-color: #CCC;
      outline: 1px solid #CCC;
  }

  @media(max-width: 414px) {
    padding: 10px 30px;
  }
`;