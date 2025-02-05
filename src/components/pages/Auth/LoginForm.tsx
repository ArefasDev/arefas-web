import { Button, Form, Input, Typography, message } from 'antd'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { auth } from '../../../firebase'

type LoginFormProps = {
    setFormType: React.Dispatch<
        React.SetStateAction<'login' | 'firstAccess' | 'forgotPassword'>
    >
}

const LoginForm: React.FC<LoginFormProps> = ({ setFormType }) => {
    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        try {
            if (password === 'arefas123') {
                message.info(
                    'Precisamos alterar a senha e verificar o seu email.'
                )
                setFormType('firstAccess')
                return
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user

            if (!user.emailVerified) {
                message.error(
                    'Seu e-mail ainda não foi verificado. Clique em "Primeiro acesso" para completar a verificação.'
                )
                return
            }

            message.success('Login realizado com sucesso!')
            navigate('/dashboard/association')
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/user-not-found')
                    message.error('Usuário não encontrado.')
                else if (
                    error.code === 'auth/wrong-password' ||
                    error.code === 'auth/invalid-credential'
                )
                    message.error('Senha incorreta.')
                else message.error('Erro ao fazer login. Tente novamente.')
            } else message.error('Erro inesperado. Tente novamente.')
        }
    }

    return (
        <Form
            layout='vertical'
            onFinish={(d) => login(d.email, d.password)}
        >
            <Form.Item
                name='email'
                label='E-mail'
                rules={[{ required: true, message: 'Informe o seu e-mail' }]}
            >
                <Input
                    size='large'
                    type='email'
                />
            </Form.Item>
            <Form.Item
                name='password'
                label='Senha'
                rules={[
                    {
                        required: true,
                        min: 6,
                        message: 'Informe uma senha válida',
                    },
                ]}
            >
                <Input.Password size='large' />
            </Form.Item>
            <Button
                type='primary'
                className='w-100'
                size='large'
                htmlType='submit'
            >
                Entrar
            </Button>
            <div className='mt-2'>
                <Typography.Link onClick={() => setFormType('firstAccess')}>
                    Primeiro acesso
                </Typography.Link>
                <br />
                <Typography.Link onClick={() => setFormType('forgotPassword')}>
                    Esqueci a senha
                </Typography.Link>
            </div>
        </Form>
    )
}

export default LoginForm
