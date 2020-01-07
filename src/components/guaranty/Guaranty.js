import React, { useState, useEffect } from 'react'
import { Spin, InputNumber, Input, Button, Timeline, Icon, Tooltip } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Axios, base_api_url } from '../../handlers/config';
import { getReservationDurationFormatted, RESERVATION_STATUS } from '../../helpers/reservation';
import Moment from '../../helpers/CustomMoment';
import {getFormattedMoney} from '../../helpers/money';
import {getFormattedRg} from '../../helpers/formatters'

export default function Guaranty(props) {
    const { parkingId } = props.match.params;

    const [parking, setParking] = useState(null);
    const [findParkingLoading, setFindParkingLoading] = useState(true);
    const [findReservations, setFindReservations] = useState(false);
    const [rg, setRg] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [showReservations, setShowReservations] = useState(false);

    useEffect(() => {
        Axios.get(`${base_api_url}estacionamentos/${parkingId}`).then(({ data }) => {
            setParking(data);
        }).catch(res => {
            setParking(null);
            console.log(res);
        }).finally(res => setFindParkingLoading(false))
    }, [parkingId])

    const handleChange = (e) => {
        let value = e.target.value;
        if (value.length <= 9) {
            setRg(value);
        }
    }

    const handleFindReservation = () => {
        setFindReservations(true);
        Axios.get(`${base_api_url}reservas/comprovantedigital`, {
            params: { estacionamento: parkingId, rg }
        }).then(({ data }) => {
            console.log(data);
            if (data) {
                setReservations(data);
                setShowReservations(true);
            }
        }).catch((err) => {
            console.log(err);
        }).finally(res => {
            setFindReservations(false);
        })
    }

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            minWidth: '100vw',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {!showReservations && <Spin spinning={findParkingLoading} style={{ width: '100%' }}>
                <div className='card-login-parking' style={{ padding: 24, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    {!findParkingLoading && !parking && <Title level={3}>Ops ! Parece que algo deu errado, tente novamente mais tarde. </Title>}

                    {!findParkingLoading && parking &&
                        <>
                            <Title level={3}>Bem vindo ao {parking.nome} </Title>
                            <p>Informe o seu RG para consultar os comprovantes de suas reservas.</p>

                            <Input
                                style={{ maxWidth: '200px' }}
                                value={rg}
                                onChange={handleChange}
                            />
                            <span style={{ marginTop: '5px', fontSize: '12px' }}>* Apenas números</span>

                            <Button type='primary' className='mt-3' loading={findReservations} disabled={!rg} onClick={handleFindReservation}> Buscar </Button>
                        </>
                    }
                </div>
            </Spin>
            }

            {/* RESEVATION LIST */}

            {showReservations &&
                <Timeline>
                    {reservations.map(reservation => {
                        const { veiculo, cliente } = reservation;
                        return (
                            <Timeline.Item>
                                <h4 style={{ fontSize: 20 }}>{Moment(reservation.entrada).format('LLL')}</h4>
                                <div style={{ padding: 20, backgroundColor: '#FFF', minWidth: '300px' }}>

                                    <Tooltip placement="topLeft" title="Duração da reserva" arrowPointAtCenter>
                                        <h4 style={{ fontSize: 20, textAlign: 'center' }}>{getReservationDurationFormatted(reservation)}</h4>
                                    </Tooltip>
                                    {reservation.status==RESERVATION_STATUS.CLOSED &&
                                        <div className='text-center'>
                                            <h3> Preço pago: <span style={{ color: '#90ee90', marginLeft: '10px'}}>{getFormattedMoney(reservation.preco)}</span></h3>
                                        </div>
                                    }
                                    <div className='text-center'>
                                    <h3> Nome: <span style={{ marginLeft: '10px'}}>{reservation.cliente.nome}</span></h3>
                                    <h3> RG: <span style={{ marginLeft: '10px'}}>{getFormattedRg(reservation.cliente.rg)}</span></h3>
                                    <h3> Saida: <span style={{marginLeft: '10px'}}>{Moment(reservation.saida).format('lll')}</span></h3>
                                    </div>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className='d-flex justify-content-between container align-items-center'>
                                            <Tooltip placement="topLeft" title="Modelo do veículo" arrowPointAtCenter className='d-flex align-items-center justify-content-center'>
                                                <Icon type="car" style={{ fontSize: 18, marginRight: 10 }} />
                                                <span className='title'>{veiculo.modelo}</span>
                                            </Tooltip>

                                            <Tooltip placement="topLeft" title="Tipo da reserva" arrowPointAtCenter className='d-flex align-items-center justify-content-center'>
                                                <Icon type="barcode" style={{ fontSize: 18, marginRight: 10 }} />
                                                <span className='text-secondary'>{veiculo.placa}</span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className='text-center mt-3'>
                                    <h6 >{parking.nome} - {parking.endereco}</h6>
                                    </div>
                                </div>
                            </Timeline.Item>
                        )
                    })}
                </Timeline>
            }
        </div>
    )
}
