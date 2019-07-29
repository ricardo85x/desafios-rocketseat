export function addToBasket(product) {
    return {
        type: '@basket/ADD',
        product,
    };
}

export function removeFromBasket(id) {
    return {
        type: '@basket/REMOVE',
        id,
    };
}

export function updateAmount(id, amount) {
    return {
        type: '@basket/UPDATE_AMOUNT',
        id,
        amount,
    };
}
