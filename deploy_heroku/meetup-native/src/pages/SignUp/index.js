import React, {useRef, useState} from 'react';

import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import logo from '~/assets/logo.png';

// import Input from '~/components/Input';
// import Button from '~/components/Button';
import Background from '~/components/Background';

import {signUpRequest} from '~/store/modules/auth/actions';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignUp({navigation}) {
    const dispatch = useDispatch();
    const refEmail = useRef();
    const refPassword = useRef();

    const loading = useSelector(state => state.auth.loading);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function handleSubmit() {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => refEmail.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu email"
                        ref={refEmail}
                        returnKeyType="next"
                        onSubmitEditing={() => refPassword.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={refPassword}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Cadastrar
                    </SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já tenho conta!</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}

SignUp.propTypes = {
    navigation: PropTypes.shape().isRequired,
};
