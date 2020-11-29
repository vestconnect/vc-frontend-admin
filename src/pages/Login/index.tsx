import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ContentPage from '../../components/ContentPage';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const [login, setLogin] = useState(false);
    const history = useHistory();

    const handleSubmit = useCallback(async (data: LoginFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setLogin(true);

            await signIn({
                email: data.email,
                password: data.password
            });

            setLogin(false);

            history.push('/dashboard');
        } catch (e) {
            setLogin(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao fazer login',
                description: 'Ocorreu um erro ao fazer login. Tente novamente.'
            });
        }
    }, [addToast, history, setLogin, signIn]);

    return (
        <ContentPage optionObsText="Por favor, informe suas credenciais" optionText="FAÇA SEU LOGIN">
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" type="password" icon={FiLock} placeholder="Senha" />

                <Button type="submit" disabled={login ? true : false}>{login ? 'Logando' : 'Entrar'}</Button>
            </Form>
        </ContentPage>
    );
}

export default Login;