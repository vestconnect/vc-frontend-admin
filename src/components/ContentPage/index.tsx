import React from 'react';

import {
    Container,
    ContainerContentPage,
    Content,
    Background,
    Title,
    Option,
    OptionObs,
    Line
} from './styles';

interface IContentPageProps {
    header?: JSX.Element;
    title?: string;
    optionText: string;
    optionObsText?: string;
}

const ContentPage: React.FC<IContentPageProps> = (
    {
        header,
        title = 'VestConnect',
        optionText,
        optionObsText,
        children
    }
) => {
    return (
        <Container>
            <ContainerContentPage>
                <Background>
                    <Title>{title}</Title>
                </Background>

                <Content>
                    {header && header}

                    <Option>
                        {optionText}
                    </Option>

                    <Line></Line>

                    {optionObsText &&
                        <OptionObs>
                            {optionObsText}
                        </OptionObs>
                    }

                    {children}
                </Content>
            </ContainerContentPage>
        </Container>
    );
}

export default ContentPage;