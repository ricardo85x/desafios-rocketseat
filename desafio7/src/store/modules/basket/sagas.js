import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToBasketSuccess, updateAmount } from './actions';
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
                updateAmount(productExists.id, Number(productExists.amount) + 1)
            );
        } else {
            console.tron.log('total web', amount);
            console.tron.log('total atual', newAmount);
            console.tron.log('desculpa ai mas acabou o estoque');
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
    }
}

export default all([takeLatest('@basket/ADD_REQUEST', addToBasket)]);
