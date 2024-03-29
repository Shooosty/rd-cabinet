import { createSandbox } from 'vue-kindergarten'
import RouteGoverness from '~/governesses/RouteGoverness'

import child from '~/store/child'

export default (context) => {
  const { route, redirect, store } = context
  route.matched.some((routeRecord) => {
    const options = routeRecord.components.default.options
    const perimeter = options.routePerimeter
    const Governess = options.routeGoverness || RouteGoverness
    const action = options.routePerimeterAction || 'route'

    if (perimeter) {
      const sandbox = createSandbox(child(store), {
        governess: new Governess(context),

        perimeters: [perimeter],
      })

      return sandbox.guard(action, { redirect })
    }
  })
}
