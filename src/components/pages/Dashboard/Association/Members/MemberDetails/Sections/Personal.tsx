import { Col, Image, Row, Typography } from 'antd'
import React from 'react'
import noImage from '../../../../../../../assets/avatar.webp'
import { useUtils } from '../../../../../../../hooks/useUtils'
import { Member } from '../../../../../../../types/MemberType'

export default function PersonalSection({ member }: { member?: Member }) {
    const { firstUppercase } = useUtils()

    return (
        <React.Fragment>
            <Typography.Title level={4}>Informações Pessoais</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col>
                    <Image
                        height={150}
                        src={member?.personal.avatar || ''}
                        fallback={noImage}
                        className='rounded border'
                    />
                </Col>
                <Col>
                    <Typography>
                        <strong>Nome</strong>: {member?.personal.name || ''}
                    </Typography>
                    <Typography>
                        <strong>Sexo</strong>:{' '}
                        {firstUppercase(member?.personal.sex || '')}
                    </Typography>
                    <Typography>
                        <strong>CPF</strong>: {member?.personal.cpf || ''}
                    </Typography>
                    <Typography>
                        <strong>Profissão</strong>:{' '}
                        {member?.personal.profession || ''}
                    </Typography>
                    <Typography>
                        <strong>Estado Civil</strong>:{' '}
                        {firstUppercase(member?.personal.civilStatus || '')}
                    </Typography>
                    <Typography>
                        <strong>Data de Nascimento</strong>:{' '}
                        {firstUppercase(member?.personal.birthDate || '')}
                    </Typography>
                    <Typography>
                        <strong>Tipo Sanguíneo</strong>:{' '}
                        {firstUppercase(member?.personal.bloodType || '')}
                    </Typography>
                </Col>
            </Row>
        </React.Fragment>
    )
}
