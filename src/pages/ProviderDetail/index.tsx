import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { FiImage, FiPlusCircle } from 'react-icons/fi';
import ContentPage from '../../components/ContentPage';
import GoBack from '../../components/GoBack';
import Input from '../../components/Input';
import api from '../../services/api';

import { ContainerAvatar, InputFile, Avatar } from './styles'
import { useToast } from '../../hooks/toast';
import Button from '../../components/Button';

interface IProvidersProps {
    id: string;
    name: string;
    email: string;
    nickname: string;
    avatar_url: string;
}

interface IParams {
    id: string;
}

const ProviderDetail: React.FC = () => {
    const [provider, setProvider] = useState<IProvidersProps>({} as IProvidersProps);
    const { id } = useParams<IParams>();
    const [avatar, setAvatar] = useState('');
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const { addToast } = useToast();
    const [sendEmail, setSendEmail] = useState(false);

    useEffect(() => {
        async function loadUser(): Promise<void> {
            const response: AxiosResponse<IProvidersProps> = await api.get(`/users/${id}`);

            setProvider(response.data);
        }

        loadUser();
    }, [id]);

    const handleChangeAvatar = useCallback(async () => {
        if (inputAvatarRef.current?.files) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                setAvatar(e.target.result);
            }

            const avatarData = new FormData();
            avatarData.append('avatar', inputAvatarRef.current.files[0]);
            await api.patch(`/users/${id}/avatar`, avatarData);

            addToast({
                type: 'success',
                title: 'Avatar alterado',
                description: 'O avatar do fornecedor foi alterado com sucesso.'
            });

            reader.readAsDataURL(inputAvatarRef.current.files[0]);
        }
    }, [setAvatar, id, addToast]);

    const sendForgotEmail = useCallback(async (data: IProvidersProps) => {
        try {
            setSendEmail(true);

            await api.post('password/forgot', {
                email: data.email
            });

            setSendEmail(false);

            addToast({
                type: 'success',
                title: 'E-mail enviando',
                description: 'O e-mail foi enviado com sucesso.'
            });
        } catch (e) {
            addToast({
                type: 'error',
                title: 'E-mail não enviado',
                description: 'Ocorreu um erro ao enviar o e-mail. Tente novamente.'
            });
        }
    }, [setSendEmail, addToast]);

    return (
        <ContentPage header={<GoBack path='/providers' />} optionText='DETALHE DO FORNECEDOR'>
            <ContainerAvatar>
                {avatar || provider.avatar_url ? <Avatar src={!avatar ? provider.avatar_url : avatar} /> : <FiImage size={45} />}
                <InputFile
                    ref={inputAvatarRef}
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleChangeAvatar}
                />
                <label htmlFor="avatar"><FiPlusCircle size={15} color='#FFFFFF' /></label>
            </ContainerAvatar>

            <Form initialData={{
                name: provider.name,
                email: provider.email,
                nickname: provider.nickname
            }} onSubmit={sendForgotEmail}>
                <Input name="name" title="Nome" disabled={true} />
                <Input name="email" title="E-mail" disabled={true} />
                <Input name="nickname" title="Nickname" disabled={true} />

                <Button
                    type='submit'
                    disabled={sendEmail ? true : false}
                >
                    {sendEmail ? 'Enviando e-mail...' : 'Fornecedor esqueceu a senha? - Mande um e-mail'}
                </Button>
            </Form>
        </ContentPage>
    )
}

export default ProviderDetail;