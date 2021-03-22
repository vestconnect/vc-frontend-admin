import styled from 'styled-components';

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

export const NameColumnTh = styled.th`
  width: 25%!important;
  text-align: left;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;
  }
`;

export const EmailColumnTh = styled.th`
  width: 25%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const BirthColumnTh = styled.th`
  width: 25%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const ActiveColumnTh = styled.th`
  width: 15%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const AvatarColumnTd = styled.td`
  width: 10%!important;
  text-align: center;
  border: none;
`;

export const NameColumnTd = styled.td`
  width: 25%!important;
  text-align: left;

  @media(max-width: 414px) {
    width: 50%!important;
    font-size: 12px;

    border-radius: 0px 5px 5px 0px!important;
    -webkit-border-radius: 0px 5px 5px 0px!important;
  }
`;

export const EmailColumnTd = styled.td`
  width: 25%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const BirthColumnTd = styled.td`
  width: 25%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
  }
`;

export const ActiveColumnTd = styled.td`
  width: 15%!important;
  text-align: left;

  @media(max-width: 414px) {
    display: none;
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