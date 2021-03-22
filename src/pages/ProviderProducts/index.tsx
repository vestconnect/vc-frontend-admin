import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import noRecords from '../../assets/icons/noRecords.png';
import api from '../../services/api';

import {
	Avatar,
	AvatarColumnTh,
	TitleColumnTh,
	SubtitleColumnTh,
	NfcColumnTh,
	ValidateColumnTh,
	ActiveColumnTh,
	AvatarColumnTd,
	TitleColumnTd,
	SubtitleColumnTd,
	NfcColumnTd,
	ValidateColumnTd,
	ActiveColumnTd,
	ContainerLoading,
	ActionColumnTh,
	ActionColumnTd,
	TableButton
} from './styles';
import {
	FiAlertCircle,
	FiCheckCircle,
	FiFile,
	FiAward,
	FiCode,
	FiCalendar,
	FiShoppingBag,
	FiUsers
} from 'react-icons/fi';

interface IProduct {
	id: string;
	avatar_url: string;
	background_url: string;
	title: string;
	subtitle: string;
	nfc_id: string;
	validate: string;
	active: boolean;
}

interface IParams {
	id: string;
}

const ProviderProducts: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState<IProduct[]>([]);
	const { id } = useParams<IParams>();
	const history = useHistory();

	useEffect(() => {
		async function loadProducts(): Promise<void> {
			const response: AxiosResponse<IProduct[]> = await api.get(`/products/${id}/products`);

			setProducts(response.data);
			setLoading(false);
		}

		loadProducts();
	}, [id]);

	return (
		<Page header="PRODUTOS">
			{loading
				?
				<ContainerLoading>
					<Loading color="white" />
					<span>Carregando os produtos...</span>
				</ContainerLoading>
				: !products.length
					?
					< ContainerLoading >
						<img src={noRecords} alt="No records" width={60} height={60} style={{ marginBottom: 10 }} />
						<span style={{ marginBottom: 0 }}>O fornecedor não tem nenhum produto cadastrado</span>
					</ContainerLoading>
					:
					<Table>
						<thead>
							<tr>
								<AvatarColumnTh>Avatar</AvatarColumnTh>
								<TitleColumnTh>Título</TitleColumnTh>
								<SubtitleColumnTh>Subtítulo</SubtitleColumnTh>
								<NfcColumnTh>NFC</NfcColumnTh>
								<ValidateColumnTh>Validade</ValidateColumnTh>
								<ActiveColumnTh>Status</ActiveColumnTh>
								<ActionColumnTh>Ações</ActionColumnTh>
							</tr>
						</thead>
						<tbody>
							{products.map(product => {
								return (
									<tr key={product.id}>
										<AvatarColumnTd><Avatar src={product.avatar_url} /></AvatarColumnTd>
										<TitleColumnTd><div><FiAward size={20} />{product.title}</div></TitleColumnTd>
										<SubtitleColumnTd><div><FiFile size={20} />{product.subtitle}</div></SubtitleColumnTd>
										<NfcColumnTd><div><FiCode size={20} />{product.nfc_id}</div></NfcColumnTd>
										<ValidateColumnTd><div><FiCalendar size={20} />{new Date(product.validate).toLocaleDateString('pt-br', { month: 'numeric', year: 'numeric', day: 'numeric' })}</div></ValidateColumnTd>
										<ActiveColumnTd><div>{product.active ? <FiCheckCircle color="#00CC00" size={20} /> : <FiAlertCircle color="#DF4401" size={20} />}{product.active ? 'Ativo' : 'Inativo'}</div></ActiveColumnTd>
										<ActionColumnTd>
											<div>
												<TableButton onClick={() => history.push(`/contents/${product.id}`)}>
													<FiShoppingBag size={15} color="#FFF" /> Conteúdos
                      	</TableButton>
												<TableButton onClick={() => { history.push(`/providers/users/${product.id}`) }}>
													<FiUsers size={15} color="#FFF" /> Usuários
                      	</TableButton>
											</div>
										</ActionColumnTd>
									</tr>
								)
							})}
						</tbody>
					</Table>
			}
		</Page >
	);
}

export default ProviderProducts;