import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { siteLinks } from '../../router'
import './index.sass'
export const Nav = ({ openMenu }) => (
  <Fragment>
    <nav className="menu-drawr">
      <div className="portfolio-pic">
        <img src="#" alt="Alonso's Profile" />
      </div>
      <ul>
        {siteLinks.map((link, i) => (
          <li key={i+link.name} onClick={openMenu} >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <header className="root-header">
      <Link to="/" className="site-title hide-half">AlONSO.</Link>
      <button className="menu-button" onClick={openMenu}>
        <i className="menu-icon">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </i>
      </button>
    </header>
    <div className="menu-bg" onClick={openMenu}>
      <Link to="/" className="site-title text-white">AlONSO.</Link>
    </div>
  </Fragment>
)
