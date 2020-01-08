import React from 'react'
import { useSelector, useDispach} from 'react-redux';
import { Layout, Menu, Icon, Typography } from 'antd';
import { Route, Switch } from 'react-router-dom';
import ManageEmployees from '../users/ManageEmployees';
import ManageCustomers from '../customers/ManageCustomers';
import ManageVehicles from '../vehicles/ManageVehicles';
import ManageGarage from '../garage/ManageGarage';
import Settings from '../users/Settings';
import ManageReservations from '../reservations/ManageReservations';

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;
const { Title } = Typography;

export default function TemplateUsers(props) {
    const userLogged = useSelector(store => store.system.user);
    const { history } = props;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div style={{
                    height: '32px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    margin: '16px'
                }} />

                <Menu theme="dark" mode="inline" defaultSelectedKeys={'1'}>
                    <Menu.Item key="1" onClick={() => history.push('/dashboard')}>
                        <Icon type="dashboard" />
                        <span className="nav-text">Dashboard</span>
                    </Menu.Item>
                    { <Menu.Item key="2" onClick={() => history.push('/dashboard/funcionarios')}>
                        <Icon type="user" />
                        <span className="nav-text">Funcionários</span>
                    </Menu.Item> }
                    <Menu.Item key="2" onClick={() => history.push('/dashboard/garagem')}>
                        <Icon type="container" />
                        <span className="nav-text">Garagem</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => history.push('/dashboard/reservas')}>
                        <Icon type="database" />
                        <span className="nav-text">Reservas</span>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => history.push('/dashboard/clientes')}>
                        <Icon type="user" />
                        <span className="nav-text">Clientes</span>
                    </Menu.Item>
                    <Menu.Item key="5" onClick={() => history.push('/dashboard/veiculos')}>
                        <Icon type="car" />
                        <span className="nav-text">Veiculos</span>
                    </Menu.Item>
                    {userLogged.tipo == 'Dono' && 
                    <Menu.Item key="6" onClick={() => history.push('/dashboard/configuracoes')}>
                        <Icon type="setting" />
                        <span className="nav-text">Configurações</span>
                    </Menu.Item>
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '16px' }}>
                    <Switch>
                        <Route exact path='/admin/dashboard' render={() => (
                            <Title> Dashboard </Title>
                        )}/>

                        <Route path='/dashboard/garagem' component={ManageGarage}/>
                        <Route path='/dashboard/reservas' component={ManageReservations}/>
                        <Route path='/dashboard/funcionarios' component={ManageEmployees}/>
                        <Route path='/dashboard/clientes' component={ManageCustomers}/>
                        <Route path='/dashboard/veiculos' component={ManageVehicles}/>
                        <Route path='/dashboard/configuracoes' component={Settings}/>

                    </Switch>
                    
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Content</div> */}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Otopark @2019 </Footer>
            </Layout>
        </Layout>
    )
}
