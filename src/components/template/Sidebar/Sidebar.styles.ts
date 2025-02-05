import { Menu } from 'antd'
import styled from 'styled-components'

const StyledMenu = styled(Menu)<{ $collapsed: boolean; $open: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 10px;

    & .ant-menu.ant-menu-sub {
        position: relative;
    }

    & ul.ant-menu.ant-menu-sub::before {
        content: '';
        display: block;
        height: 100%;
        background: #a6adb9;
        width: 1px;
        position: absolute;
    }

    & .ant-menu-item {
        padding: ${({ $collapsed }) =>
            $collapsed ? '6px 12px' : '6px 15px'} !important;
        font-size: 16px !important;
        line-height: normal !important;
        height: auto !important;
        border-radius: 30px !important;
        margin: 0px !important;
    }

    & .ant-menu-submenu-title {
        padding: ${({ $collapsed }) =>
            $collapsed ? '6px 12px' : '6px 15px'} !important;
        font-size: 16px !important;
        line-height: normal !important;
        height: auto !important;
        border-radius: 30px !important;
        margin: 0px !important;
    }

    & .ant-menu-sub {
        padding-left: 15px !important;
        background-color: transparent !important;
    }

    @media (max-width: 768px) {
        position: fixed;
        top: 49px;
        bottom: 31px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1000;
        height: calc(100vh - 49px - 31px) !important;
        transition: all 0.3s ease-in-out;
        transform: translateX(${({ $open }) => ($open ? '0px' : '-100%')});
        z-index: 1000;
    }
`

export { StyledMenu }
