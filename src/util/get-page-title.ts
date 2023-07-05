// custom
import { ROUTES } from "../routes/routes.enum";

const getPageTitle = (path: string): string => {
    if (path === ROUTES.HOME) return 'home'
    if (path.startsWith('/edit/')) return 'edit'
    return 'not found'
}

export default getPageTitle
