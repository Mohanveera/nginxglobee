import React from 'react'
import {Layout as MainLayout} from 'antd';
import { MdDashboard } from "react-icons/md";
import { Button} from 'antd';
import { RxDashboard } from "react-icons/rx";
import { MdGroups2 } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { AiFillSave } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";


const { Sider} = MainLayout;


let navItems = [
    {
      label:'Dashboard',
      link:'/',
      icon: <MdGroups2 className='nav-icon' />
    },
    {
      label:'Saved Audiences',
      icon: <GoPerson className='nav-icon' />
    },
    {
      label:'nav 3',
      link:'/audiences',
      icon: <AiFillSave className='nav-icon' />
    },
    {
      label:'nav 4',
      icon: <FaBook className='nav-icon' />
    }
]

function Sidebar() {

    const [collapsed, setCollapsed] = React.useState(true);
    const [activeItem, setActiveItem] = React.useState(0)

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}
        className='sidebar-antd'
        style={{
          background: "#204496",
          position:'fixed'
        }}
      >
        <div className="text-center mt-3">
          <img src="/assets/img/align_left.png" class="logo" alt="" 
              onClick={() => setCollapsed(!collapsed)}
              style={{
                height: 24,
                objectFit:'contain',
                width:'100%',
              }}
          
          />
        </div>
        <div className="d-flex flex-column">
            <ul className='nav-ul'>
              {
                navItems.map((item,index) => (
                  <Link to={item.link}>
                    <li key={index} className={activeItem === index ? `nav-ul-item active` : `nav-ul-item`} onClick={() => setActiveItem(index)}>
                        <div className='d-flex' style={{height:'25px'}}>
                            <span className="px-4">
                              {item.icon}
                            </span>
                            {
                              !collapsed ?
                                <span className="text-white">
                                  {item.label}
                                </span> : null
                            }
                        </div>
                    </li>
                  </Link>
                ))
              }
            </ul>
        </div>
      </Sider>
  )
}

export default Sidebar