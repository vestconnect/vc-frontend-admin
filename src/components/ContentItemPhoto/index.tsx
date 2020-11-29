import React from 'react';

import {
    Container,
    ContainerPropsPhoto,
    Content
} from './styles';

interface IContent {
    id: string;
    title: string;
    description: string;
    file_url: string;
    background_url: string;
}

interface ContentItemVideoProps {
    item: IContent;
}

const ContentItemVideo: React.FC<ContentItemVideoProps> = ({ item }) => {
    return (
        <Content>
            <Container background={item.background_url}>
                <ContainerPropsPhoto>
                    <span>{item.description}</span>
                </ContainerPropsPhoto>

            </Container>
            <a href={item.file_url} target="_blank" rel="noopener noreferrer">Visualizar foto</a>
        </Content>
    );
}

export default ContentItemVideo;