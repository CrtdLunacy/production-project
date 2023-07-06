import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMounted, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NavBar } from '@/widgets/NavBar';
import { useTheme } from '@/app/providers/ThemeProvider';
import { SideBar } from '@/widgets/SideBar';
import { AppRouter } from './providers/router';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const mounted = useSelector(getUserMounted);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="Загрузка...">
                <NavBar />
                <div className="content-page">
                    <SideBar />
                    {mounted && <AppRouter />}
                </div>
            </Suspense>

        </div>
    );
}

export default App;
