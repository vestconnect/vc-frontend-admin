import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface ContainerProps {
    background: string;
}

export const Content = styled.div`
    display: flex;
    flex-direction: column;

    & > a {
        max-width: 130px;
        color: #FFF;
        text-decoration: none;
        font-size: 10px;
        margin-bottom: 10px;
    }
`;

export const Container = styled.div<ContainerProps>`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    min-height: 250px;
    background: ${props => `url(${props.background}) no-repeat`};
    background-size: cover;
    background-position: top;
    justify-content: flex-end;
    padding: 0 20px;
`;

export const ContainerPropsPhoto = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    flex-direction: column;

    span {
        font-size: 12px;
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const LinkContent = styled(Link)`
    text-decoration: none;
    color: #FFF;
`;