import Moment from "./CustomMoment";


export const CUSTOMER_INITIAL = {
    _id: "",
    rg: "",
    estacionamento: "",
    nome: "",
    telefone: ""
}

export const LOT_INITIAL = {
    _id: "",
    status: false,
    codigo: "",
    estacionamento: ""
};

export const VEHICLE_INITIAL = {
    _id: "",
    placa: "",
    cliente: CUSTOMER_INITIAL,
    cor: "",
    estacionamento: "",
    modelo: "",
}

export const RESERVATION_INITIAL = {
    _id: "",
    status: "",
    tipo: "",
    estacionamento: "",
    cliente: CUSTOMER_INITIAL,
    veiculo: VEHICLE_INITIAL,
    entrada: Moment().toISOString(),
}