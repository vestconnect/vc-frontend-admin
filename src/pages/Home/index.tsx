import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import api from '../../services/api';

import {
  Card,
  CardHeader,
  CardDetail,
  IconHeart,
  IconAward,
  IconCamera,
  IconVideo,
  IconFolder,
  IconShoppingBag,
  ContainerCard
} from './styles';
import { AxiosResponse } from 'axios';

interface IDashboardProps {
  providers: number,
  users: number;
  products: number;
  contents: number;
  video_contents: number;
  photo_contents: number;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboard, setDashboard] = useState<IDashboardProps>({} as IDashboardProps);

  useEffect(() => {
    async function loadDashboard() {
      const response: AxiosResponse<IDashboardProps> = await api.get('/dashboard');

      setDashboard(response.data);

      setLoading(false);
    }

    loadDashboard();
  }, []);

  return (
    <Page>
      <ContainerCard>
        <Card $loading={loading}>
          {loading ?
            <Loading color="white" />
            :
            <>
              <IconHeart size={20} color="green" />
              <CardHeader>Fornecedores</CardHeader>

              <CardDetail>Total de {dashboard.providers} fornecedore(s) cadastrado(s)</CardDetail>
            </>
          }
        </Card>
        <Card $loading={loading}>
          {loading ?
            <Loading color="white" />
            :
            <>
              <IconAward size={20} color="green" />
              <CardHeader>Usuários</CardHeader>

              <CardDetail>Total de {dashboard.users} usuário(s) cadastrado(s)</CardDetail>
            </>
          }
        </Card>
      </ContainerCard>
      <Card $loading={loading}>
        {loading ?
          <Loading color="white" />
          :
          <>
            <IconShoppingBag size={20} color="green" />
            <CardHeader>Produtos</CardHeader>

            <CardDetail>Total de {dashboard.products} produto(s) cadastrado(s)</CardDetail>
          </>}
      </Card>
      <ContainerCard>
        <Card $loading={loading}>
          {loading ?
            <Loading color="white" />
            :
            <>
              <IconFolder size={20} color="green" />
              <CardHeader>Conteúdos</CardHeader>

              <CardDetail>Total de {dashboard.contents} conteúdo(s) cadastrado(s)</CardDetail>
            </>
          }
        </Card>
        <Card $loading={loading}>
          {loading ?
            <Loading color="white" />
            :
            <>
              <IconVideo size={20} color="green" />
              <CardHeader>Vídeos</CardHeader>

              <CardDetail>Total de {dashboard.video_contents} vídeo(s) cadastrado(s)</CardDetail>
            </>
          }
        </Card>
        <Card $loading={loading}>
          {loading ?
            <Loading color="white" />
            :
            <>
              <IconCamera size={20} color="green" />
              <CardHeader>Fotos</CardHeader>

              <CardDetail>Total de {dashboard.photo_contents} foto(s) cadastrado(s)</CardDetail>
            </>
          }

        </Card>
      </ContainerCard>
    </Page>
  )
}

export default Home;