import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Layout, Typography, Input, Button, Dropdown, Menu } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions";
import { MenuProps } from "antd";
// 小寫字母開頭的withXXX是高階組件，大寫字母開頭的WithXXX是TypeScript類型定義
import { withTranslation, WithTranslation } from 'react-i18next'
import i18n from "../../i18n/configs";

import { connect } from "react-redux";
// RootState用於定義mapStateToProps裡面的state
import { RootState } from "../../redux/store";
// Dispatch用於定義mapDispatchToProps裡面的dispatch。注意，這裡是從redux中引入Dispatch，而非react中引入Dispatch
// import { Dispatch } from "react";
import { Dispatch } from "redux";


interface State {
  items: MenuProps['items']
}

// 兩個props的類型定義合併在一起，用&
// RouteComponentProps定義路由props類型；
// WithTranslation定義i18n的props類型，
// ReturnType < typeof mapStateToProps > 定義mapStateToProps類型
// ReturnType<typeof mapDispatchToProps>定義mapDispatchToProps類型
type PropsType = RouteComponentProps & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
class HeaderComponent extends React.Component<PropsType, State> {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount(): void {
    this.handleMenuList()
  }

  handleMenuList = () => {
    let items: any[] = []
    this.props.languageList.forEach((l, index) => {
      const labelSpan = <span onClick={this.menuClickHandler}>{l.name}</span>
      let obj = { key: index, label: labelSpan }
      items[index] = obj
    })
    const iLength = items.length
    const labNewLan = <span onClick={this.menuClickHandler}>{this.props.t("header.add_new_language")}</span>
    items[iLength] = { key: 'add_new_lan', label: labNewLan }
    this.setState({ items })
  }

  menuClickHandler = (e) => {
    if (e.target.innerText === "添加新语言" || e.target.innerText === "add new language") {
      const newLanguage = { name: "new language", code: 'new_lan' }
      this.props.addLanguage(newLanguage)
      this.handleMenuList()
      return
    }

    let language: 'zh' | 'en' = 'zh'
    if (e.target.innerText === "中文") {
      language = 'zh'
    } else if (e.target.innerText === "English") {
      language = 'en'
    }
    i18n.changeLanguage(language)
    this.props.changeLanguage(language)
  }

  render() {
    const { navigate, t } = this.props
    let items = this.state.items
    return (
      <div className={styles['app-header']}>
        <div className={styles.inner}>
          <Typography.Text className={styles.slogan}>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            menu={{ items }}
            icon={<GlobalOutlined />}
          >
            {this.props.language === "zh" ? "中文" : "English"}
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

}

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (language: "zh" | "en") => {
      dispatch(changeLanguageActionCreator(language))
    },
    addLanguage: (newLanguage: { name: string, code: string }) => {
      dispatch(addLanguageActionCreator(newLanguage))
    }
  }
}


// 注意這裡withRouter包裹組件後，再放入withTranslation的第2個括號裡，然後再放入connect的第2個括號裡
export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)))