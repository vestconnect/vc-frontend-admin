import styled from 'styled-components';

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

export const TableButton = styled.a`
  display: flex;
  flex: 1;
  justify-content: center;

  text-decoration: none;

  border: 1px solid #008F00;
  border-radius: 5px;

  margin-right: 5px;

  max-width: 150px;

  &:last-child {
    margin-right: 0px;
  }

  background: #008F00;
  font-size: 13px;
  color: #FFF;
  text-align: center;

  padding: 10px;
`;

export const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 5px;
    background-position: center;
    background-size: contain;
`;

export const AvatarColumnTh = styled.th`
  width: 10%!important;
  text-align: center;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const AvatarColumnTd = styled.td`
  width: 10%!important;
  text-align: center;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const TitleColumnTh = styled.th`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;
  }
`;

export const TitleColumnTd = styled.td`
  width: 30%!important;
  text-align: left;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;
  }
`;

export const DescriptionColumnTh = styled.th`
  width: 35%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const DescriptionColumnTd = styled.td`
  width: 35%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const ActionColumnTh = styled.th`
  width: 20%!important;
  text-align: center!important;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;
  }
`;

export const ActionColumnTd = styled.td`
  width: 20%!important;
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