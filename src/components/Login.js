import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd'
import { login } from '../handlers/system';

function Login({ form, history }) {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const [requestLoading, setRequestLoading] = useState(false);

    const submit = () => {
        form.validateFields((err, values) => {
            if(!err){
                setRequestLoading(true);
                dispatch(login(values)).then(user => {
                    setRequestLoading(false);
                    if(user) history.push('/login/estacionamentos')
                })
            }
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
            <div style={{ padding: 24, background: '#fff', minHeight: 360, minWidth: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Form 
                    style={{
                        minWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Preencha o email' }],
                        })(
                            <Input
                                prefix={<Icon type="google" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder='Email'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('senha', {
                            rules: [{ required: true, message: 'Preencha a senha' }],
                        })(
                            <Input
                                type='password'
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder='Senha'
                            />
                        )}
                    </Form.Item>

                    <Button type='primary' onClick={submit} loading={requestLoading}> Entrar </Button>
                </Form>
            </div>
        </div>
    )
}

export default Form.create({ name: 'form-login' })(Login)
