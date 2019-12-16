import moment from "moment";
import { getFormattedMoney } from "./money";

export const RESERVATION_STATUS = {
    OPEN: 'Aberta',
    CLOSED: 'Fechada',
    CANCELED: 'Cancelada'
}

export const RESERVATION_TYPE = {
    AVULSA: 'Avulsa',
    DIARIA: 'Diaria',
    MENSAL: 'Mensal'
}

export const getReservationDuration = (reservation, closed = false) => {
    let diffDuration = moment.duration(moment(closed ? reservation.saida : new Date()).diff(moment(reservation.entrada), 'seconds'), 'seconds');
    return diffDuration;
}

export const getReservationDurationFormatted = (reservation, closed = false) => {
    let diffDuration = getReservationDuration(reservation, closed);

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
    const configDiaria = parking.diario;
    
    const duration = getReservationDuration(reservation);        
    let price = 0;

    if(reservation.tipo === RESERVATION_TYPE.AVULSA){
        // DURAÇÃO COM TOLERÂNCIA
        const durationWithTolerance = moment.duration({ hours: 1, minutes: configAvulso.tolerancia });
        if(duration.asMilliseconds() < durationWithTolerance.asMilliseconds()){
            // PAGAMENTO DA HORA FIXA
            price = getFormattedMoney(configAvulso.horaFixa);
        } else {
            let diffDuration = duration.asSeconds() - moment.duration({ hours: 1}).asSeconds();
            let diffMoment = moment.duration(diffDuration, 'seconds');
            let aditionalForMinutes = diffMoment._data.minutes > configAvulso.tolerancia ? 1 : 0;
            let priceAditional = (parseInt(diffMoment.asHours()) + aditionalForMinutes) * configAvulso.horaExcedente;

            price = configAvulso.horaFixa + priceAditional
        }
    } else if(reservation.tipo === RESERVATION_TYPE.DIARIA){
        // DURAÇÃO COM TOLERÂNCIA
        const durationWithTolerance = moment.duration({ hours: configDiaria.tempo, minutes: configDiaria.tolerancia });
        if(duration.asMilliseconds() < durationWithTolerance.asMilliseconds()){
            // PAGAMENTO DA DIARIA
            price = getFormattedMoney(configDiaria.precoDiaria);
        } else {
            let diffDuration = duration.asSeconds() - moment.duration({ hours: configDiaria.tempo}).asSeconds();
            let diffMoment = moment.duration(diffDuration, 'seconds');
            let aditionalForMinutes = diffMoment._data.minutes > configDiaria.tolerancia ? 1 : 0;
            let priceAditional = (parseInt(diffMoment.asHours()) + aditionalForMinutes) * configDiaria.horaExcedente;
            price = configDiaria.precoDiaria + priceAditional
        }
    }

    return price;
}

export const getReservationPriceFormatted = (reservation, parking) => {
    return getFormattedMoney(getReservationPrice(reservation, parking));
}