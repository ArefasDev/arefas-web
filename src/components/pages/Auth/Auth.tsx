import { Card, Spin, theme, Typography } from 'antd'
import { onAuthStateChanged, UserInfo } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/arefas.png'
import background from '../../../assets/background-army.png'
import { UserContext } from '../../../contexts/UserContext'
import { auth } from '../../../firebase'
import FirstAccessForm from './FirstAccessForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import LoginForm from './LoginForm'

type FormType = 'login' | 'firstAccess' | 'forgotPassword'

export default function Auth() {
    const [loading, setLoading] = useState<boolean>(false)
    const { token } = theme.useToken()
    const [formType, setFormType] = useState<FormType>('login')
    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const { setUser } = useContext(UserContext)

    const getRedirectURL = () => {
        const hash = window.location.hash
        const params = new URLSearchParams(hash.split('?')[1])
        return params.get('redirectURL')
    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false)
            const userInfo = {
                photoURL: user?.photoURL,
                displayName: user?.displayName,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                providerId: user?.providerId,
            }
            setUser(userInfo as UserInfo)
            if (user && formType === 'login' && user.emailVerified === true) {
                const redirectURL = getRedirectURL()
                navigate(redirectURL || '/dashboard/association')
            }
        })

        return () => unsubscribe()
    }, [formType, navigate, setUser])

    const renderForm = () => {
        switch (formType) {
            case 'firstAccess':
                return <FirstAccessForm setFormType={setFormType} />
            case 'forgotPassword':
                return <ForgotPasswordForm setFormType={setFormType} />
            default:
                return <LoginForm setFormType={setFormType} />
        }
    }

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{
                height: '100vh',
                backgroundImage: `linear-gradient(to bottom, #2b4f1524, #2b4f1524), url(${background})`,
                backgroundBlendMode: 'overlay',
                backgroundSize: '200px',
                backgroundRepeat: 'repeat',
            }}
        >
            <Spin spinning={loading}>
                <Card
                    style={{
                        width: '100%',
                        maxWidth: '830px',
                        background: 'white',
                        border: 'none',
                    }}
                    className='rounded-5 p-2'
                >
                    <div className='d-flex gap-5'>
                        <div
                            style={{ width: '50%' }}
                            className='d-none d-md-block'
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <img
                                    src={logo}
                                    alt='Logo'
                                    style={{ width: '70px' }}
                                />
                                <div className='ms-4'>
                                    <Typography.Title
                                        level={1}
                                        className='m-0 fw-bold'
                                        style={{
                                            color: token.colorPrimary,
                                        }}
                                    >
                                        AREFAS
                                    </Typography.Title>
                                    <p
                                        className='m-0'
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '18px',
                                        }}
                                    >
                                        Associação dos Reservistas <br />
                                        do Exército de Feira de Santana
                                    </p>
                                </div>
                            </div>
                            <Typography.Title
                                level={2}
                                className='fw-bold mb-1'
                            >
                                Entre na sua conta
                            </Typography.Title>
                            <p>Use seu e-mail e senha para acessar.</p>
                            <ul>
                                <li>
                                    <strong>Primeiro acesso</strong>: Caso
                                    esteja acessando o sistema pela primeira
                                    vez, clique em 'Primeiro acesso'.
                                </li>
                                <li>
                                    <strong>Esqueceu a senha</strong>: Clique em
                                    'Esqueci minha senha' para escolher uma nova
                                    senha.
                                </li>
                            </ul>
                        </div>
                        <div
                            style={{
                                width: windowWidth < 768 ? '100%' : '50%',
                            }}
                        >
                            <div className='d-flex d-md-none justify-content-center align-items-center gap-2 mb-3'>
                                <img
                                    src={logo}
                                    alt='AREFAS'
                                    width={40}
                                />
                                <Typography.Title
                                    level={2}
                                    className='fw-bold m-0'
                                >
                                    Entre na sua Conta
                                </Typography.Title>
                            </div>
                            {renderForm()}
                        </div>
                    </div>
                </Card>
            </Spin>
        </div>
    )
}
