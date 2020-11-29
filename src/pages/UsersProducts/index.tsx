import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import UserItem from '../../components/UserItem';
import ContentPage from '../../components/ContentPage';
import GoBack from '../../components/GoBack';

interface IParams {
    id: string;
}

interface IUsers {
    id: string;
    name: string;
    avatar_url: string;
}

const UsersProducts: React.FC = () => {
    const [users, setUsers] = useState<IUsers[]>([]);
    const { id } = useParams<IParams>();

    useEffect(() => {
        async function loadUsers(): Promise<void> {
            const response: AxiosResponse<IUsers[]> = await api.get(`/productsuser/${id}`);

            setUsers(response.data);
        }

        loadUsers();
    }, [id]);

    return (
        <ContentPage header={<GoBack path='/providers' />} optionText='USUÁRIOS' >
            {users.length ?
                users.map(user => <UserItem key={user.id} item={user} />)
                :
                'Nenhum cliente...'
            }
        </ContentPage>
    );
}

export default UsersProducts;