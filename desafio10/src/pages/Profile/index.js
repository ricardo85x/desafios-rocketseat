import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';

import * as Yup from 'yup'

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Container,
    Title,
    Form,
    FormInput,
    SubmitButton,
    LogoutButton,
    Separator,
} from './styles';



import Background from '~/components/Background';

import {updateProfileRequest} from '~/store/modules/user/actions';
import {signOut} from '~/store/modules/auth/actions';

export default function Profile() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    const refEmail = useRef();
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        dispatch(
            updateProfileRequest({
                name,
                email,
                password,
                oldPassword,
                confirmPassword,
            }),
        );
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu Perfil</Title>
                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCaptalize="none"
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
                        autoCaptalize="none"
                        placeholder="Digite seu email"
                        ref={refEmail}
                        returnKeyType="next"
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha atual"
                        ref={oldPasswordRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua nova senha"
                        ref={passwordRef}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                        value={password}
                        onChangeText={setPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirme nova senha"
                        ref={confirmPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        Atualizar
                    </SubmitButton>
                    <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({tintColor}) => (
        <Icon name="person" size={20} color={tintColor} />
    ),
};
