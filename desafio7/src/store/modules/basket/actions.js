export function addToBasketRequest(id) {
    return {
        type: '@basket/ADD_REQUEST',
        id,
    };
}

export function addToBasketSuccess(product) {
    return {
        type: '@basket/ADD_SUCCESS',
        product,
    };
}

export function removeFromBasket(id) {
    return {
        type: '@basket/REMOVE',
        id,
    };
}

export function updateAmountRequest(id, amount) {
    return {
        type: '@basket/UPDATE_AMOUNT_REQUEST',
        id,
        amount,
    };
}
export function updateAmountSuccess(id, amount) {
    return {
        type: '@basket/UPDATE_AMOUNT_SUCCESS',
        id,
        amount,
    };
}
