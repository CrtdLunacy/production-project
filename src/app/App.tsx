import './styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { NavBar } from 'widgets/NavBar'


const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
        <NavBar />
        <AppRouter />
        <button onClick={toggleTheme}>Toogle theme</button>
    </div>
  )
}

export default App
