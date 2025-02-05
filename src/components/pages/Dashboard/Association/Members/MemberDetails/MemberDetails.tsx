import { Card, message, Spin } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { baseURL } from '../../../../../../globals'
import { Member } from '../../../../../../types/MemberType'
import AssociationSection from './Sections/Association'
import Contact from './Sections/Contact'
import MilitarySection from './Sections/Military'
import PersonalSection from './Sections/Personal'

export default function MemberDetails() {
    const { id } = useParams()
    const [member, setMember] = useState<Member>()
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
        const getMember = async (id: string) => {
            setLoading(true)
            try {
                const response = await axios.get(`${baseURL}/doc`, {
                    params: {
                        id,
                        path: 'members',
                    },
                })

                setMember(response.data)
                setLoading(false)
            } catch (err: unknown) {
                setLoading(false)
                if (axios.isAxiosError(err)) {
                    const message = err.response?.data.message || err.message
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

        if (id) getMember(id)
    }, [id, messageApi])

    return (
        <Spin spinning={loading}>
            <Card className='border'>
                {contextHolder}
                <PersonalSection member={member} />
                <div className='mb-3' />
                <MilitarySection member={member} />
                <div className='mb-3' />
                <Contact member={member} />
                <div className='mb-3' />
                <AssociationSection member={member} />
            </Card>
        </Spin>
    )
}
