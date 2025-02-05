import { ConfigProvider, ThemeConfig } from 'antd'
import React from 'react'
import { UserProvider } from '../contexts/UserContext'
import Router from '../router'

function App() {
    const customTheme: ThemeConfig = {
        token: {
            colorPrimary: '#005528',
            colorPrimaryBg: '#d1ded6',
            colorLink: '#005528',
        },
    }

    return (
        <React.StrictMode>
            <ConfigProvider theme={customTheme}>
                <UserProvider>
                    <Router />
                </UserProvider>
            </ConfigProvider>
        </React.StrictMode>
    )
}

export default App
