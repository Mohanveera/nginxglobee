import React from 'react';
import {Layout as MainLayout} from 'antd';
import DefaultHeader from './navbar/DefaultHeader';
import Sidebar from './navbar/Sidebar';



const { Content } = MainLayout;

function Layout({children}) {
    
    const [targetReached, setTargetReached] = React.useState(false)
    const [activeSidebar, setActiveSidebar] = React.useState(true)

    const updateTarget = React.useCallback((e) => {
      if (e.matches) {
        setTargetReached(true)
      }else {
        setActiveSidebar(true)
        setTargetReached(false)
      }
    }, [])

    React.useEffect(() => {
      const media = window.matchMedia(`(max-width: ${"1476"}px)`)
      media.addEventListener('change', updateTarget)
      if (media.matches) setTargetReached(true)
      return () => media.removeEventListener('change', updateTarget)
    }, [])

  
    

  return (
    <div className="content-container">
    <MainLayout>
      <Sidebar />
      <MainLayout>
        <DefaultHeader />
        <Content
          style={{
            marginTop: '65px',
            marginLeft: '80px',
            // minHeight: 280,
          }}
        >
          <div className="content-data">
            {children}  
          </div>
          
        </Content>
      </MainLayout>
    </MainLayout>
    </div>
  )
}




export default Layout;