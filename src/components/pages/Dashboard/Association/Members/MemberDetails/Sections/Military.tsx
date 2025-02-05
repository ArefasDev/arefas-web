import { Typography } from 'antd'
import React from 'react'
import { useUtils } from '../../../../../../../hooks/useUtils'
import { Member } from '../../../../../../../types/MemberType'

export default function MilitarySection({ member }: { member?: Member }) {
    const { firstUppercase } = useUtils()

    return (
        <React.Fragment>
            <Typography.Title level={4}>Informações Militares</Typography.Title>
            <Typography>
                <strong>Unidade que Serviu</strong>:{' '}
                {member?.military.unitServed}
            </Typography>
            <Typography>
                <strong>Ano que Serviu</strong>: {member?.military.yearServed}
            </Typography>
            <Typography>
                <strong>Força Armada</strong>:{' '}
                {firstUppercase(member?.military.armedForces || '')}
            </Typography>
            <Typography>
                <strong>Patente</strong>:{' '}
                {firstUppercase(member?.military.patent || '')}
            </Typography>
            <Typography>
                <strong>Nome de Guerra</strong>: {member?.military.nickname}
            </Typography>
            <Typography>
                <strong>Número de Guerra</strong>: {member?.military.number}
            </Typography>
            <Typography>
                <strong>Companhia</strong>: {member?.military.company}
            </Typography>
        </React.Fragment>
    )
}
