import { Avatar, Button, Dropdown, message, theme, Typography } from 'antd'
import { useContext, useState } from 'react'
import {
    FaBars,
    FaChevronDown,
    FaMoneyBill,
    FaSitemap,
    FaUser,
    FaUsers,
} from 'react-icons/fa'
import { FaMobileScreen } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router'
import logo from '../../../assets/arefas.png'
import { UserContext } from '../../../contexts/UserContext'
import { auth } from '../../../firebase'
import { useEmitter } from '../../../hooks/useEmitter'

export default function Header() {
    const { token } = theme.useToken()
    const { emitter } = useEmitter()
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const { user } = useContext(UserContext)
    const modulesMenu = [
        {
            label: (
                <Link
                    className='d-flex align-items-center gap-2'
                    to='/dashboard/association'
                    style={{ textDecoration: 'none' }}
                >
                    <FaUsers /> Associados
                </Link>
            ),
            key: 'members',
        },
        {
            label: (
                <Link
                    className='d-flex align-items-center gap-2'
                    to='/dashboard/financial'
                    style={{ textDecoration: 'none' }}
                >
                    <FaMoneyBill /> Financeiro
                </Link>
            ),
            key: 'financial',
        },
        {
            label: (
                <Link
                    className='d-flex align-items-center gap-2'
                    to='/dashboard/mobile'
                    style={{ textDecoration: 'none' }}
                >
                    <FaMobileScreen /> Aplicativo
                </Link>
            ),
            key: 'mobile',
        },
    ]

    const userMenu = [
        {
            label: 'Sair',
            key: 'logout',
            onClick: () => {
                messageApi.open({
                    type: 'info',
                    content: 'Desconectando sua conta...',
                })
                setTimeout(() => {
                    auth.signOut()
                    navigate('/')
                }, 1000)
            },
        },
    ]

    const toggleSidebar = () => {
        emitter('sidebar').emit('toggle', !collapsed)
        setCollapsed(!collapsed)
    }

    return (
        <div
            className='d-flex justify-content-between align-items-center p-2 px-4 border-bottom'
            style={{ backgroundColor: token.colorPrimary }}
        >
            {contextHolder}
            <div className='d-flex align-items-center gap-2'>
                <Button
                    icon={<FaBars />}
                    onClick={toggleSidebar}
                    type='text'
                    style={{ color: 'white' }}
                    data-sidebar-toggle
                />
                <img
                    src={logo}
                    alt='logo'
                    style={{ width: '25px' }}
                />
                <Typography.Title
                    level={4}
                    className='m-0 text-white'
                >
                    AREFAS
                </Typography.Title>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <Dropdown menu={{ items: modulesMenu }}>
                    <Button>
                        <FaSitemap />
                        <span className='d-none d-sm-flex align-items-center'>
                            Módulos
                            <FaChevronDown
                                className='ms-2'
                                size={12}
                            />
                        </span>
                    </Button>
                </Dropdown>
                <Dropdown menu={{ items: userMenu }}>
                    <Button>
                        {user ? (
                            <Avatar
                                src={user.photoURL}
                                size={25}
                            />
                        ) : (
                            <FaUser />
                        )}
                        <span className='d-none d-sm-flex align-items-center'>
                            {user
                                ? user?.displayName?.split(' ')[0]
                                : 'Usuário'}
                            <FaChevronDown
                                className='ms-2'
                                size={12}
                            />
                        </span>
                    </Button>
                </Dropdown>
            </div>
        </div>
    )
}
