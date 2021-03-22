import React, { useCallback } from 'react';
import {
  FiHome,
  FiUsers,
  FiLogOut,
  FiSettings,
  FiHeart,
  FiAward
} from 'react-icons/fi';
import { useLocation } from 'react-router';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ContainerSideBar,
  LogoSideBar,
  Logo,
  CompanyName,
  MenuSideBar,
  ContainerMenuItem,
  MenuIcon,
  MenuItem,
  Line,
  Powered,
  ContainerContent,
  ContainerHeader,
  ContainerDetail,
  ContainerMenuSignOut
} from './styles';

interface PageProps {
  header?: string;
}

const Page: React.FC<PageProps> = ({ header, children }) => {
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <ContainerSideBar>
        <LogoSideBar>
          <Logo />

          <CompanyName>VestConnect</CompanyName>
        </LogoSideBar>

        <MenuSideBar>
          <ContainerMenuItem to="/home" $activeMenu={pathname === '/home'}>
            <MenuIcon>
              <FiHome size={20} color="green" />
            </MenuIcon>
            <MenuItem>Home</MenuItem>
          </ContainerMenuItem>
          <ContainerMenuItem to="/providers" $activeMenu={pathname === '/providers'}>
            <MenuIcon>
              <FiHeart size={20} color="green" />
            </MenuIcon>
            <MenuItem>Fornecedores</MenuItem>
          </ContainerMenuItem>
          <ContainerMenuItem to="/users" $activeMenu={pathname === '/users'}>
            <MenuIcon>
              <FiUsers size={20} color="green" />
            </MenuIcon>
            <MenuItem>Usuários</MenuItem>
          </ContainerMenuItem>
          <ContainerMenuItem to="/administrators" $activeMenu={pathname === '/administrators'}>
            <MenuIcon>
              <FiAward size={20} color="green" />
            </MenuIcon>
            <MenuItem>Administradores</MenuItem>
          </ContainerMenuItem>

          <Line />

          <ContainerMenuItem to="/settings" $activeMenu={pathname === '/settings'}>
            <MenuIcon>
              <FiSettings size={20} color="green" />
            </MenuIcon>
            <MenuItem>Minha conta</MenuItem>
          </ContainerMenuItem>

          <ContainerMenuSignOut onClick={handleSignOut}>
            <MenuIcon>
              <FiLogOut size={20} color="green" />
            </MenuIcon>
            <MenuItem>Sair</MenuItem>
          </ContainerMenuSignOut>
        </MenuSideBar>

        <Powered>Powered by VestConnect@{new Date().getFullYear()}</Powered>
      </ContainerSideBar>

      <ContainerContent>
        <ContainerHeader>
          {header ? header : 'BEM-VINDO ADMIN'}
        </ContainerHeader>

        <ContainerDetail>
          {children}
        </ContainerDetail>
      </ContainerContent>
    </Container>
  )
}

export default Page;