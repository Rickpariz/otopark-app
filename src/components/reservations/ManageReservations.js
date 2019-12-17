import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Icon, Divider, Tooltip, Button, Spin } from 'antd'
import { getReservations } from '../../handlers/reservations';
import { RESERVATION_STATUS, getReservationDurationFormatted } from '../../helpers/reservation';
import { getFormattedMoney } from '../../helpers/money';

const { Title } = Typography;

export default function ManageReservations() {

    const dispatch = useDispatch();
    const systemParking = useSelector(state => state.system.parking);
    const reservations = useSelector(state => state.reservations.list);

    useEffect(() => {
        async function effectReservation() {
            await dispatch(getReservations({
                estacionamento: systemParking._id,
                status: RESERVATION_STATUS.CLOSED
            }));
        }

        effectReservation();
        return () => dispatch({ type: 'RESERVATIONS_CLEAR' })
    }, [dispatch])

    return (
        <div>
            <div className='d-flex justify-content-start'>
                {/* <Title level={2}>Reservas fechadas</Title> */}
            </div>
            
            <div className='row align-items-start'>
                {reservations.map(r => <CardReservation key={r._id} reservation={r} />)}
            </div>
        </div>
    )
}


function CardReservation(props) {
    const { reservation } = props;
    const { cliente, vaga, veiculo } = reservation;

    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className='card-reservation'>
            <div className='d-flex justify-content-between align-items-center container'>
                <Tooltip placement="topLeft" title="Código da vaga" arrowPointAtCenter>
                    <span className='title nowrap-one-line-ellipsis'>{vaga.codigo}</span>
                </Tooltip>

                <Tooltip placement="topLeft" title="Tipo da reserva" arrowPointAtCenter>
                    <Icon type="tag" style={{ fontSize: 18, marginRight: 10 }} />
                    <span className='text-secondary'>{reservation.tipo}</span>
                </Tooltip>
            </div>
            <Divider />
            <div className='d-flex align-items-center justify-content-around'>
                <span className='price'>
                    <Tooltip placement="topLeft" title="Preço final da reserva" arrowPointAtCenter>
                        {getFormattedMoney(reservation.preco)}
                    </Tooltip>
                </span>

                <Tooltip placement="topLeft" title="Duração da reserva" arrowPointAtCenter>
                    <Icon type="hourglass" style={{ fontSize: 18, marginRight: 5 }} />
                    <span className='text-secondary'>
                        {getReservationDurationFormatted(reservation, true)}
                    </span>
                </Tooltip>
            </div>
            {!seeMore &&
                <div className='d-flex justify-content-center mt-2'>
                    <Button type='link' onClick={() => setSeeMore(true)}>Mais informações</Button>
                </div>
            }

            {seeMore &&
                <React.Fragment>
                    <Divider />
                    <div className='d-flex align-items-center mt-2'>
                        <div className='d-flex justify-content-between container align-items-center'>
                            <Tooltip placement="topLeft" title="Modelo do veículo" arrowPointAtCenter>
                                <span className='title'>{veiculo.modelo}</span>
                            </Tooltip>

                            <Tooltip placement="topLeft" title="Tipo da reserva" arrowPointAtCenter>
                                <Icon type="barcode" style={{ fontSize: 18, marginRight: 10 }} />
                                <span className='text-secondary'>{veiculo.placa}</span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='d-flex align-items-center mt-3'>
                        <div className='d-flex justify-content-between container align-items-center'>
                            <Tooltip placement="topLeft" title="Nome do cliente" arrowPointAtCenter>
                                <span className='title'>{cliente.nome}</span>
                            </Tooltip>

                            <Tooltip placement="topLeft" title="Telefone do cliente" arrowPointAtCenter>
                                <Icon type="phone" style={{ fontSize: 18, marginRight: 10 }} />
                                <span className='text-secondary'>{cliente.telefone}</span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        <Button type='link' onClick={() => setSeeMore(false)}>Menos informações</Button>
                    </div>
                </React.Fragment>
            }

        </div>
    )
}
