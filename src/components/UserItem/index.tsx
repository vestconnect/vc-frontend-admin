import React from 'react';
import {
    Container,
    ContainerProduct,
    Avatar,
    Text
} from './styles';

interface IProduct {
    id: string;
    name: string;
    avatar_url: string;
}

interface IProductItemProps {
    item: IProduct;
}

const ProductItem: React.FC<IProductItemProps> = ({ item }) => {
    return (
        <Container>
            <ContainerProduct>
                <Avatar background={item.avatar_url} />
                <Text>
                    {item.name}
                </Text>
            </ContainerProduct>
        </Container>
    );
}

export default ProductItem;