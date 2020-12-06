import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiImage, FiPlusCircle } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import ContentPage from '../../components/ContentPage';
import GoBack from '../../components/GoBack';
import Button from '../../components/Button';
import ProviderItem from '../../components/ProviderItem';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';

import { ContainerAvatar, InputFile, Avatar } from './styles';

interface IProvidersProps {
    id: string;
    name: string;
    email: string;
    nickname: string;
    avatar_url: string;
}

interface INewProviderProps {
    name: string;
    email: string;
    password: string;
    nickname: string;
    birth: string;
    type: string;
}

const Providers: React.FC = () => {
    const [providers, setProviders] = useState<IProvidersProps[]>([]);
    const [newProvider, setNewProvider] = useState(false);
    const [avatar, setAvatar] = useState('');
    const formRef = useRef<FormHandles>(null);
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const { addToast } = useToast();
    const [saveProvider, setSaveProvider] = useState(false);

    useEffect(() => {
        async function loadProviders(): Promise<void> {
            const response: AxiosResponse<IProvidersProps[]> = await api.get('/users?type=1');
            
            setProviders(response.data);
        }

        loadProviders();
    }, []);

    const handleSubmit = useCallback(async (data: INewProviderProps) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório'),
                password: Yup.string().min(6).required('Password obrigatório'),
                nickname: Yup.string().required('Nickname obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setSaveProvider(true);

            data.birth = '01/01/2020';
            data.type = '1';

            let response: AxiosResponse<IProvidersProps> = await api.post('/users', data);

            if (inputAvatarRef.current?.files?.length) {
                const avatarData = new FormData();
                avatarData.append('avatar', inputAvatarRef.current.files[0]);
                response = await api.patch(`/users/${response.data.id}/avatar`, avatarData);
            }

            addToast({
                type: 'success',
                title: 'Fornecedor inserido',
                description: 'Seu fornecedor foi inserido com sucesso.'
            });

            setSaveProvider(false);

            setProviders([...providers, response.data]);

            setNewProvider(false);
        } catch (e) {
            setSaveProvider(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao inserir fornecedor',
                description: 'Ocorreu um erro ao inserir seu fornecedor. Tente novamente.'
            });
        }
    }, [addToast, setSaveProvider, providers, setProviders, setNewProvider]);

    const handleChangeAvatar = useCallback(() => {
        if (inputAvatarRef.current?.files) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                setAvatar(e.target.result);
            }

            reader.readAsDataURL(inputAvatarRef.current.files[0]);
        }
    }, [setAvatar]);

    return (
        <ContentPage header={<GoBack path="/dashboard" />} optionText="FORNECEDORES">
            {newProvider ?
                <>
                    <Button onClick={() => { setNewProvider(false) }}>Cancelar cadastro</Button>

                    <ContainerAvatar>
                        {avatar ? <Avatar src={avatar} /> : <FiImage size={45} />}
                        <InputFile
                            ref={inputAvatarRef}
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleChangeAvatar}
                        />
                        <label htmlFor="avatar"><FiPlusCircle size={15} color='#FFFFFF' /></label>
                    </ContainerAvatar>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input name="name" title="Nome" />
                        <Input name="email" title="E-mail" />
                        <Input name="password" type="password" title="Password" />
                        <Input name="nickname" title="Nickname" />

                        <Button type="submit" disabled={saveProvider ? true : false}>{saveProvider ? 'Salvando fornecedor' : 'Cadastrar fornecedor'}</Button>
                    </Form>
                </>
                :
                <>
                    <Button onClick={() => { setNewProvider(true) }}>Novo fornecedor</Button>

                    {providers.length ?
                        providers.map(provider => <ProviderItem key={provider.id} item={provider} />)
                        :
                        <span>Carregando...</span>
                    }
                </>
            }
        </ContentPage >
    );
};

export default Providers;