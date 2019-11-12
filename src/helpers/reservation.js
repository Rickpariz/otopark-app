import moment from "moment";

export const getReservationDuration = (reservation) => {
    let diffDuration = moment.duration(moment().diff(moment(reservation.entrada), 'seconds'), 'seconds');

    if(diffDuration._data.days > 0){
        return moment(diffDuration._data).format('DD [Dias] HH [Horas] mm [Minutos]')
    } else if(diffDuration._data.hours > 0){
        return moment(diffDuration._data).format('HH [Horas] mm [Minutos]')
    } else {
        return moment(diffDuration._data).format('mm [Minutos]')
    }
}