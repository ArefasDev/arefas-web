import { Layout } from 'antd'
import styled from 'styled-components'

const LayoutComponent = styled(Layout)`
    height: 100vh;
    overflow: hidden;

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
        padding: 2px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
    }
`

export { LayoutComponent }
