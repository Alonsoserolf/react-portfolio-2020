import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { Projects } from '../pages/Portfolio'
import { Resume } from '../pages/Resume'
import { Contact } from '../pages/Contact'

export const siteLinks = [
  { name: 'Alonso.', path: '/', },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/portfolio' },
  { name: 'Resume', path: '/resume' },
  { name: 'Contact', path: '/contact' }
]

export const routes = [
    { name: 'Alonso.', path: '/', component: Home, exact: true},
    // { name: 'Login', path: '/login', component: Login },
    { name: 'About', path: '/about', component: About },
    { name: 'Projects', path: '/portfolio', component: Projects },
    { name: 'Resume', path: '/resume', component: Resume },
    { name: 'Contact', path: '/contact', component: Contact }
]
