import React, {
    useCallback,
    useRef,
    useState
} from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import {
    FiMail
} from 'react-icons/fi';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import {
    Container,
    ContainerForgot,
    Background,
    Logo,
    Title,
    SubTitle,
    Powered,
    Form,
    Login
} from './styles';

interface ForgotFormData {
    email: string;
    password: string;
}

const Forgot: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = useCallback(async (data: ForgotFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            setLoading(true);

            await api.post('/password/forgot', {
                email: data.email
            });

            addToast({
                type: 'success',
                title: 'E-mail enviado',
                description: 'Verifique sua caixa de e-mail'
            });

            setLoading(false);

            setTimeout(() => {
                history.push('/');
            }, 1500);
        } catch (e) {
            setLoading(false);

            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao enviar e-mail',
                description: 'Ocorreu um erro ao enviar seu e-mail. Tente novamente.'
            });
        }
    }, [addToast, setLoading, history]);

    return (
        <Container>
            <ContainerForgot>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Logo />

                    <SubTitle>Por favor, informe seu e-mail para redefinir sua senha</SubTitle>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Button
                        type="submit"
                        disabled={loading}
                        loading={loading}
                    >
                        Enviar e-mail
                    </Button>

                    <Login to="/">Voltar para o login</Login>
                </Form>

                <Powered>Powered by VestConnect@{new Date().getFullYear()}</Powered>
            </ContainerForgot>
            <Background>
                <Title>VestConnect</Title>
                <SubTitle>Um novo modelo de interatividade</SubTitle>
            </Background>
        </Container>
    )
}

export default Forgot;