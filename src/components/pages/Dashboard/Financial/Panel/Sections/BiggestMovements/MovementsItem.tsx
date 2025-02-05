import { Card, Typography } from 'antd'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

type Movement = {
    name: string
    value: number
    percentage: number
    variation: number
}

export default function MovementsItem({ movement }: { movement: Movement }) {
    const variationColor = () =>
        movement.variation >= 0 && movement.value >= 0
            ? 'green'
            : movement.variation <= 0 && movement.value <= 0
            ? 'green'
            : 'red'

    return (
        <Card
            className='border'
            styles={{
                body: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '5px 0',
                },
            }}
        >
            {movement.value >= 0 ? (
                <FaCaretUp style={{ fontSize: 25, color: 'green' }} />
            ) : (
                <FaCaretDown style={{ fontSize: 25, color: 'red' }} />
            )}
            <div>
                <Typography.Text>{movement.name}</Typography.Text>
                <br />
                <Typography.Text className='fw-bold'>
                    {movement.value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </Typography.Text>
            </div>
            <div className='text-end'>
                <Typography.Text style={{ fontSize: '10px' }}>
                    {movement.percentage}% do total
                </Typography.Text>
                <br />
                <Typography.Text
                    style={{
                        fontSize: '10px',
                        color: variationColor(),
                    }}
                    className='d-flex align-items-center justify-content-end'
                >
                    {movement.variation >= 0 ? (
                        <FaCaretUp
                            style={{
                                fontSize: 10,
                                color: variationColor(),
                            }}
                        />
                    ) : (
                        <FaCaretDown
                            style={{
                                fontSize: 10,
                                color: variationColor(),
                            }}
                        />
                    )}
                    {Math.abs(movement.variation)}%{' '}
                    {movement.variation >= 0 ? 'de alta' : 'de redução'}
                </Typography.Text>
            </div>
        </Card>
    )
}
