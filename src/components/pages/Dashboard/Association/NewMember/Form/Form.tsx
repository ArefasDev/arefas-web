import { Form as AntdForm, Button, Card, message, Spin } from 'antd'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { baseURL } from '../../../../../../globals'
import { useReload } from '../../../../../../hooks/useReload'
import { Member } from '../../../../../../types/MemberType'
import Association from './Association/Association'
import Contact from './Contact/Contact'
import Military from './Military/Military'
import Personal from './Personal/Personal'
type Sections = 'personal' | 'military' | 'contact' | 'association'

export default function Form() {
    const [formData, setFormData] = useState<Member>({} as Member)
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, reloading] = useReload()
    const [form] = AntdForm.useForm()

    const handleChange = useCallback(
        (data: Member[Sections], type: Sections) =>
            setFormData(
                (p) =>
                    ({
                        ...p,
                        [`${type}`]: data,
                    } as Member)
            ),
        []
    )

    const saveMember = async () => {
        setLoading(true)
        try {
            await axios.post(`${baseURL}/members`, formData)
            messageApi.open({
                type: 'success',
                content: 'Associado salvo',
            })

            form.resetFields()
            setFormData({} as Member)
            setLoading(false)
            reload()
        } catch (err: unknown) {
            setLoading(false)
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.message
                messageApi.open({
                    type: 'error',
                    content: message,
                })
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Erro desconhecido',
                })
            }
        }
    }

    return (
        <Spin spinning={loading}>
            <Card className='border mt-3'>
                {contextHolder}
                {reloading ? null : (
                    <AntdForm
                        form={form}
                        onFinish={saveMember}
                    >
                        <Personal onChange={handleChange} />
                        <Military onChange={handleChange} />
                        <Contact onChange={handleChange} />
                        <Association onChange={handleChange} />
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='mt-2'
                        >
                            <FaSave /> Salvar
                        </Button>
                        <Button
                            type='default'
                            htmlType='reset'
                            className='mt-2 ms-2'
                            onClick={reload}
                        >
                            <FaXmark /> Limpar
                        </Button>
                    </AntdForm>
                )}
            </Card>
        </Spin>
    )
}
