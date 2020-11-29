import React from 'react';

import {
    Container,
    ContainerPropsItem,
    LinkContent
} from './styles';

interface IContent {
    id: string;
    description: string;
    type: string;
    background_url: string;
    product_id: string;
    type_text: string;
}

interface ContentItemProps {
    item: IContent;
}

const ContentItem: React.FC<ContentItemProps> = ({ item }) => {
    return (
        <LinkContent to={item.type === 'P' ? `/productscontentphotos/${item.id}` : `/productscontentvideos/${item.id}`}>
            <Container background={item.background_url}>
                <ContainerPropsItem>
                    <span>{item.description}</span>
                    <span>{item.type_text}</span>
                </ContainerPropsItem>
            </Container>
        </LinkContent>
    );
}

export default ContentItem;