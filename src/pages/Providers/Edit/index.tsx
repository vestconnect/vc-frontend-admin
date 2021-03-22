import React, { useEffect, useRef, useState } from 'react';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Modal from '../../../components/Modal';
import Loading from '../../../components/Loading';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
import { Form } from '@unform/web';
import { useToast } from '../../../hooks/toast';
import { FormHandles } from '@unform/core';
import {
  FiPlusCircle,
  FiMail,
  FiUser,
  FiStar,
  FiImage
} from 'react-icons/fi';

import {
  ContainerAvatar,
  InputFile,
  Avatar
} from './styles';
import { AxiosResponse } from 'axios';

interface IProvidersProps {
  id: string;
  name: string;
  email: string;
  nickname: string;
  avatar_url: string;
  active: boolean;
}

interface IEditProps {
  openModal: boolean;
  onCloseModal(): void;
  onSaveModal(): void;
  currentProvider: IProvidersProps;
}

interface ISubmitProps {
  name: string;
  nickname: string;
}

const Edit: React.FC<IEditProps> = ({ currentProvider, openModal, onCloseModal, onSaveModal }) => {
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<IProvidersProps>({} as IProvidersProps);
  const formRef = useRef<FormHandles>(null);
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    setProvider(currentProvider);
  }, [currentProvider]);

  const handleChangeAvatar = () => {
    if (inputAvatarRef.current?.files?.length) {
      var reader = new FileReader();

      reader.onload = async (e: any) => {
        setLoadingAvatar(true);

        if (inputAvatarRef.current?.files?.length) {
          const avatarData = new FormData();

          avatarData.append('avatar', inputAvatarRef.current.files[0]);

          const response: AxiosResponse<IProvidersProps> = await api.patch(`/users/${provider.id}/avatar`, avatarData);

          setProvider({ ...provider, avatar_url: response.data.avatar_url });
        }

        setLoadingAvatar(false);
      }

      reader.readAsDataURL(inputAvatarRef.current.files[0]);
    }
  };

  const handleOnClickSave = () => {
    buttonRef.current?.click();
  }

  const handleSubmitForm = async (data: ISubmitProps): Promise<void> => {
    setLoading(true);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        nickname: Yup.string().required('Nickname obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.put(`/users/providers/${provider.id}`, data);

      addToast({
        type: 'success',
        title: 'Fornecedor alterado',
        description: 'Seu fornecedor foi alterado com sucesso.'
      });

      setLoading(false);

      onSaveModal();
    } catch (e) {
      setLoading(false);

      if (e instanceof Yup.ValidationError) {
        const errors = getValidationErrors(e);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao inserir alterar',
        description: 'Ocorreu um erro ao alterar seu fornecedor. Tente novamente.'
      });
    }
  }

  return (
    <Modal
      openModal={openModal}
      onCloseModal={onCloseModal}
      onSaveModal={handleOnClickSave}
      loadingSave={loading}
    >
      <ContainerAvatar>
        {loadingAvatar ? <Loading color="green" /> : provider.avatar_url ? <Avatar src={provider.avatar_url} /> : <FiImage size={45} />}

        <InputFile
          ref={inputAvatarRef}
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleChangeAvatar}
        />
        <label htmlFor="avatar"><FiPlusCircle size={15} color='#FFFFFF' /></label>
      </ContainerAvatar>

      <Form
        ref={formRef}
        onSubmit={handleSubmitForm}
        initialData={{
          name: provider.name,
          email: provider.email,
          nickname: provider.nickname
        }}
        style={{ width: '100%' }}
      >
        <Input name="email" icon={FiMail} placeholder="E-mail" title="Email:" disabled />
        <Input name="name" icon={FiUser} placeholder="Nome" title="Nome:" />
        <Input name="nickname" icon={FiStar} placeholder="Nickname" title="Apelido:" />

        <button ref={buttonRef} type="submit" hidden />
      </Form>
    </Modal>
  )
}

export default Edit;