import styled, { css } from 'styled-components';
import { FiHeart, FiUsers, FiShoppingBag, FiCamera, FiVideo, FiFolder } from 'react-icons/fi';
import { shade } from 'polished';

interface CardProps {
  $loading: boolean;
}

export const ContainerCard = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 30px;
  margin-bottom: 30px;

  & > div {
    margin-right: 25px;

    &:last-child {
      margin-right: 0px;
    }
  }

  @media(max-width: 414px) {
    flex-direction: column;
    margin-bottom: 0px;
    margin-top: 0px;
  }
`;

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100px;

  border: 1px solid green;
  border-radius: 10px;

  padding: 10px;

  -webkit-box-shadow: 0px 0px 5px 5px rgba(0,94,12,0.59); 
  box-shadow: 0px 0px 5px 5px rgba(0,94,12,0.59);

  transition: color 0.2s;
  transition: border-color 0.2s;
  transition: background-color 0.2s;

  ${(props) =>
    props.$loading &&
    css`
        justify-content: center;
        align-items: center;
      `
  }

  @media(max-width: 414px) {
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  &:hover {
    border-color: #E0E0E0;
    background-color: #E0E0E0;
    color: ${shade(0.2, 'green')};
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

export const IconHeart = styled(FiHeart)`
  margin-bottom: 10px;
`;

export const IconFolder = styled(FiFolder)`
  margin-bottom: 10px;
`;

export const IconCamera = styled(FiCamera)`
  margin-bottom: 10px;
`;

export const IconVideo = styled(FiVideo)`
  margin-bottom: 10px;
`;

export const IconAward = styled(FiUsers)`
  margin-bottom: 10px;
`;

export const IconShoppingBag = styled(FiShoppingBag)`
  margin-bottom: 10px;
`;

export const CardHeader = styled.span`
  font-size: 15px;
  margin-bottom: 10px;

  @media(max-width: 414px) {
    font-size: 12px;
  }
`;

export const CardDetail = styled.span`
  font-size: 12px;

  @media(max-width: 414px) {
    font-size: 9px;
    text-align: center;
  }
`;