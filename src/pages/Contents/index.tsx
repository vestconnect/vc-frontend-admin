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
	ContainerLoading,
	ActionColumnTd,
	ActionColumnTh,
	Avatar,
	AvatarColumnTd,
	AvatarColumnTh,
	DescriptionColumnTd,
	DescriptionColumnTh,
	TableButton,
	TypeColumnTd,
	TypeColumnTh
} from './styles';
import { FiCamera, FiFileText, FiVideo } from 'react-icons/fi';

interface IParams {
	id: string;
}

interface IContent {
	id: string;
	description: string;
	type: string;
	background_url: string;
	product_id: string;
	type_text: string;
}

const Contents: React.FC = () => {
	const { id } = useParams<IParams>();
	const [loading, setLoading] = useState(true);
	const [contents, setContents] = useState<IContent[]>([]);
	const history = useHistory();

	useEffect(() => {
		async function loadProductsContent(): Promise<void> {
			const response: AxiosResponse<IContent[]> = await api.get(`productscontent/${id}`)

			setContents(response.data);
			setLoading(false);
		}

		loadProductsContent();
	}, [id]);

	return (
		<Page header="CONTEÚDOS">
			{loading
				?
				<ContainerLoading>
					<Loading color="white" />
					<span>Carregando conteúdos...</span>
				</ContainerLoading>
				: !contents.length
					?
					<ContainerLoading>
						<img src={noRecords} alt="No records" width={60} height={60} style={{ marginBottom: 10 }} />
						<span style={{ marginBottom: 0 }}>O produto não tem nenhum conteúdo cadastrado</span>
					</ContainerLoading>
					:
					<Table>
						<thead>
							<tr>
								<AvatarColumnTh>Avatar</AvatarColumnTh>
								<DescriptionColumnTh>Descrição</DescriptionColumnTh>
								<TypeColumnTh>Tipo</TypeColumnTh>
								<ActionColumnTh>Ações</ActionColumnTh>
							</tr>
						</thead>
						<tbody>
							{contents.map(content => {
								return (
									<tr key={content.id}>
										<AvatarColumnTd><Avatar src={content.background_url} /></AvatarColumnTd>
										<DescriptionColumnTd><div><FiFileText size={20} />{content.description}</div></DescriptionColumnTd>
										<TypeColumnTd><div>{content.type === 'V' ? <><FiVideo size={20} /> Vídeos</> : <><FiCamera size={20} /> Fotos</>} </div></TypeColumnTd>
										<ActionColumnTd>
											<div>
												<TableButton onClick={() => { content.type === 'V' ? history.push(`/productscontentvideos/${content.id}`) : history.push(`/productscontentphotos/${content.id}`) }}>
													{content.type === 'V' ? <div><FiVideo size={20} /> Visualizar vídeos</div> : <div><FiCamera size={20} /> Visualizar fotos</div>}
												</TableButton>
											</div>
										</ActionColumnTd>
									</tr>
								)
							})}
						</tbody>
					</Table>
			}
		</Page>
	);
}

export default Contents;