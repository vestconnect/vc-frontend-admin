import styled, { css } from 'styled-components';

interface IButtonProps {
    isTransparent?: boolean;
}

export const Container = styled.button<IButtonProps>`
    background: #FFF;
    border: 1px solid green;
    min-height: 45px;
    width: 100%;
    padding: 0px 10px;
    color: #0E0E0E;
    font-weight: 500;
    
    font-size: 15px;
    margin-bottom: 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: color 0.2s;
    transition: background 0.2s;

    &:hover {
        color: white;
        background: green;
    }

    ${props => props.isTransparent && css`
        background: transparent;
        color: white;
        transition: color 0.2s;

        &:hover {
            color: green;
            background: transparent;
        }
    `}
`;