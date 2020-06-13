import React, { useState } from 'react'
import { Switch } from 'react-router-dom'
import { Nav } from '../../components/Nav'
import { PageBorder } from '../../components/PageBorder'
import {routes} from '../../router'
import {RouteWithSubRoutes} from '../../shared/lib/SubRouteHandler'
import { useSelector, useDispatch } from 'react-redux';

import './App.sass'

function App({store}) {
  let [menuOpen, setMenuOpen] = useState(false)
  const openMenu = () => setMenuOpen(!menuOpen)
  return (
    <div className={menuOpen ? "App menu-open" : "App"}>
      <Nav openMenu={openMenu}></Nav>
      <Switch>
        {routes.map((route, i)=><RouteWithSubRoutes key={i} {...route}></RouteWithSubRoutes>)}
      </Switch>
      <PageBorder />
    </div>
  )
}

export default App;
