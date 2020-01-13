import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Title from 'antd/lib/typography/Title'
import { Row, Col, Button, Modal, Input, message } from 'antd';
import { getFormattedMoney, currencyConfig } from '../../helpers/money';
import { updateCustomerLooseConfigs, updateCustomerDayConfigs } from '../../handlers/parkings';
import IntlCurrencyInput from "react-intl-currency-input"
import QRCode from 'qrcode.react';


export default function Settings() {
    const dispatch = useDispatch();
    const systemParking = useSelector(state => state.system.parking);
    const [horaFixa, setHoraFixa] = useState('');
    const [horaExcedente, sethoraExcedente] = useState('');
    const [modalLoose, setModalLoose] = useState(false);
    const [tolerancia, setTolerancia] = useState('');
    const [requestLoading, setRequestLoading] = useState(false);
    const [modalConfigDay, setModalConfigDay] = useState(false);
    const [timeDay, setTimeDay] = useState('');
    
    const clearState = () => {
        setHoraFixa('');
        sethoraExcedente('');
        setTolerancia('')
    }

    const printDiv= (qrcode)=>{
        var printContents = document.getElementById(qrcode).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    const handleUpdateConfig = () => {
        if(!horaFixa || !horaExcedente || tolerancia === '') message.error('Preencha todas as informações');
        else {
            setRequestLoading(true);
            dispatch(updateCustomerLooseConfigs({
                horaFixa,
                horaExcedente,
                tolerancia,
                estacionamento: systemParking._id
            })).then(data => {
                setRequestLoading(false);
                if(data){
                    message.success('Configurações salvas');
                    clearState();
                    setModalLoose(false);
                }
            })
        }
    }

    const handleUpdateConfigDay = () => {
        if(timeDay === '' || !horaFixa || !horaExcedente || tolerancia === '') message.error('Preencha todas as informações');
        else {
            setRequestLoading(true);
            dispatch(updateCustomerDayConfigs({
                tempo: timeDay,
                precoDiaria: horaFixa,
                horaExcedente,
                tolerancia,
                estacionamento: systemParking._id
            })).then(data => {
                setRequestLoading(false);
                if(data){
                    message.success('Configurações salvas');
                    clearState();
                    setModalConfigDay(false);
                }
            })
        }
    }

    return (
        <div>
            <Title level={2}> Configurações </Title>
            <Row gutter={22}>
                <Col md={12}>
                    <div className='card-white' style={{ flexDirection: 'column' }}>
                        <Title level={4}> Reservas avulsas </Title>

                        {!systemParking.avulso ?
                            <Button type='primary' onClick={() => setModalLoose(true)}> Criar configuração </Button>
                            : 
                            <div>
                                <p>Valor da primeira hora <b style={{color: '#4ba021'}}> {getFormattedMoney(systemParking.avulso.horaFixa)}</b></p>
                                <p>Valor das horas excedentes <b style={{color: '#4ba021'}}> {getFormattedMoney(systemParking.avulso.horaExcedente)}</b></p>
                                <p>Tempo de tolerância <b> {systemParking.avulso.tolerancia} Minutos</b></p>
                                <Button type='primary' onClick={() => setModalLoose(true)}> Configurar </Button>
                            </div>
                        }
                    </div>
                </Col>
                <Col md={12}>
                    <div className='card-white mt-2 mt-lg-0' style={{ flexDirection: 'column' }}>
                        <Title level={4}> Reservas diarias </Title>

                        {!systemParking.diario ?
                            <Button type='primary' onClick={() => setModalConfigDay(true)}> Criar configuração </Button>
                            : 
                            <div>
                                <p>Tempo da diaria <b> {systemParking.diario.tempo} Horas</b></p>
                                <p>Valor da diaria <b style={{color: '#4ba021'}}> {getFormattedMoney(systemParking.diario.precoDiaria)}</b></p>
                                <p>Valor das horas excedentes <b style={{color: '#4ba021'}}> {getFormattedMoney(systemParking.diario.horaExcedente)}</b></p>
                                <p>Tempo de tolerância <b> {systemParking.diario.tolerancia} Minutos</b></p>
                                <Button type='primary' onClick={() => setModalConfigDay(true)}> Configurar </Button>
                            </div>
                        }
                    </div>
                    <div className='card-white mt-2 mt-lg-0' style={{ flexDirection: 'column' }}>
                        <Title level={4}> QR CODE de acesso aos recibos do cliente </Title>
                    <div id="qrcode">
                    <p> Este código qr irá redirecionar os clientes do estacionamento para a página de recibos</p>
                    <QRCode renderAs='svg'value={`/comprovantedigital/${systemParking._id}`} />
                    </div>
                    <Button type='primary' onClick={() =>printDiv('qrcode')}>Imprimir</Button>
                    </div>
                </Col>
            </Row>
            
            <Modal visible={modalLoose} onCancel={() => {
                setModalLoose(false);
                clearState();
            }} title={null} footer={null}>
                <Title level={4}> Qual será o preço da primeira hora ? </Title>
                <IntlCurrencyInput
                    style={{ maxWidth: '200px' }}
                    className='custom-input'
                    currency="BRL"
                    config={currencyConfig}
                    value={horaFixa}
                    onChange={(event, value, maskedValue) => {
                        setHoraFixa(value);
                    }}
                />

                <Title level={4} style={{ marginTop: '20px' }}> Qual será o preço das demais horas ? </Title>
                <p>Caso o preço da hora seja sempre fixa, duplique os valores</p>
                <IntlCurrencyInput
                    style={{ maxWidth: '200px' }}
                    className='custom-input'
                    currency="BRL"
                    config={currencyConfig}
                    value={horaExcedente}
                    onChange={(event, value, maskedValue) => {
                        sethoraExcedente(value);
                    }}
                />

                <Title level={4} style={{ marginTop: '20px' }}> Qual o tempo de tolerância ? </Title>
                <p>Após o tempo de tolerância será cobrado o preço da hora excedente</p>

                <Input
                    style={{ maxWidth: '200px' }}
                    step={0}
                    value={tolerancia}
                    onChange={(e) => {
                        const { value } = e.target;
                        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                            setTolerancia(value);
                        }
                    }}
                    placeholder='0'
                    suffix='Minutos'
                />

                <Button 
                    loading={requestLoading}
                    type='primary'
                    style={{display: 'block', margin: '20px auto 0px auto'}}
                    onClick={handleUpdateConfig}
                >
                    Salvar
                </Button>
            </Modal>

            <Modal visible={modalConfigDay} onCancel={() => {
                setModalConfigDay(false);
                clearState();
            }} title={null} footer={null}>
                <Title level={4}> Qual o tempo da diária ?</Title>
                <Input
                    style={{ maxWidth: '200px' }}
                    step={0}
                    value={timeDay}
                    onChange={(e) => {
                        const { value } = e.target;
                        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                            setTimeDay(parseInt(value) || '');
                        }
                    }}
                    placeholder='0'
                    suffix='Horas'
                />

                <Title level={4} style={{ marginTop: '20px' }}> Qual será o preço da diária ? </Title>
                <IntlCurrencyInput
                    style={{ maxWidth: '200px' }}
                    className='custom-input'
                    currency="BRL"
                    config={currencyConfig}
                    value={horaFixa}
                    onChange={(event, value, maskedValue) => {
                        setHoraFixa(value);
                    }}
                />

                <Title level={4} style={{ marginTop: '20px' }}> Qual será o preço da hora após o período da diária ? </Title>
                <IntlCurrencyInput
                    style={{ maxWidth: '200px' }}
                    className='custom-input'
                    currency="BRL"
                    config={currencyConfig}
                    value={horaExcedente}
                    onChange={(event, value, maskedValue) => {
                        sethoraExcedente(value);
                    }}
                />

                <Title level={4} style={{ marginTop: '20px' }}> Qual o tempo de tolerância ? </Title>
                <p>Após o tempo de tolerância será cobrado o preço da hora excedente</p>

                <Input
                    style={{ maxWidth: '200px' }}
                    step={0}
                    value={tolerancia}
                    onChange={(e) => {
                        const { value } = e.target;
                        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                            setTolerancia(value);
                        }
                    }}
                    placeholder='0'
                    suffix='Minutos'
                />

                <Button 
                    loading={requestLoading}
                    type='primary'
                    style={{display: 'block', margin: '20px auto 0px auto'}}
                    onClick={handleUpdateConfigDay}
                >
                    Salvar
                </Button>
            </Modal>
        </div>
    )
}
