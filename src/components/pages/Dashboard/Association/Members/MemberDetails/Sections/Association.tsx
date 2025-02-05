import { Typography } from 'antd'
import React from 'react'
import { useUtils } from '../../../../../../../hooks/useUtils'
import { Member } from '../../../../../../../types/MemberType'

export default function AssociationSection({ member }: { member?: Member }) {
    const { firstUppercase } = useUtils()

    return (
        <React.Fragment>
            <Typography.Title level={4}>Contato</Typography.Title>
            <Typography>
                <strong>Categoria</strong>:{' '}
                {firstUppercase(member?.association.category || '')}
            </Typography>
            <Typography>
                <strong>Data da Associação</strong>:{' '}
                {new Date(
                    member?.association.associationDate as string
                ).toLocaleDateString()}
            </Typography>
            <Typography>
                <strong>Validade</strong>:{' '}
                {new Date(
                    member?.association.validityDate as string
                ).toLocaleDateString()}
            </Typography>
            <Typography>
                <strong>Status do Associado</strong>:{' '}
                {firstUppercase(member?.association.status || '')}
            </Typography>
        </React.Fragment>
    )
}
