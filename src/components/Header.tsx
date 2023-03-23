/* eslint-disable @next/next/no-html-link-for-pages */
import { signIn, signOut, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: sessionData } = useSession();
    const isLoggedIn = useMemo<boolean>(() => sessionData?.user ? true : false, [sessionData?.user]);

    const onSignOut = () => {
        signOut({ callbackUrl: window.location.origin }).catch((err) => { console.error(err) });
    };
    const onSignIn = () => {
        signIn(undefined, { callbackUrl: `${window.location.origin}/books` }).catch((err) => { console.error(err) });
    }

    // TODO: Conditionally render different items dependent on whether the user is logged in or not

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className="border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-white font-bold text-3xl">
                            Networth
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {
                                isLoggedIn ? (
                                    <button
                                        className="text-white hover:text-gray-400 transition ease-in-out duration-200 px-3 py-2 rounded-md text-md"
                                        onClick={onSignOut}
                                    >
                                        Log Out
                                    </button>
                                ) : (
                                    <button
                                        className="text-white hover:text-gray-400 transition ease-in-out duration-200 px-3 py-2 rounded-md text-md"
                                        onClick={onSignIn}
                                    >
                                        Log In
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-white mt-3 focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.293 5.293L12 11.586l-6.293-6.293a.999.999 0 1 0-1.414 1.414L10.586 13l-7.293 7.293a.999.999 0 1 0 1.414 1.414L12 14.414l6.293 6.293a.999.999 0 1 0 1.414-1.414L13.414 13l7.293-7.293a.999.999 0 0 0 0-1.414z"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4 6a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2H4zm0 5a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2H4zm0 5a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2H4z"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden ">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a
                            href="/"
                            className="text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Log In
                        </a>

                        <a
                            href="/about"
                            className="bg-gradient-to-r from-green-500 to-green-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header