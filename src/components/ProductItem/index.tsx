import React from 'react';
import { FiUsers } from 'react-icons/fi';
import {
    Container,
    ContainerProduct,
    ContainerButton,
    Avatar,
    Text,
    Button,
    UsersLink
} from './styles';

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

interface IProductItemProps {
    item: IProduct;
}

const ProductItem: React.FC<IProductItemProps> = ({ item }) => {
    return (
        <Container>
            <ContainerProduct>
                <Avatar background={item.avatar_url} />
                <Text active={item.active}>
                    {item.title}
                </Text>
            </ContainerProduct>
            <ContainerButton>
                <Button to={`/contents/${item.id}`}>Conteúdos</Button>
                <UsersLink title="Visualizar clientes" to={`/providers/users/${item.id}`}>
                    <FiUsers />
                </UsersLink>
            </ContainerButton>
        </Container>
    );
}

export default ProductItem;