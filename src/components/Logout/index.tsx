import React, { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';
import { FiPower } from 'react-icons/fi';
import {
    ContainerLogout,
    ButtonLogout
} from './styles';

const Logout: React.FC = ({ children }) => {
    const { signOut } = useAuth();

    const handleSignOut = useCallback(() => {
        signOut();
    }, [signOut]);

    return (
        <ContainerLogout>
            {children}
            <ButtonLogout onClick={handleSignOut}>
                <FiPower color="#FFF" />
            </ButtonLogout>
        </ContainerLogout>
    );
}

export default Logout;