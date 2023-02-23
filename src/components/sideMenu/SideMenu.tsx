import React from 'react';
import styles from "./SideMenu.module.css";
import { sideMenuList } from './mockup';
import { Menu } from 'antd';
import { GifOutlined, GoldFilled } from '@ant-design/icons';

export const SideMenu: React.FC = () => {
  return (
    <Menu
      className={styles['side-menu']}
      mode={"vertical"}
      items={sideMenuList.map(m => ({
        label: m.title,
        icon: <GifOutlined />,
        key: m.title,
        children: m.subMenu.map(sm => ({
          label: sm.title,
          key: sm.title,
          icon: <GifOutlined />,
          children: sm.subMenu.map(ssm => ({
            label: ssm,
            key: ssm,
            icon: <GoldFilled />
          }))
        }))
      }))}
    ></Menu>
  )
}