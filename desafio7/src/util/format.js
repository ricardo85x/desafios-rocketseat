import currencyFormatter from 'currency-formatter';

export const formatPrice = numero => {
    return currencyFormatter.format(numero, { locale: 'pt-BR' });
};
