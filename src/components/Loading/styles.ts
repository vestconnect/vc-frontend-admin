import styled from 'styled-components';

interface LoadingProps {
    color?: string;
}

export const Loading = styled.div<LoadingProps>`
    width: 25px;
    height: 25px;
    border: 2px solid transparent;
    border-top-color: #0E0E0E;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    ${props => props.color && `border-top-color: ${props.color}`};

    @keyframes spin {
        to {
            transform: rotate(360deg)
        }
    }
`;