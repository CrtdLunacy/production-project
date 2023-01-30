import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'


const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
        <button onClick={toggleTheme}>Toogle theme</button>
        <Link to={'/'}>Главная</Link>
        <Link to={'/about'}>О сайте</Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={ <MainPage /> } />
            <Route path='/about' element={ <AboutPage /> } />
          </Routes>
      </Suspense>
    </div>
  )
}

export default App
