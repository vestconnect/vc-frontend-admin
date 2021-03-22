import React, { useCallback, useRef, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { FiImage, FiPlusCircle } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../../hooks/toast';
import { AxiosResponse } from 'axios';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';
import * as Yup from 'yup';
import {
  ContainerAvatar,
  Avatar,
  InputFile
} from '../Edit/styles';
import {
  Container,
  ContainerButton
} from './styles';

interface IRegisterProvider {
  id: string;
  name: string;
  email: string;
  password: string;
  nickname: string;
}

interface IRegisterProps {
  onFinishRegister?(): Promise<void>;
  onCancelRegister(): any;
}

const RegisterProvider: React.FC<IRegisterProps> = ({ onCancelRegister, onFinishRegister }) => {
  const [avatar, setAvatar] = useState('');
  const formRef = useRef<FormHandles>(null);
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();
  const [saveProvider, setSaveProvider] = useState(false);

  const handleChangeAvatar = useCallback(() => {
    if (inputAvatarRef.current?.files) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        setAvatar(e.target.result);
      }

      reader.readAsDataURL(inputAvatarRef.current.files[0]);
    }
  }, []);

  const handleSubmit = useCallback(async (data: IRegisterProvider) => {
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

      const request = {
        ...data,
        birth: '01/01/2021',
        type: '1'
      }

      const response: AxiosResponse<IRegisterProvider> = await api.post('/users', request);

      if (inputAvatarRef.current?.files?.length) {
        const avatarData = new FormData();

        avatarData.append('avatar', inputAvatarRef.current.files[0]);

        await api.patch(`/users/${response.data.id}/avatar`, avatarData);
      }

      addToast({
        type: 'success',
        title: 'Fornecedor inserido',
        description: 'Seu fornecedor foi inserido com sucesso.'
      });

      onFinishRegister && await onFinishRegister();
    } catch (e) {
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

      setSaveProvider(false);
    }
  }, [addToast, onFinishRegister]);

  return (
    <Container>
      <ContainerAvatar>
        {avatar ? <Avatar src={avatar} /> : <FiImage size={80} />}
        <InputFile
          ref={inputAvatarRef}
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleChangeAvatar}
        />
        <label htmlFor="avatar"><FiPlusCircle size={15} color='#FFFFFF' /></label>
      </ContainerAvatar>

      <Form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
        <Input name="name" title="Nome" autoComplete={'' + Math.random()} />
        <Input name="email" title="E-mail" autoComplete={'' + Math.random()} />
        <Input name="password" type="password" title="Password" />
        <Input name="nickname" title="Nickname" />

        <ContainerButton>
          <Button
            isTransparent={true}
            style={{ marginRight: 5 }}
            onClick={onCancelRegister}
          >
            Cancelar
        </Button>
          <Button type="submit" loading={saveProvider} disabled={saveProvider}>
            Cadastrar
          </Button>
        </ContainerButton>
      </Form>
    </Container>
  )
};

export default RegisterProvider;