import React, { useState, useEffect } from 'react'
import { Modal, Tooltip, Row, Col, Card, Button, Icon, Divider, notification } from 'antd';
import { getReservationDurationFormatted, getReservationPrice, getReservationPriceFormatted } from '../../helpers/reservation';
import Moment from '../../helpers/CustomMoment';
import { useSelector, useDispatch } from 'react-redux';
import IntlCurrencyInput from "react-intl-currency-input"
import { currencyConfig } from '../../helpers/money';
import { finalizedReservation } from '../../handlers/reservations';

export default function ModalReservationDetails(props) {
    const { visible, onCancel, reservation } = props;
    const systemParking = useSelector(state => state.system.parking);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [requestLoading, setRequestLoading] = useState(false);
    
    const handlefinalizedReservation = () => {
        setRequestLoading(true);

        let finalValue = price > 1 ? price : getReservationPrice(reservation, systemParking);
        dispatch(finalizedReservation({
            reserva: reservation._id,
            preco: finalValue
        })).then(res => {
            if(res) {
                onCancel();
                setModal(false);
                notification.success({
                    message: `Reserva finalizada com sucesso`
                })
            }

            setRequestLoading(false);
        })
    }

    return (
        <>
            <Modal
                visible={visible}
                footer={null}
                title={null}
                onCancel={onCancel}
                width='600px'
            >
                <div style={{
                    margin: '0 auto', padding: '20px', textAlign: 'center',
                    maxWidth: '300px',
                    background: '#f3f3f3',
                    marginTop: '20px',
                    marginBottom: '10px',
                    fontSize: '30px',
                    fontWeight: 600
                }}
                >
                    <Tooltip placement="topLeft" title="Tempo de reserva" arrowPointAtCenter>
                        {reservation && getReservationDurationFormatted(reservation)}
                    </Tooltip>
                </div>

                <p
                    style={{
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontSize: '20px',
                        fontWeight: '700'
                    }}
                >
                    {reservation.tipo}
                </p>

                <Row type='flex' gutter={22}>
                    <Col md={12}>
                        <Card.Meta
                            style={{ width: '100%' }}
                            avatar={<Icon type='user' style={{
                                background: '#1890ff',
                                padding: '10px',
                                borderRadius: '50px',
                                color: 'white'
                            }} />}
                            title={
                                <Tooltip placement="topLeft" title="Cliente" arrowPointAtCenter>
                                    {reservation.cliente.nome}
                                </Tooltip>
                            }
                            description={
                                <Tooltip placement="topLeft" title="Telefone" arrowPointAtCenter>
                                    {reservation.cliente.telefone || '-'}
                                </Tooltip>
                            }
                        />
                    </Col>
                    <Col md={12}>
                        <Card.Meta
                            style={{ width: '100%' }}
                            avatar={<Icon type='car' style={{
                                background: '#1890ff',
                                padding: '10px',
                                borderRadius: '50px',
                                color: 'white'
                            }} />}
                            title={
                                <Tooltip placement="topLeft" title="Modelo do veículo" arrowPointAtCenter>
                                    {reservation.veiculo.modelo || '-'}
                                </Tooltip>

                            }
                            description={
                                <Tooltip placement="topLeft" title="Placa do veículo" arrowPointAtCenter>
                                    {reservation.veiculo.placa}
                                </Tooltip>
                            }
                        />

                    </Col>
                </Row>
                <Row type='flex' align='middle' style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <Col md={12}>
                        <Card.Meta
                            style={{ width: '100%' }}
                            avatar={<Icon type='download' style={{
                                background: '#1890ff',
                                padding: '10px',
                                borderRadius: '50px',
                                color: 'white'
                            }} />}
                            title={'Entrada'}
                            description={
                                <Tooltip placement="topLeft" title="Entrada do veículo" arrowPointAtCenter>
                                    {reservation.entrada ? Moment(reservation.entrada).format('lll') : '-'}
                                </Tooltip>
                            }
                        />
                    </Col>
                    <Col md={12}>
                        <Card.Meta
                            style={{ width: '100%' }}
                            avatar={<Icon type='euro' style={{
                                background: '#1890ff',
                                padding: '10px',
                                borderRadius: '50px',
                                color: 'white'
                            }} />}
                            title={'Valor da reserva'}
                            description={
                                <span style={{color: '#08bf08', fontSize: '18px'}}>
                                    {getReservationPriceFormatted(reservation, systemParking)}
                                </span>
                            }
                        />
                        
                    </Col>
                </Row>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '40px auto 0 auto', width: '430px' }}>
                    <Button type='danger'> Descartar reserva</Button>
                    <Button > Editar reserva</Button>
                    <Button type='primary' onClick={() => {
                        setModal(true)
                    }}> Finalizar reserva</Button>
                </div>
            </Modal>

            <Modal
                visible={modal}
                title={null}
                footer={null}
                onCancel={() => {
                    onCancel();
                    setModal(false)
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        padding: '40px 0px 20px',
                    }}
                >
                    <div>
                        Finalizar reserva por
                        <span style={{color: '#08bf08', marginLeft: '10px'}}>
                            {getReservationPriceFormatted(reservation, systemParking)}
                        </span>
                    </div>
                    <Divider>Ou</Divider>
                    <IntlCurrencyInput
                        style={{ maxWidth: '200px' }}
                        className='custom-input'
                        currency="BRL"
                        config={currencyConfig}
                        value={price}
                        onChange={(event, value, maskedValue) => {
                            setPrice(value);
                        }}
                    />

                    <Button
                        loading={requestLoading}
                        style={{marginTop: '20px'}}
                        type='primary'
                        onClick={handlefinalizedReservation}
                    > Finalizar</Button>
                </div>
            </Modal>
        </>
    )
}
