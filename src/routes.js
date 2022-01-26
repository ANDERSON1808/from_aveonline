import Index from './components/Index'
import InvoiceIndex from './components/facturas/Index'
import InvoiceCreate from './components/facturas/Create'
import PromotionsIndex from './components/promocion/Index'
import PromotionsCreate from './components/promocion/Create'
import MedicinesIndex from './components/productos/Index'
import MedicinesCreate from './components/productos/Create'
import SimulateIndex from './components/simulate/Index'

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/facturas',
        component: InvoiceIndex
    },
    {
        path: '/facturas/crear',
        component: InvoiceCreate
    },
    {
        path: '/promociones',
        component: PromotionsIndex
    },
    {
        path: '/promociones/crear',
        component: PromotionsCreate
    },
    {
        path: '/medicinas',
        component: MedicinesIndex
    },
    {
        path: '/medicinas/crear',
        component: MedicinesCreate
    },
    {
        path: '/simulador',
        component: SimulateIndex
    }
];

export default routes;