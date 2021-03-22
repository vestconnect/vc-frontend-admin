import styled, { css } from 'styled-components';

interface ITableButtonProps {
  isInactive?: boolean;
}

export const NameColumnTh = styled.th`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;
  }
`;

export const EmailColumnTh = styled.th`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const ActiveColumnTh = styled.th`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const ActionColumnTh = styled.th`
  width: 10%!important;
  text-align: center!important;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;
  }
`;

export const NameColumnTd = styled.td`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;

    border-radius: 5px 0 0 5px!important;
    -webkit-border-radius: 5px 0 0 5px!important;
  }
`;

export const EmailColumnTd = styled.td`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const ActiveColumnTd = styled.td`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const ActionColumnTd = styled.td`
  width: 10%!important;
  text-align: center!important;

  div {
    display: flex;
    justify-content: center;
  }

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;
  }
`;

export const TableButton = styled.button<ITableButtonProps>`
  display: flex;
  flex: 1;
  justify-content: center;

  border: 1px solid #008F00;
  border-radius: 5px;

  margin-right: 5px;

  &:last-child {
    margin-right: 0px;
  }

  background: #008F00;
  font-size: 13px;
  color: #FFF;
  text-align: center;

  padding: 10px;

  ${props => props.isInactive && css`
    background: #DF4401;
    border-color: #DF4401;
  `}

  @media(max-width: 414px) {
    ${props => !props.isInactive && css`
      display: none;
    `}
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;

  & > div {
    margin-bottom: 10px;
  }

  & > span {
    text-align: center;

    @media(max-width: 414px) {
      font-size: 12px;
    }
  }
`;