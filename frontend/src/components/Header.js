import { useEffect, useRef } from 'react';
import logo from '../assets/images/logo.png';
import userImg from '../assets/images/avatar-icon.png';
import '../App.css';
import { BiMenu } from 'react-icons/bi';
import { NavLink, Link } from 'react-router-dom';

const navLinks = [
  {
    path: '/',
    display: 'HomePage'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    if (headerRef.current) {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    }
  };

  useEffect(() => {
    const onScroll = () => handleStickyHeader();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []); // Ensure the effect runs only once on mount and cleanup on unmount

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };

  return (
    <header className="headerforhome flex items-center" ref={headerRef}>
      <div className="containerforhome">
        <div className="flex items-center justify-between">
          {/* ========= logo ======== */}
          <div className='h-15 w-25'>
            <img src={logo} alt="logo" />
          </div>

          {/* ======= menu ====== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menuforhome flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? 'text-primarycolor text-[16px] leading-7 font-[600]'
                        : 'text-textcolor text-[16px] leading-7 font-[500] hover:text-primarycolor'
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== nav right ======== */}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img src={userImg} className="w-full rounded-full" alt="User" />
                </figure>
              </Link>
            </div>

            <Link to="/login">
              <button className="bg-primarycolor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Login
              </button>
            </Link>

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
