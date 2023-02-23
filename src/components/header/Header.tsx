import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Layout, Typography, Input, Button, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '中文'
  },
  {
    key: '2',
    label: 'English'
  }
];

export const Header: React.FC = () => {
  return (
    <div className={styles['app-header']}>
      <div className={styles.inner}>
        <Typography.Text className={styles.slogan}>让旅游更幸福</Typography.Text>
        <Dropdown.Button
          style={{ marginLeft: 15 }}
          menu={{ items }}
          icon={<GlobalOutlined />}
        >
          语言
        </Dropdown.Button>
        <Button.Group className={styles['button-group']}>
          <Button>注册</Button>
          <Button>登录</Button>
        </Button.Group>
      </div>

      <div className={styles['app-header']}>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title className={styles.title} level={3}>Mint Travel Agency</Typography.Title>
          <Input.Search className={styles['search-input']} placeholder={'请输入搜索关键词'} />
        </Layout.Header>

        <Menu
          mode={"horizontal"}
          className={styles["main-menu"]}
          items={[
            { key: "1", label: "旅游首页" },
            { key: "2", label: "周末游" },
            { key: "3", label: "跟团游" },
            { key: "4", label: "自由行" },
            { key: "5", label: "私家团" },
            { key: "6", label: "邮轮" },
            { key: "7", label: "酒店+景点" },
            { key: "8", label: "当地玩乐" },
            { key: "9", label: "主题游" },
            { key: "10", label: "定制游" },
            { key: "11", label: "游学" },
            { key: "12", label: "签证" },
            { key: "13", label: "企业游" },
            { key: "14", label: "高端游" },
            { key: "15", label: "爱玩户外" },
            { key: "16", label: "保险" },
          ]}
        />
      </div>
    </div>
  )
}
