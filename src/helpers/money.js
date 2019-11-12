export const getMoney = (str) => {
    if (typeof str === 'number') {
        return str
    }
    let newStr = str.toString().replace(/[a-zA-Z]\$+/g, '')
    return parseFloat(newStr.replace(/[.]+/g, '').replace(/[,]+/g, '.'));
}

export const getFormattedMoney = (money) => {
    const correctPrice = getMoney(money || '0,00');
    return correctPrice.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}