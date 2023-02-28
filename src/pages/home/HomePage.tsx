import React from 'react'
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from '../../components';
import { Row, Col, Typography, Spin, Result } from 'antd';
// import { productList1, productList2, productList3 } from './mockups';
import sideImage from "../../assets/images/sider_2019_12-09.png"
import sideImage2 from "../../assets/images/sider_2019_02-04.png"
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png"
import styles from './HomePage.module.css';
// 小寫字母開頭的withXXX是高階組件，大寫字母開頭的WithXXX是TypeScript類型定義
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchRecommendProducts } from '../../redux/recommendProducts/recommendProductsActions';

// 使用connect()()時記得定義ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
class HomePageComponent extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {

  componentDidMount() {
    this.props.fetchRecommendProducts()
  }

  render(): React.ReactNode {
    const { t } = this.props
    const { loading, error, productList } = this.props
    if (loading) {
      return (
        <Spin
          size='large'
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        />
      )
    }
    if (error) {
      return (
        <Result
          status="error"
          title={error}
          subTitle="Please try again."
        />
      )
    }
    return (
      <div>
        <Header />
        {/* 页面内容content */}
        <div className={styles['page-content']}>

          {/* SideMenu and Carousel */}
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>

          {/* Three groups of products */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                {t("home_page.hot_recommended")}
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t("home_page.new_arrival")}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t("home_page.domestic_travel")}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />


          {/* business partners */}
          <BusinessPartners />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendProducts: () => {
      dispatch(fetchRecommendProducts())
    },
  }
}

const HomePageWithoutConnect = withTranslation()(HomePageComponent)

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageWithoutConnect)