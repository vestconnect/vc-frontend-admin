import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
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
	TitleColumnTd,
	TitleColumnTh,
} from './styles';

import {
	FiFileText,
	FiVideo
} from 'react-icons/fi';

interface IParams {
	id: string;
}

interface IContent {
	id: string;
	title: string;
	description: string;
	file_url: string;
	background_url: string;
}

const ContentVideo: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [contents, setContents] = useState<IContent[]>([]);
	const { id } = useParams<IParams>();

	useEffect(() => {
		async function loadContent(): Promise<void> {
			const response: AxiosResponse<IContent[]> = await api.get(`/productscontentvideos/${id}`);

			setContents(response.data);
			setLoading(false);
		}

		loadContent();
	}, [id]);

	return (
		<Page header="VÍDEOS">
			{
				loading
					?
					<ContainerLoading>
						<Loading color="white" />
						<span>Carregando vídeos...</span>
					</ContainerLoading>
					:
					!contents.length
						?
						<ContainerLoading>
							<img src={noRecords} alt="No records" width={60} height={60} style={{ marginBottom: 10 }} />
							<span style={{ marginBottom: 0 }}>O conteúdo não tem vídeos cadastrados</span>
						</ContainerLoading>
						:
						<Table>
							<thead>
								<tr>
									<AvatarColumnTh>Avatar</AvatarColumnTh>
									<TitleColumnTh>Título</TitleColumnTh>
									<DescriptionColumnTh>Descrição</DescriptionColumnTh>
									<ActionColumnTh>Ações</ActionColumnTh>
								</tr>
							</thead>
							<tbody>
								{contents.map(content => {
									return (
										<tr key={content.id}>
											<AvatarColumnTd><Avatar src={content.background_url} /></AvatarColumnTd>
											<TitleColumnTd><div><FiFileText size={20} />{content.title}</div></TitleColumnTd>
											<DescriptionColumnTd><div><FiFileText size={20} />{content.description}</div></DescriptionColumnTd>
											<ActionColumnTd>
												<div>
													<TableButton href={content.file_url} target="_blank" rel="noopener noreferrer"><div><FiVideo size={20} /> Visualizar vídeo</div></TableButton>
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

export default ContentVideo;