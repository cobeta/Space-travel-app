import { NavLink, Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <div className='rootLayout'>
            <Navbar/>
            <main>
                <Outlet />
            </main>
            {/* Footer can go here */}
        </div>
    );
};

export default RootLayout;