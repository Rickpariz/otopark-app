export const getMoney = (str) => {
    if (typeof str === 'number') {
        return str
    }
    let newStr = str.toString().replace(/[a-zA-Z]\$+/g, '')
    return parseFloat(newStr.replace(/[.]+/g, '').replace(/[,]+/g, '.'))
}

export const getFormattedMoney = (money) => {
    const correctPrice = getMoney(money || '0,00');
    return correctPrice.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};