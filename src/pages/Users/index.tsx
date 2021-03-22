import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import api from '../../services/api';
import {
  FiUser,
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar
} from 'react-icons/fi';

import {
  Avatar,
  AvatarColumnTh,
  NameColumnTh,
  EmailColumnTh,
  BirthColumnTh,
  ActiveColumnTh,
  AvatarColumnTd,
  NameColumnTd,
  EmailColumnTd,
  BirthColumnTd,
  ActiveColumnTd
} from './styles';

interface IUsers {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  confirm_email: boolean;
  birth_user: string;
}

interface IResponse {
  total: number;
  total_pages: number;
  users: Array<IUsers>;
}

const Providers: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadUsers = async (page: number) => {
    const response: AxiosResponse<IResponse> = await api.get(`/users?page=${page}`);

    setUsers(response.data.users);
    setTotalPages(response.data.total_pages);
  }

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  return (
    <Page header="USUÁRIOS">
      <Table>
        <thead>
          <tr>
            <AvatarColumnTh></AvatarColumnTh>
            <NameColumnTh>Nome</NameColumnTh>
            <EmailColumnTh>E-mail</EmailColumnTh>
            <BirthColumnTh>Data de nascimento</BirthColumnTh>
            <ActiveColumnTh>Status</ActiveColumnTh>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <AvatarColumnTd><Avatar src={user.avatar_url} /></AvatarColumnTd>
                <NameColumnTd><div><FiUser size={20} />{user.name}</div></NameColumnTd>
                <EmailColumnTd><div><FiMail size={20} />{user.email}</div></EmailColumnTd>
                <BirthColumnTd><div><FiCalendar size={20} />{user.birth_user}</div></BirthColumnTd>
                <ActiveColumnTd><div>{user.confirm_email ? <FiCheckCircle color="#00CC00" size={20} /> : <FiAlertCircle color="#DF4401" size={25} />}{user.confirm_email ? 'Ativo' : 'E-mail não confirmado'}</div></ActiveColumnTd>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </Page>
  );
}

export default Providers;