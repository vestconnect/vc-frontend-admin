import styled from 'styled-components';

export const ContainerAvatar = styled.div`
    width: 50px;
    min-height: 50px;
    display: flex;
    align-self: center;
    position: relative;
`;

export const InputFile = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
    & + label {
        position: absolute;
        bottom: -5px;
        right: -5px;
        color: white;
        cursor: pointer;
    }
`;

export const Avatar = styled.img`
    width: 100%;
    border-radius: 10px;
    background-position: center;
    background-size: contain;
`;