import { Layout } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { UserContext } from '../../../contexts/UserContext'
import { useEmitter } from '../../../hooks/useEmitter'
import Content from '../../template/Content/Content'
import Footer from '../../template/Footer/Footer'
import Header from '../../template/Header/Header'
import Sidebar from '../../template/Sidebar/Sidebar'
import { LayoutComponent } from './Dashboard.styles'

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false)
    const [mobile, setMobile] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { emitter } = useEmitter()
    const { user } = useContext(UserContext)

    useEffect(() => {
        emitter('sidebar').on('toggle', (value: boolean) => {
            setCollapsed(value)
        })
    }, [emitter])

    useEffect(() => {
        setMobile(window.innerWidth <= 768)
        window.addEventListener('resize', () => {
            setMobile(window.innerWidth <= 768)
        })

        if (!user) navigate(`/?redirectURL=${location.pathname}`)
    }, [location.pathname, navigate, user])

    useEffect(() => {
        if (mobile) setCollapsed(true)
        else setCollapsed(false)
    }, [mobile])

    return (
        <React.Fragment>
            <LayoutComponent className='text-uppercase'>
                <Layout.Header
                    className='p-0'
                    style={{ height: 'auto' }}
                >
                    <Header />
                </Layout.Header>
                <Layout>
                    {!mobile && (
                        <Layout.Sider
                            width={collapsed ? 80 : 280}
                            style={{ backgroundColor: '#fff' }}
                        >
                            <Sidebar />
                        </Layout.Sider>
                    )}
                    <Layout.Content style={{ padding: '0px' }}>
                        <Content />
                    </Layout.Content>
                </Layout>
                <Layout.Footer className='p-0'>
                    <Footer />
                </Layout.Footer>
            </LayoutComponent>
            {mobile && <Sidebar />}
        </React.Fragment>
    )
}
