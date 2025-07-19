import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className='rootLayout'>
            <nav>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/spacecrafts">Spacecrafts</NavLink>
                <NavLink to="/planets">Planets</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
            {/* Footer can go here */}
        </div>
    );
};

export default RootLayout;