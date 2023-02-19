import { classNames } from 'shared/lib/classNames/classNames';
import { NavBar } from 'widgets/NavBar';
import { useTheme } from 'app/providers/ThemeProvider';
import { SideBar } from 'widgets/SideBar';
import { Suspense, useState } from 'react';
import Modal from 'shared/ui/Modal/Modal';
import { AppRouter } from './providers/router';

function App() {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <NavBar />
                <div className="content-page">
                    <SideBar />
                    <AppRouter />
                </div>
            </Suspense>

        </div>
    );
}

export default App;
