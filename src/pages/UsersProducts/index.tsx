import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import noRecords from '../../assets/icons/noRecords.png';
import {
	Avatar,
	AvatarColumnTd,
	AvatarColumnTh,
	ContainerLoading,
	NameColumnTd,
	NameColumnTh
} from './styles';
import { FiUser } from 'react-icons/fi';

interface IParams {
	id: string;
}

interface IUsers {
	id: string;
	name: string;
	avatar_url: string;
}

const UsersProducts: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState<IUsers[]>([]);
	const { id } = useParams<IParams>();

	useEffect(() => {
		async function loadUsers(): Promise<void> {
			const response: AxiosResponse<IUsers[]> = await api.get(`/productsuser/${id}`);

			setUsers(response.data);
			setLoading(false);
		}

		loadUsers();
	}, [id]);

	return (
		<Page header="USUÁRIOS">
			{
				loading
					?
					<ContainerLoading>
						<Loading color="white" />
						<span>Carregando usuários...</span>
					</ContainerLoading>
					: !users.length
						?
						<ContainerLoading>
							<img src={noRecords} alt="No records" width={60} height={60} style={{ marginBottom: 10 }} />
							<span style={{ marginBottom: 0 }}>O produto não contém clientes</span>
						</ContainerLoading>
						:
						<Table>
							<thead>
								<tr>
									<AvatarColumnTh>Avatar</AvatarColumnTh>
									<NameColumnTh>Nome</NameColumnTh>
								</tr>
							</thead>
							<tbody>
								{users.map(user => {
									return (
										<tr key={user.id}>
											<AvatarColumnTd><Avatar src={user.avatar_url} /></AvatarColumnTd>
											<NameColumnTd><div><FiUser size={20} />{user.name}</div></NameColumnTd>
										</tr>
									)
								})}
							</tbody>
						</Table>
			}
		</Page>
	);
}

export default UsersProducts;