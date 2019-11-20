import React from 'react'
import { Modal, Tooltip, Row, Col, Card, Button, Icon } from 'antd';
import { getReservationDuration } from '../../helpers/reservation';
import Moment from '../../helpers/CustomMoment';

export default function ModalReservationDetails(props) {
    const {visible, onCancel, reservationSelected} = props;

    return (
        <Modal
            visible={visible}
            footer={null}
            title={null}
            onCancel={onCancel}
            width='600px'
        >
            <div
                style={{
                    margin: '0 auto', padding: '20px', textAlign: 'center',
                    maxWidth: '300px',
                    background: '#f3f3f3',
                    marginTop: '20px',
                    marginBottom: '40px',
                    fontSize: '30px',
                    fontWeight: 600
                }}
            >
                <Tooltip placement="topLeft" title="Tempo de reserva" arrowPointAtCenter>
                    {reservationSelected && getReservationDuration(reservationSelected)}
                </Tooltip>
            </div>
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
                                {reservationSelected && reservationSelected.cliente.nome ? reservationSelected.cliente.nome : '--'}
                            </Tooltip>
                        }
                        description={
                            <Tooltip placement="topLeft" title="Telefone" arrowPointAtCenter>
                                {reservationSelected && reservationSelected.cliente.telefone ? reservationSelected.cliente.telefone : '--'}
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
                                {reservationSelected && reservationSelected.veiculo.modelo ? reservationSelected.veiculo.modelo : '--'}
                            </Tooltip>

                        }
                        description={
                            <Tooltip placement="topLeft" title="Placa do veículo" arrowPointAtCenter>
                                {reservationSelected && reservationSelected.veiculo.placa ? reservationSelected.veiculo.placa : '--'}
                            </Tooltip>
                        }
                    />

                </Col>
            </Row>
            <Row type='flex' align='middle' style={{ marginTop: '30px', marginBottom: '20px' }}>
                <Col xs={4} md={2}>
                    <Icon type='download' style={{
                        background: '#1890ff',
                        padding: '10px',
                        borderRadius: '50px',
                        color: 'white'
                    }} />
                </Col>
                <Col xs={10}>
                    <Tooltip placement="topLeft" title="Entrada do veículo" arrowPointAtCenter>
                        {reservationSelected ? Moment(reservationSelected.entrada).format('lll') : ''}
                    </Tooltip>
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '40px auto 0 auto', width: '430px' }}>
                <Button type='danger'> Cancelar reserva</Button>
                <Button > Editar reserva</Button>
                <Button type='primary'> Finalizar reserva</Button>
            </div>
        </Modal>
    )
}
