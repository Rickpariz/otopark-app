import moment from 'moment-timezone';
import 'moment/locale/pt-br';

moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo');

const Moment = moment;


export default Moment;

