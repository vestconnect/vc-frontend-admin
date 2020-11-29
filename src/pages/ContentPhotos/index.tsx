import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import ContentPage from '../../components/ContentPage';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import ContentItemPhoto from '../../components/ContentItemPhoto';

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

const ContentPhotos: React.FC = () => {
    const [contents, setContents] = useState<IContent[]>([]);
    const { id } = useParams<IParams>();

    useEffect(() => {
        async function loadContent(): Promise<void> {
            const response: AxiosResponse<IContent[]> = await api.get(`/productscontentphotos/${id}`);

            setContents(response.data);
        }

        loadContent();
    }, [id]);

    return (
        <ContentPage header={<GoBack path='/providers' />} optionText='VÍDEOS'>
            {contents.map(content => {
                return <ContentItemPhoto item={content} />
            })}
        </ContentPage>
    );
}

export default ContentPhotos;