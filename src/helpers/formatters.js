export const getFormattedRg = (value) => {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
}