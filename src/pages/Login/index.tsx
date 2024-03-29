import React, {
    useCallback,
    useRef,
    useState
} from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import {
    FiMail,
    FiLock
} from 'react-icons/fi';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import {
    Container,
    ContainerLogin,
    Background,
    Logo,
    Title,
    SubTitle,
    Powered,
    Form,
    Forgot
} from './styles';

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

            history.push('/home');
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
        <Container>
            <ContainerLogin>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Logo />

                    <SubTitle>Por favor, informe suas credenciais</SubTitle>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" type="password" icon={FiLock} placeholder="Senha" />

                    <Button
                        type="submit"
                        disabled={login}
                        loading={login}
                    >
                        Entrar
                    </Button>

                    <Forgot to="/forgot">Esqueceu sua senha?</Forgot>
                </Form>

                <Powered>Powered by VestConnect@{new Date().getFullYear()}</Powered>
            </ContainerLogin>
            <Background>
                <Title>VestConnect</Title>
                <SubTitle>Um novo modelo de interatividade</SubTitle>
            </Background>
        </Container>
    )
}

export default Login;