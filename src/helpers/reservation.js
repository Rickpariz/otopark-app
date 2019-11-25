import moment from "moment";
import { getFormattedMoney } from "./money";

const model = { 
    "status":"Aberta",
    "tipo":"Avulsa",
    "_id":"5dd5c2a8c15eb003379fb4db",
    "vaga":{ 
       "status":false,
       "_id":"5dc46529e48d4d0597a86c3c",
       "codigo":"839C",
       "estacionamento":"5dc46529e48d4d0597a86c38",
       "createdAt":"2019-11-07T18:40:41.463Z",
       "updatedAt":"2019-11-20T22:48:08.007Z",
       "__v":0
    },
    "estacionamento":"5dc46529e48d4d0597a86c38",
    "cliente":{ 
       "_id":"5dd5c2a8a21a8ca531a5500b",
       "rg":"49.3094.409-21",
       "__v":0,
       "createdAt":"2019-11-20T22:48:07.949Z",
       "estacionamento":"5dc46529e48d4d0597a86c38",
       "nome":"José",
       "telefone":"11 974758784",
       "updatedAt":"2019-11-20T22:48:07.949Z"
    },
    "veiculo":{ 
       "_id":"5dd5c2a8a21a8ca531a5500d",
       "placa":"XMKJDL",
       "__v":0,
       "cliente":"5dd5c2a8a21a8ca531a5500b",
       "cor":"FF0000",
       "createdAt":"2019-11-20T22:48:08.005Z",
       "estacionamento":"5dc46529e48d4d0597a86c38",
       "modelo":"Testando",
       "updatedAt":"2019-11-20T22:48:08.005Z"
    },
    "entrada":"2019-11-21T21:48:08.011Z",
    "createdAt":"2019-11-20T22:48:08.021Z",
    "updatedAt":"2019-11-20T22:48:08.021Z",
    "__v":0
 }

export const getReservationDuration = (reservation) => {
    let diffDuration = moment.duration(moment().diff(moment(reservation.entrada), 'seconds'), 'seconds');
    return diffDuration;
}

export const getReservationDurationFormatted = (reservation) => {
    let diffDuration = getReservationDuration(reservation);

    if (diffDuration._data.days > 0) {
        return moment(diffDuration._data).format('DD [Dias] HH[h] mm[m] ')
    } else if (diffDuration._data.hours > 0) {
        return moment(diffDuration._data).format('HH[h] mm[m]')
    } else {
        return moment(diffDuration._data).format('mm[m]')
    }
}

// avulso: {
//     horaFixa: { type: Number },
//     horaExcedente: { type: Number },
//     tolerancia: { type: Number }
// },
// diario: {
//     tempo: { type: Number },
//     precoDiaria: { type: Number },
//     horaExcedente: { type: Number },
//     tolerancia: { type: Number }
// }

export const getReservationPrice = (reservation, parking) => {
    const configAvulso = parking.avulso;
    let price = 'R$ 0,00';

    if(reservation.tipo === "Avulsa"){
        const duration = getReservationDuration(reservation);        
        const _data = duration._data;

        console.log(_data);

        if(_data.days === 0 && _data.hours === 0){
            // PAGAMENTO DA HORA FIXA
            price = getFormattedMoney(configAvulso.horaFixa);
        } else {
            // Duração com tolerância
            const durationWithTolerance = getReservationDuration(reservation).add(parseInt(configAvulso.tolerancia), 'minutes');
            if(durationWithTolerance._data.days === 0 && durationWithTolerance._data.hours === 0){
                // PAGAMENTO DA HORA FIXA
                price = getFormattedMoney(configAvulso.horaFixa);
            }
        }
        
    }

    return price;
}