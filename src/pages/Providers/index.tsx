import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../components/Page';
import {
  FiMail,
  FiUser,
  FiStar,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit,
  FiShoppingBag
} from 'react-icons/fi';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import RegisterProvider from './Register';
import EditProvider from './Edit';
import api from '../../services/api';
import noRecords from '../../assets/icons/noRecords.png';
import { useToast } from '../../hooks/toast';
import { AxiosResponse } from 'axios';
import {
  AvatarColumnTh,
  NameColumnTh,
  EmailColumnTh,
  NickNameColumnTh,
  ActionColumnTh,
  AvatarColumnTd,
  NameColumnTd,
  EmailColumnTd,
  NickNameColumnTd,
  ActionColumnTd,
  TableButton,
  ContainerLoading,
  ButtonProvider,
  ActiveColumnTd,
  ActiveColumnTh,
  Avatar
} from './styles';

interface IProvidersProps {
  id: string;
  name: string;
  email: string;
  nickname: string;
  avatar_url: string;
  active: boolean;
}

interface IReturnProviders {
  users: IProvidersProps[];
  total: number;
  total_pages: number;
}

const Providers: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<IProvidersProps[]>([]);
  const [currentProvider, setCurrentProvider] = useState<IProvidersProps>({} as IProvidersProps);
  const [registerProvider, setRegisterProvider] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const { addToast } = useToast();

  const loadProviders = useCallback(async (page: number) => {
    const response: AxiosResponse<IReturnProviders> = await api.get(`/users/providers?page=${page}`);

    setProviders(response.data.users);
    setTotalPages(response.data.total_pages);

    setLoading(false);
  }, []);

  useEffect(() => {
    loadProviders(currentPage);
  }, [loadProviders, currentPage]);

  const handleShowProvider = useCallback((provider: IProvidersProps) => {
    setOpenModal(true);
    setCurrentProvider(provider);
  }, []);

  const handleInactiveProvider = async (id: string) => {
    try {
      await api.patch(`users/${id}/active`);

      const indexListProvider = providers.findIndex(provider => {
        return provider.id === id;
      });

      if (indexListProvider !== -1) {
        providers[indexListProvider] = { ...providers[indexListProvider], active: !providers[indexListProvider].active }

        setProviders([...providers]);
      }

      addToast({
        title: 'Alteração feita',
        description: 'A alteração foi feita com sucesso',
        type: 'success'
      });
    } catch (e) {
      addToast({
        title: 'Alteração não concluída',
        description: 'A alteração não foi concluída. Tente novamente',
        type: 'error'
      });
    }
  }

  const handleFinishRegister = useCallback(async () => {
    await loadProviders(currentPage);
    setRegisterProvider(false);
  }, [loadProviders, currentPage]);

  const handleCloseModal = useCallback(async () => {
    setOpenModal(false);
  }, []);

  const handleSaveModal = useCallback(async () => {
    setLoading(true);
    setOpenModal(false);
    await loadProviders(currentPage);
  }, [loadProviders, currentPage]);

  return (
    <Page header={`${registerProvider ? 'CADASTRO DE FORNECEDOR' : 'FORNECEDORES'}`}>
      {registerProvider ?
        <RegisterProvider
          onFinishRegister={handleFinishRegister}
          onCancelRegister={() => setRegisterProvider(false)}
        />
        : loading ?
          <ContainerLoading>
            <Loading color="white" />
            <span>Carregando seus fornecedores...</span>
          </ContainerLoading>
          : !providers.length ?
            <ContainerLoading>
              <img src={noRecords} alt="No records" width={60} height={60} style={{ marginBottom: 10 }} />
              <span style={{ marginBottom: 0 }}>Nenhum fornecedor encontrado.<br />Que tal cadastrar seu primeiro fornecedor?</span>

              <ButtonProvider onClick={() => { setRegisterProvider(true) }}>Cadastrar fornecedor</ButtonProvider>
            </ContainerLoading>
            :
            <>
              <EditProvider
                openModal={openModal}
                currentProvider={currentProvider}
                onCloseModal={handleCloseModal}
                onSaveModal={handleSaveModal}
              />
              <Button style={{ maxWidth: 200 }} onClick={() => { setRegisterProvider(true) }}>Cadastrar fornecedor</Button>
              <Table>
                <thead>
                  <tr>
                    <AvatarColumnTh></AvatarColumnTh>
                    <NameColumnTh>Nome</NameColumnTh>
                    <EmailColumnTh>E-mail</EmailColumnTh>
                    <NickNameColumnTh>Apelido</NickNameColumnTh>
                    <ActiveColumnTh>Status</ActiveColumnTh>
                    <ActionColumnTh>Ações</ActionColumnTh>
                  </tr>
                </thead>
                <tbody>
                  {providers.map(provider => {
                    return (
                      <tr key={provider.id}>
                        <AvatarColumnTd><Avatar src={provider.avatar_url} /></AvatarColumnTd>
                        <NameColumnTd><div><FiUser size={20} />{provider.name}</div></NameColumnTd>
                        <EmailColumnTd><div><FiMail size={20} />{provider.email}</div></EmailColumnTd>
                        <NickNameColumnTd><div><FiStar color="yellow" size={20} />{provider.nickname}</div></NickNameColumnTd>
                        <ActiveColumnTd><div>{provider.active ? <FiCheckCircle color="#00CC00" size={20} /> : <FiAlertCircle color="#DF4401" size={20} />}{provider.active ? 'Ativo' : 'Inativo'}</div></ActiveColumnTd>
                        <ActionColumnTd>
                          <div>
                            <TableButton onClick={() => handleShowProvider(provider)}>
                              <FiEdit size={15} color="#FFF" /> Editar
                            </TableButton>
                            <TableButton
                              isInactive={true}
                              onClick={() => {
                                handleInactiveProvider(provider.id)
                              }}
                            >
                              {provider.active
                                ? <FiAlertCircle color="yellow" size={15} />
                                : <FiCheckCircle color="#00CC00" size={15} />}
                              {provider.active
                                ? 'Inativar'
                                : 'Ativar'}
                            </TableButton>
                            <TableButton onClick={() => history.push(`/provider/products/${provider.id}`)}>
                              <FiShoppingBag size={15} color="#FFF" /> Produtos
                            </TableButton>
                          </div>

                        </ActionColumnTd>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </>
      }
    </Page>
  );
}

export default Providers;