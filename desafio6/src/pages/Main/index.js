import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    Form,
    Input,
    SubmmitButton,
    List,
    Users,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
} from './styles';

import api from '../../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: 'Usuarios',
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    state = {
        newUser: '',
        users: [],
        failedSearch: false,
        loading: false,
    };

    async componentDidMount() {
        const users = await AsyncStorage.getItem('users');

        if (users) {
            this.setState({ users: JSON.parse(users) });
        }
    }

    async componentDidUpdate(_, prev) {
        // _ = props, prev = state

        const { users } = this.state;
        if (prev.users != users) {
            AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }

    //
    //
    handleAddUser = async () => {
        this.setState({ loading: true });
        const { users, newUser } = this.state;

        try {
            const response = await api.get(`/users/${newUser}`);

            if (response.data) {
                const { name, login, bio, avatar_url: avatar } = response.data;

                const data = {
                    name,
                    login,
                    bio,
                    avatar,
                };

                console.tron.log(data);
                this.setState({
                    users: [...users, data],
                    newUser: '',
                    failedSearch: false,
                });
            } else {
                this.setState({ failedSearch: true });
            }
        } catch (_) {
            this.setState({ failedSearch: true });
        }

        this.setState({ loading: false });

        Keyboard.dismiss();
    };

    handleNavigate = user => {
        const { navigation } = this.props; // metodo navigation sempre dentro do props quando usamos createStackNavigator

        navigation.navigate('User', { user });
    };

    render() {
        const { users, newUser, failedSearch, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        failedSearch={failedSearch}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuario"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType="send" // permite enviar ao clicar no enter
                        onSubmitEditing={this.handleAddUser} // roda uma acao ao envair com o enter
                    />
                    <SubmmitButton
                        loading={loading}
                        onPress={this.handleAddUser}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Icon name="add" size={20} color="#FFF" />
                        )}
                    </SubmmitButton>
                </Form>

                <List
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={({ item }) => (
                        <Users>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio} </Bio>

                            <ProfileButton
                                onPress={() => this.handleNavigate(item)}
                            >
                                <ProfileButtonText>
                                    Ver perfil
                                </ProfileButtonText>
                            </ProfileButton>
                        </Users>
                    )}
                />
            </Container>
        );
    }
}
