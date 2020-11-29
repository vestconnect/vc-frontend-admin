import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentPage from '../../components/ContentPage';
import GoBack from '../../components/GoBack';
import ProductItem from '../../components/ProductItem';
import api from '../../services/api';

interface IProduct {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    nfc_id: string;
    validate: string;
    avatar_url: string;
    background_url: string;
    active: boolean;
}

interface IParams {
    id: string;
}

const ProviderProducts: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [notExistsProduct, setNotExistsProduct] = useState(false);
    const { id } = useParams<IParams>();

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            const response: AxiosResponse<IProduct[]> = await api.get(`/products/${id}/products`);

            setProducts(response.data);

            if (!response.data.length) {
                setNotExistsProduct(true);
            }
        }

        loadProducts();
    }, [id]);

    return (
        <ContentPage header={<GoBack path='/providers' />} optionText='PRODUTOS'>
            {products.length ?
                products.map(prd => <ProductItem key={prd.id} item={prd} />)
                :
                !notExistsProduct ? 'Carregando...' : 'Nenhum produto'
            }
        </ContentPage>
    );
}

export default ProviderProducts;