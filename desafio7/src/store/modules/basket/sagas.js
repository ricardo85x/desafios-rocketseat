import {
    call,
    select,
    put,
    all,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';

import NavigationService from '../../../services/navigation';

import {
    addToBasketSuccess,
    updateAmountSuccess,
    updateAmountRequest,
    removeFromBasket,
} from './actions';
import { formatPrice } from '../../../util/format';

function* addToBasket({ id }) {
    const productExists = yield select(state =>
        state.basket.find(p => p.id === id)
    );

    if (productExists) {
        const newAmount = Number(productExists.amount) + 1;

        const resposnseStock = yield call(
            api.get,
            `/stock/${productExists.id}`
        );

        const { amount } = resposnseStock.data;

        if (amount && Number(amount) >= newAmount) {
            yield put(
                updateAmountRequest(
                    productExists.id,
                    Number(productExists.amount) + 1
                )
            );
        } else {
            console.tron.log('total web', amount);
            console.tron.log('total atual', newAmount);
            console.tron.log('desculpa ai mas acabou o estoque');

            Alert.alert('desculpa ai mas acabou o estoque');
        }
    } else {
        console.tron.log('Opa to no saga!');
        const response = yield call(api.get, `/products/${id}`);

        const data = {
            ...response.data,
            amount: 1,
            formatedPrice: formatPrice(response.data.price),
        };

        yield put(addToBasketSuccess(data));

        NavigationService.navigate('Basket');
    }
}

function* updateAmount({ id, amount: newAmount }) {
    const product = yield select(state => state.basket.find(p => p.id === id));

    if (product) {
        const resposnseStock = yield call(api.get, `/stock/${product.id}`);

        const { amount } = resposnseStock.data;

        if (amount && Number(amount) >= newAmount && newAmount >= 1) {
            console.tron.log('adicionando', newAmount);
            yield put(updateAmountSuccess(product.id, newAmount));
        } else if (amount && newAmount <= 0) {
            yield put(removeFromBasket(product.id));
            // NavigationService.navigate('Main');
        } else if (amount && amount < newAmount) {
            Alert.alert('desculpa ai mas acabou o estoque');
        }
    }
}

export default all([
    takeLatest('@basket/ADD_REQUEST', addToBasket),
    takeEvery('@basket/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
