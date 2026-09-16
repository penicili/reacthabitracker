import { Outlet } from 'react-router'
import styles from './AppLayout.module.css'
import Navbar from './Navbar'

const AppLayout = () => {
  console.log('AppLayout')

  return (
    <div className={styles.mainContainer}>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
export default AppLayout