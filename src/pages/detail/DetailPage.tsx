import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spin, Result, Row, Col, DatePicker, Anchor, Divider, Typography } from 'antd';
import { Header, Footer } from '../../components';
import styles from './DetailPage.module.css'
import { ProductIntro } from '../../components';
import { ProductComments } from '../../components';
import { commentMockData } from "./mockup";


const { RangePicker } = DatePicker

// 注意，這裡只能用type來定義，不能用interface，因為useParams()這個勾子函數需要傳入的是一個string類型的字符串，而不是對象。interface是定義對象的。而type可以定義各種類別。
type MatchParams = {
  touristRouteId: string,
  tName: string
}

// 如果用interface定義MatchParams，下面寫的時候，要寫keyof MatchParams
// 見下面代碼： const params = useParams<keyof MatchParams>()
// interface MatchParams {
//   touristRouteId: string,
//   tName: string
// }

export const DetailPage: React.FC = (props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 用"touristRouteId"给useParams()做好泛型定義
  // const params = useParams<"touristRouteId">()
  // 如果傳入的參數超過1個
  const params = useParams<MatchParams>()
  // const params = useParams<keyof MatchParams>()
  const { touristRouteId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'error')
        setLoading(false)
      }
    }
    fetchData()
  }, [])


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
    <>
      <Header />
      <div className={styles['page-content']}>
        {/* 产品简介和日期选择 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor
          className={styles['product-detail-anchor']}
          direction="horizontal"
          items={[
            {
              key: 'product-features',
              href: '#product-features',
              title: '产品特色',
            },
            {
              key: 'fees',
              href: '#fees',
              title: '费用',
            },
            {
              key: 'before-booking',
              href: '#before-booking',
              title: '预订须知',
            },
            {
              key: 'comments',
              href: '#comments',
              title: '用户评价',
            }
          ]}
        />
        {/* 产品特色 */}
        <div id="product-features" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预订须知 */}
        <div id="before-booking" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
