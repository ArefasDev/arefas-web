import { Outlet } from 'react-router-dom'
import { ContentComponent } from './Content.styles'

export default function Content() {
    return (
        <ContentComponent>
            <Outlet />
        </ContentComponent>
    )
}
