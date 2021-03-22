import React, { ButtonHTMLAttributes } from 'react';
import Loading from '../Loading';
import {
    Container
} from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    className?: string;
    isTransparent?: boolean;
}

const Button: React.FC<ButtonProps> = ({ isTransparent, className, loading, children, ...rest }) => (
    <Container type="button" {...rest} className={className} isTransparent={isTransparent}>
        {loading ? <Loading /> : children}
    </Container>
);

export default Button;