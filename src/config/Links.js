import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiSettings,
  FiUser,
  FiHelpCircle,
  FiStar,
  FiUsers,
} from 'react-icons/fi';

export const Links = [
  { icon: <FiHome />, label: 'Početna', path: '/' },
  { icon: <FiPieChart />, label: 'Portfolio', path: '/portfolio' },
  { icon: <FiDollarSign />, label: 'Transakcije', path: '/transactions' },
  { icon: <FiStar />, label: 'Favoriti', path: '/watchlist' },

];

export const ProfileLinks = [
  { icon: <FiUser />, label: 'Nalog', path: '/account' },
  { icon: <FiSettings />, label: 'Podešavanja', path: '/settings' },
  {icon:<FiUsers/>,label:'Zajednica',path:'/community'},
  { icon: <FiHelpCircle />, label: 'Pomoć', path: '/help' },
]

export const primaryNavLinks = Links.slice(0, 4); // For desktop header
