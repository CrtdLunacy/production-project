import { classNames } from 'shared/lib/classNames/classNames'
import styles from './SideBar.module.scss'

interface SideBarProps {
  className?: string
}

const SideBar = ({className}: SideBarProps) => {
  return (
    <div className={classNames(styles.SideBar, {}, [className])}>
    </div>
  )
}

export default SideBar
