import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 5px;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 5px;

    a {
        svg {
            margin-left: 10px;
        }
    }
`;