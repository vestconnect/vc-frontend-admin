import styled from 'styled-components';

export const ContainerAvatar = styled.div`
    width: 80px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
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
        bottom: -10px;
        right: -10px;
        color: white;
        cursor: pointer;
    }
`;

export const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    background-position: center;
    background-size: contain;
`;