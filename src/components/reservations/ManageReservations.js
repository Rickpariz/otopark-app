import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Divider, Tooltip, Button, Spin } from 'antd'
import { getReservations } from '../../handlers/reservations';
import { RESERVATION_STATUS, getReservationDurationFormatted } from '../../helpers/reservation';
import { getFormattedMoney } from '../../helpers/money';
import InfiniteScroll from 'react-infinite-scroll-component';



export default function ManageReservations() {
    const limit = 20;
    var counter = 0;
    const dispatch = useDispatch();
    const systemParking = useSelector(state => state.system.parking);
    const reservations = useSelector(state => state.reservations.list);
    const [hasMore, setHasMore] = useState(true);

    async function effectReservation() {
        const response = await dispatch(getReservations({
            estacionamento: systemParking._id,
            status: RESERVATION_STATUS.CLOSED,
            pagination: {
                offset: limit * counter, // global variable 
                limit
            }
        }));

        const { hasNextPage } = response;
        setHasMore(hasNextPage);
    }

    useEffect(() => {
        if(reservations.length === 0) effectReservation();
        
        return () => dispatch({ type: 'RESERVATIONS_CLEAR' })
    }, [])

    const fetchMoreData = () => {
        counter++;
        effectReservation();
    };

    return (
        <div>
            <div className='d-flex justify-content-start'>
                {/* <Title level={2}>Reservas fechadas</Title> */}
            </div>
            {/* <div className='row align-items-start justify-content-center'> */}
                <InfiniteScroll
                    className='row align-items-start justify-content-center'
                    dataLength={reservations.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <div className='d-flex container justify-content-center mt-3'>
                            <Spin />
                        </div>
                    }
                    endMessage={
                        <div className='d-flex container justify-content-center mt-3' style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#a09898'
                        }}>
                            Todas reservas foram listadas &#128516;
                        </div>
                    }
                >
                    {reservations.map(r => <CardReservation key={r._id} reservation={r} />)}
                </InfiniteScroll>
            {/* </div> */}

        </div >
    )
}


function CardReservation(props) {
    const { reservation } = props;
    const { cliente, vaga, veiculo } = reservation;

    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className='card-reservation'>
            <div className='row justify-content-between align-items-center container-fluid pl-2 pr-2 m-0'>
                <Tooltip placement="topLeft" title="Código da vaga" arrowPointAtCenter>
                    <span className='title nowrap-one-line-ellipsis'>{vaga.codigo}</span>
                </Tooltip>

                <Tooltip placement="topLeft" title="Tipo da reserva" arrowPointAtCenter className='d-flex align-items-center justify-content-center'>
                    <Icon type="tag" style={{ fontSize: 18, marginRight: 10 }} />
                    <span className='text-secondary'>{reservation.tipo}</span>
                </Tooltip>
            </div>
            <Divider />
            <div className='row align-items-center justify-content-lg-around justify-content-sm-center text-center'>
                <div className='col-sm-12 col-lg-6 price'>
                    <Tooltip placement="topLeft" title="Preço final da reserva" arrowPointAtCenter>
                        {getFormattedMoney(reservation.preco)}
                    </Tooltip>
                </div>

                <div className='col-sm-12 col-lg-6 text-secondary'>
                    <Tooltip placement="topLeft" title="Duração da reserva" arrowPointAtCenter className='d-flex align-items-center justify-content-center'>
                        <Icon type="hourglass" style={{ fontSize: 18, marginRight: 5 }} />
                        {getReservationDurationFormatted(reservation, true)}
                    </Tooltip>
                </div>

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

                            <Tooltip placement="topLeft" title="Tipo da reserva" arrowPointAtCenter className='d-flex align-items-center justify-content-center'>
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

                            <Tooltip placement="topLeft" title="Telefone do cliente" arrowPointAtCenter className='d-flex align-items-center justify-content-center'>
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
