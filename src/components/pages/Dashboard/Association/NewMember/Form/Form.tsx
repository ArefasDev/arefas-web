import { Form as AntdForm, Button, Card, message, Spin } from 'antd'
import axios from 'axios'
import { formatToCPF } from 'brazilian-values'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
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

type Data = {
    member: Member
    id: string
}

export default function Form({
    data,
    cancelEdit,
}: {
    data?: Data
    cancelEdit?: () => void
}) {
    const [formData, setFormData] = useState<Member>({} as Member)
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [reload, reloading] = useReload()
    const [form] = AntdForm.useForm()

    const handleChange = useCallback(
        (data: Member[Sections], type: Sections) =>
            setFormData(
                (p) =>
                    ({
                        ...p,
                        [`${type}`]: {
                            ...p[type],
                            ...data,
                        },
                    } as Member)
            ),
        []
    )

    const saveMember = async () => {
        setLoading(true)
        try {
            if (!isEditing) {
                await axios.post(`${baseURL}/members`, formData)
                messageApi.open({
                    type: 'success',
                    content: 'Associado salvo',
                })
            } else if (data && data.id) {
                await axios.put(`${baseURL}/doc`, {
                    path: 'members',
                    id: data.id,
                    data: formData,
                })
                messageApi.open({
                    type: 'success',
                    content: 'Associado atualizado',
                })
            } else throw { message: 'ID não encontrado' }

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

    useEffect(() => {
        if (data && data.member) {
            console.log(data.member)
            setFormData(data.member)
            setIsEditing(true)
            form.setFieldsValue({
                ...data.member.personal,
                cpf: formatToCPF(data.member?.personal?.cpf),
                'civil-status': data.member.personal.civilStatus,
                'blood-type': data.member.personal.bloodType,
                'birth-date': dayjs(
                    data.member.personal.birthDate,
                    'DD/MM/YYYY'
                ),
                ...data.member.military,
                'unit-served': data.member.military.unitServed,
                'year-served': dayjs(data.member.military.yearServed, 'YYYY'),
                'armed-forces': data.member.military.armedForces,
                ...data.member.contact,
                'social-medias': data.member.contact.socialMedias,
                ...data.member.association,
                'association-date': dayjs(
                    data.member.association.associationDate,
                    'YYYY-MM-DDTHH:mm:ss.SSSZ'
                ),
                'validity-date': dayjs(
                    data.member.association.validityDate,
                    'YYYY-MM-DDTHH:mm:ss.SSSZ'
                ),
            })
        }
    }, [data, form])

    useEffect(() => {
        console.log(formData)
    }, [formData])

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
                        <Association
                            onChange={handleChange}
                            form={form}
                        />
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
                            onClick={isEditing ? cancelEdit : reload}
                        >
                            <FaXmark /> {isEditing ? 'Cancelar' : 'Limpar'}
                        </Button>
                    </AntdForm>
                )}
            </Card>
        </Spin>
    )
}
