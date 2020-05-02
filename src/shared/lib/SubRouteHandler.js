import React from 'react'
import { Route } from 'react-router-dom'

export const RouteWithSubRoutes = function (route) {
  return (
    <Route
      path={route.path}
      render={props => {
        // pass the sub-routes down to keep nesting
        console.log({props})
       return  <route.component {...props} routes={route.routes} />
      }}
    />
  );
}
