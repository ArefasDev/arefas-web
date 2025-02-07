import { Button, Form, Input, Typography, message } from 'antd'
import { FirebaseError } from 'firebase/app'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase'

type ForgotPasswordFormProps = {
    setFormType: React.Dispatch<
        React.SetStateAction<'login' | 'firstAccess' | 'forgotPassword'>
    >
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
    setFormType,
}) => {
    const [messageApi, contextHolder] = message.useMessage()

    const handleForgotPassword = async (values: { email: string }) => {
        try {
            await sendPasswordResetEmail(auth, values.email)
            messageApi.success(
                'E-mail para redefinição de senha enviado com sucesso! Verifique sua caixa de entrada.'
            )
            setFormType('login')
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/user-not-found')
                    messageApi.error('Usuário não encontrado.')
                else
                    messageApi.error(
                        'Erro ao enviar o e-mail de redefinição. Tente novamente.'
                    )
            } else messageApi.error('Erro inesperado. Tente novamente.')
        }
    }

    return (
        <Form
            layout='vertical'
            onFinish={handleForgotPassword}
        >
            {contextHolder}
            <Form.Item
                name='email'
                label='E-mail'
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message:
                            'Informe um e-mail válido para recuperar a senha',
                    },
                ]}
            >
                <Input
                    size='large'
                    type='email'
                />
            </Form.Item>
            <Button
                type='primary'
                className='w-100'
                size='large'
                htmlType='submit'
            >
                Recuperar Senha
            </Button>
            <div className='mt-2'>
                <Typography.Link onClick={() => setFormType('login')}>
                    Voltar ao login
                </Typography.Link>
            </div>
        </Form>
    )
}

export default ForgotPasswordForm
