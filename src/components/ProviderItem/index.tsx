import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiShoppingBag } from 'react-icons/fi';

import { Container, Avatar, Content } from './styles';

interface IProviderItemProps {
    id: string;
    name: string;
    email: string;
    nickname: string;
    avatar_url: string;
}

interface IComponentProps {
    item: IProviderItemProps;
}

const ProviderItem: React.FC<IComponentProps> = ({ item }) => {
    return (
        <Container>
            <Avatar src={item.avatar_url} />
            <Content>
                {item.nickname}

                <div>
                    <Link to={`/provider/detail/${item.id}`}>
                        <FiEye size={20} color='#FFFFFF' title='Visualizar' />
                    </Link>
                    <Link to={`/provider/products/${item.id}`}>
                        <FiShoppingBag size={20} color='#FFFFFF' />
                    </Link>
                </div>
            </Content>
        </Container>
    );
}

export default ProviderItem;