import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ active }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed top-4 right-4 z-50 bg-yellow-600 text-white p-2 rounded"
                >
                    {isOpen ? (
                        // "X" Icon when sidebar is open
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Hamburger Icon when sidebar is closed
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            <aside
                id="sidebar"
                className={`flex flex-col w-[320px] h-screen fixed bg-white dark:bg-black transition-transform transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:flex`}
            >
                <div className="flex flex-col items-center mb-2 ">
                    <h4 className="mx-2 mt-2 font-bold text-black dark:text-white">RAJI OTHMANE</h4>
                </div>

                <div className="border-b h-1"></div>

                <div className="flex flex-col justify-between flex-1 mt-6 overflow-y-auto">
                    <nav>
                        <Link to="/Dashboard" id="dashboard" className={`flex items-center px-4 py-2 ${active === 'dashboard' ? 'text-yellow-600' : ''} rounded-lg cursor-pointer text-gray-300`}>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207" />
                            </svg>
                            <span className="mx-4 font-medium">Dashboard</span>
                        </Link>

                        <Link to="/Clients" className={` ${active === 'clients' ? 'text-yellow-600' : ''} flex items-center px-4 py-2 mt-5 text-gray-300 hover:text-yellow-600 transition-colors duration-300 transform rounded-lg`}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-medium">Clients</span>
                        </Link>

                        <Link to="/login" className="flex items-center px-4 py-2 mt-5 text-gray-300 hover:text-yellow-600 transition-colors duration-300 transform rounded-lg">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                            </svg>
                            <span className="mx-4 font-medium">Log out</span>
                        </Link>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
