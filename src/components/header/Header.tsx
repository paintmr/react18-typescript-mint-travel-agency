import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Layout, Typography, Input, Button, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

// 使用加強版的useSelector獲取store中的state數據
import { useSelector } from "../../redux/hooks";
// 使用useDispatch獲取dispatch
import { useDispatch } from "react-redux";
// 用Dispatch來定義dispatch
// import { Dispatch } from "react";
// 用LanguageActionTypes來定義Dispatch的泛型
// import { LanguageActionTypes } from "../../redux/language/languageActions";
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions";

// 使用i18n的多語言系統
import { useTranslation } from "react-i18next"
import i18n from "../../i18n/configs";


// const items: MenuProps['items'] = [
//   {
//     key: '1',
//     label: '中文'
//   },
//   {
//     key: '2',
//     label: 'English'
//   }
// ];


export const Header: React.FC = () => {
  const navigate = useNavigate();
  const language = useSelector((state) => state.language.language)
  // 可以用強類型給dispatch做好定義，但是這樣做沒什麼好處，反而讓代碼臃腫，破壞JS代碼的靈活性
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
  // 直接用useDispatch()即可
  const dispatch = useDispatch();
  const languageList = useSelector((state) => state.language.languageList)
  const { t } = useTranslation()
  let items: MenuProps['items'] = []

  // 點擊語言下拉框菜單的選項時
  const menuClickHandler = (e) => {
    if (e.target.innerText === "添加新语言" || e.target.innerText === "add new language") {
      const newLanguage = { name: "new language", code: 'new_lan' }
      dispatch(addLanguageActionCreator(newLanguage))
      handleMenuList()
      return
    }

    let language: 'zh' | 'en' = 'zh'
    if (e.target.innerText === "中文") {
      language = 'zh'
    } else if (e.target.innerText === "English") {
      language = 'en'
    }
    i18n.changeLanguage(language)
    dispatch(changeLanguageActionCreator(language))
  }

  // 獲得語言下拉框的數據
  const handleMenuList = () => {
    let items2: any[] = []
    languageList.forEach((l, index) => {
      const labelSpan = <span onClick={menuClickHandler}>{l.name}</span>
      let obj = { key: index, label: labelSpan }
      // items2必須設置為any[]類別，否則這裡報錯，obj無法放入items2
      items2[index] = obj
    })
    // 添加“添加新語言”那一行
    const iLength = items2.length
    const labNewLan = <span onClick={menuClickHandler}>{t("header.add_new_language")}</span>
    items2[iLength] = { key: 'add_new_lan', label: labNewLan }
    // 必須有個類別為MenuProps['items'] 的items3來接類別為any[]的items2。
    // 否則，如果直接return類別為any[]的items2，無法把handleMenuList()賦值給類別為MenuProps['items'] 的items
    let items3: MenuProps['items'] = []
    items3 = [...items2]
    return items3
  }
  // 必須把handleMenuList()的返回值賦值給items，然後把items放到Dropdown.Button的menu中。不能直接把handleMenuList()放到menu中，會報錯。
  items = handleMenuList()

  return (
    <div className={styles['app-header']}>
      <div className={styles.inner}>
        <Typography.Text className={styles.slogan}>{t("header.slogan")}</Typography.Text>
        <Dropdown.Button
          style={{ marginLeft: 15 }}
          menu={{ items }}
          icon={<GlobalOutlined />}
        >
          {language === "zh" ? "中文" : "English"}
        </Dropdown.Button>
        <Button.Group className={styles['button-group']}>
          <Button onClick={() => { navigate('./register') }}>{t("header.register")}</Button>
          <Button onClick={() => { navigate('./signin') }}>{t("header.signin")}</Button>
        </Button.Group>
      </div>

      <div className={styles['app-header']}>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => { navigate('/') }}>
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title className={styles.title} level={3}>{t("header.title")}</Typography.Title>
          </span>
          <Input.Search className={styles['search-input']} placeholder={'请输入搜索关键词'} />
        </Layout.Header>

        <Menu
          mode={"horizontal"}
          className={styles["main-menu"]}
          items={[
            { key: "1", label: t("header.home_page") },
            { key: "2", label: t("header.weekend") },
            { key: "3", label: t("header.group") },
            { key: "4", label: t("header.backpack") },
            { key: "5", label: t("header.private") },
            { key: "6", label: t("header.cruise") },
            { key: "7", label: t("header.hotel") },
            { key: "8", label: t("header.local") },
            { key: "9", label: t("header.theme") },
            { key: "10", label: t("header.custom") },
            { key: "11", label: t("header.study") },
            { key: "12", label: t("header.visa") },
            { key: "13", label: t("header.enterprise") },
            { key: "14", label: t("header.high_end") },
            { key: "15", label: t("header.outdoor") },
            { key: "16", label: t("header.insurance") },
          ]}
        />
      </div>
    </div>
  )
}
