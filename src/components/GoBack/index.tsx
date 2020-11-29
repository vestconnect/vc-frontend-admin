import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import {
    ContainerGoBack,
    ButtonGoBack
} from './styles';

interface IGoBackProps {
    path: string;
}

const GoBack: React.FC<IGoBackProps> = ({ path, children }) => {
    return (
        <ContainerGoBack>
            <ButtonGoBack to={path}>
                <FiArrowLeft color="#FFF" />
            </ButtonGoBack>
            {children}
        </ContainerGoBack>
    );
}

export default GoBack;