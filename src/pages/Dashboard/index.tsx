import React from 'react';
import Button from '../../components/ButtonOptions';
import ContentPage from '../../components/ContentPage';
import Logout from '../../components/Logout';

const Dashboard: React.FC = () => {
    return (
        <ContentPage
            header={<Logout />}
            optionText="ESCOLHA UMA OPÇÃO"
        >
            <Button to="/providers">Fornecedores</Button>
        </ContentPage>
    );
}

export default Dashboard;