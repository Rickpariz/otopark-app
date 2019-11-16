import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Title from 'antd/lib/typography/Title'
import { Row, Col, Button, Modal, Input, InputNumber, message } from 'antd';
import { getFormattedMoney, getMoney, currencyConfig } from '../../helpers/money';
import { updateCustomerLooseConfigs } from '../../handlers/parkings';
import IntlCurrencyInput from "react-intl-currency-input"

export default function Settings() {
    const dispatch = useDispatch();
    const systemParking = useSelector(state => state.system.parking);
    const [horaFixa, setHoraFixa] = useState('');
    const [horaExcedente, sethoraExcedente] = useState('');
    const [modalLoose, setModalLoose] = useState(false);
    const [tolerancia, setTolerancia] = useState('');
    const [requestLoading, setRequestLoading] = useState(true);

    useEffect(() => {

    }, [dispatch])

    console.log(systemParking);

    const handleUpdateConfig = () => {

        if(!horaFixa || !horaExcedente || tolerancia == '') message.error('Preencha todas as informações');
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
                    setModalLoose(false);
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
                    <div className='card-white'>
                        <Title level={4}> Perfil </Title>
                    </div>
                </Col>
            </Row>

            <Modal visible={modalLoose} onCancel={() => setModalLoose(false)} title={null} footer={null}>
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
                    type='primary'
                    style={{display: 'block', margin: '20px auto 0px auto'}}
                    onClick={handleUpdateConfig}
                >
                    Salvar
                </Button>
            </Modal>
        </div>
    )
}
