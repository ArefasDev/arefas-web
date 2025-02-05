import { Typography } from 'antd'
import { Link } from 'react-router'

export default function Footer() {
    return (
        <div className='bg-white p-1 px-2 border-top'>
            <div className='d-flex justify-content-center align-items-center'>
                <Typography.Text className='m-0 text-center'>
                    &copy; 2024 AREFAS - Desenvolvido e mantido por{' '}
                    <Link
                        to='https://www.github.com/Vanortton'
                        target='_blank'
                    >
                        VANSISTEM
                    </Link>
                </Typography.Text>
            </div>
        </div>
    )
}
