import { Button, Form, Input, Steps, Typography, message } from 'antd'
import { FirebaseError } from 'firebase/app'
import {
    sendEmailVerification,
    signInWithEmailAndPassword,
    updatePassword,
} from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../../firebase'

type FirstAccessFormProps = {
    setFormType: React.Dispatch<
        React.SetStateAction<'login' | 'firstAccess' | 'forgotPassword'>
    >
}

const FirstAccessForm: React.FC<FirstAccessFormProps> = ({ setFormType }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginAndVerifyEmail = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                'arefas123'
            )
            const user = userCredential.user

            if (!user.emailVerified) {
                await sendEmailVerification(user)
                message.info(
                    'Um e-mail de verificação foi enviado. Verifique sua caixa de entrada.'
                )
                return
            }

            message.success('E-mail verificado com sucesso!')
            setCurrentStep(1)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/user-not-found')
                    message.error('Usuário não encontrado.')
                else if (error.code === 'auth/wrong-password')
                    message.error('Senha incorreta.')
                else message.error('Erro ao fazer login. Tente novamente.')
            } else message.error('Erro inesperado. Tente novamente.')
        }
    }

    const changePassword = async () => {
        try {
            const user = auth.currentUser
            if (!user) {
                message.error('Você precisa estar logado para alterar a senha.')
                return
            }

            await updatePassword(user, password)
            auth.signOut()
            message.success(
                'Senha alterada com sucesso! Retornando ao login...'
            )
            setFormType('login')
        } catch (e: unknown) {
            console.log(e)
            message.error('Erro ao alterar a senha. Tente novamente.')
        }
    }

    const steps = [
        {
            title: 'Login e Verificação',
            content: (
                <Form layout='vertical'>
                    <Form.Item
                        name='email'
                        label='E-mail'
                        rules={[
                            { required: true, message: 'Informe seu e-mail' },
                        ]}
                    >
                        <Input
                            size='large'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Button
                        type='primary'
                        className='w-100 mt-2'
                        size='large'
                        onClick={loginAndVerifyEmail}
                    >
                        Verificar E-mail
                    </Button>
                </Form>
            ),
        },
        {
            title: 'Alterar Senha',
            content: (
                <Form layout='vertical'>
                    <Form.Item
                        name='newPassword'
                        label='Nova Senha'
                        rules={[
                            {
                                required: true,
                                min: 6,
                                message: 'Informe uma senha válida',
                            },
                        ]}
                    >
                        <Input.Password
                            size='large'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Button
                        type='primary'
                        className='w-100'
                        size='large'
                        onClick={changePassword}
                    >
                        Finalizar
                    </Button>
                </Form>
            ),
        },
    ]

    return (
        <div>
            <Steps current={currentStep}>
                {steps.map((step, index) => (
                    <Steps.Step
                        key={index}
                        title={step.title}
                    />
                ))}
            </Steps>
            <div style={{ marginTop: 20 }}>{steps[currentStep].content}</div>
            <div className='mt-2'>
                <Typography.Link onClick={() => setFormType('login')}>
                    Voltar ao login
                </Typography.Link>
            </div>
        </div>
    )
}

export default FirstAccessForm
