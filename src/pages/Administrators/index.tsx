import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import noRecords from '../../assets/icons/noRecords.png';
import Loading from '../../components/Loading';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import {
  FiUser,
  FiMail,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

import {
  NameColumnTh,
  EmailColumnTh,
  ActiveColumnTh,
  ActionColumnTh,
  NameColumnTd,
  EmailColumnTd,
  ActiveColumnTd,
  ActionColumnTd,
  TableButton,
  ContainerLoading
} from './styles';

interface IUsers {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

interface IResponse {
  total: number;
  total_pages: number;
  users: Array<IUsers>;
}

const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { addToast } = useToast();

  const loadUsers = async (page: number) => {
    const response: AxiosResponse<IResponse> = await api.get(`/users/admin?page=${page}`);

    setUsers(response.data.users);
    setTotalPages(response.data.total_pages);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const handleInactiveProvider = async (id: string) => {
    try {
      await api.patch(`users/${id}/active`);

      const indexListUser = users.findIndex(provider => {
        return provider.id === id;
      });

      if (indexListUser !== -1) {
        users[indexListUser] = { ...users[indexListUser], active: !users[indexListUser].active }

        setUsers([...users]);
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

  return (
    <Page header="ADMINISTRADORES">
      {
        loading
          ?
          <ContainerLoading>
            <Loading color="white" />
            <span>Carregando administradores...</span>
          </ContainerLoading>
          : !users.length
            ?
            <ContainerLoading>
              <img src={noRecords} alt="No records" width={60} height={60} style={{ marginBottom: 10 }} />
              <span style={{ marginBottom: 0 }}>Nenhum administrador cadastrado</span>
            </ContainerLoading>
            :
            <>
              <Table>
                <thead>
                  <tr>
                    <NameColumnTh>Nome</NameColumnTh>
                    <EmailColumnTh>E-mail</EmailColumnTh>
                    <ActiveColumnTh>Status</ActiveColumnTh>
                    <ActionColumnTh>Ações</ActionColumnTh>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    return (
                      <tr key={user.id}>
                        <NameColumnTd><div><FiUser size={20} />{user.name}</div></NameColumnTd>
                        <EmailColumnTd><div><FiMail size={20} />{user.email}</div></EmailColumnTd>
                        <ActiveColumnTd>
                          <div>
                            {user.active
                              ? <FiCheckCircle color="#00CC00" size={20} />
                              : <FiAlertCircle color="#DF4401" size={25} />}
                            {user.active
                              ? 'Ativo'
                              : 'Inativo'}
                          </div>
                        </ActiveColumnTd>
                        <ActionColumnTd>
                          <div>
                            <TableButton
                              isInactive={true}
                              onClick={() => {
                                handleInactiveProvider(user.id)
                              }}
                            >
                              {user.active
                                ? <FiAlertCircle color="yellow" size={15} />
                                : <FiCheckCircle color="#00CC00" size={15} />}
                              {user.active
                                ? 'Inativar'
                                : 'Ativar'}
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

export default Users;