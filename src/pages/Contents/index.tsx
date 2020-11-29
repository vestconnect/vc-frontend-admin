import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import GoBack from '../../components/GoBack';
import api from '../../services/api';
import ContentItem from '../../components/ContentItem';
import ContentPage from '../../components/ContentPage';
import { useParams } from 'react-router-dom';

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
    const [contents, setContents] = useState<IContent[]>([]);

    useEffect(() => {
        async function loadProductsContent(): Promise<void> {
            const response: AxiosResponse<IContent[]> = await api.get(`productscontent/${id}`)

            setContents(response.data);
        }

        loadProductsContent();
    }, [id]);

    return (
        <ContentPage header={<GoBack path='/providers' />} optionText='CONTEÚDOS'>
            {contents.map(content => {
                return <ContentItem item={content} />;
            })}
        </ContentPage>
    );
}

export default Contents;