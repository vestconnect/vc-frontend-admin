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
`;

export const AvatarColumnTd = styled.td`
  width: 10%!important;
  text-align: center;
`;

export const NameColumnTh = styled.th`
  width: 90%!important;
  text-align: left;
`;

export const NameColumnTd = styled.td`
  width: 90%!important;
  text-align: left;
`;