import { List, Typography } from 'antd'
import React from 'react'
import { Member } from '../../../../../../../types/MemberType'

export default function Contact({ member }: { member?: Member }) {
    return (
        <React.Fragment>
            <Typography.Title level={4}>Contato</Typography.Title>
            <Typography className='fw-bold'>E-mails</Typography>
            <List
                size='small'
                bordered
                dataSource={member?.contact.emails}
                renderItem={(item) => <List.Item>{item.email}</List.Item>}
            ></List>
            <Typography className='fw-bold mt-3'>Telefones</Typography>
            <List
                size='small'
                bordered
                dataSource={member?.contact.phones}
                renderItem={(item) => <List.Item>{item.phone}</List.Item>}
            ></List>
            <Typography className='fw-bold mt-3'>Endereços</Typography>
            <List
                size='small'
                bordered
                dataSource={member?.contact.addresses}
                renderItem={(item) => <List.Item>{item.cep}</List.Item>}
            ></List>
            <Typography className='fw-bold mt-3'>Redes Sociais</Typography>
            <List
                size='small'
                bordered
                dataSource={member?.contact.socialMedias}
                renderItem={(item) => <List.Item>{item.username}</List.Item>}
            ></List>
        </React.Fragment>
    )
}
