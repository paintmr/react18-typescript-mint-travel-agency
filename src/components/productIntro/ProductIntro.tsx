import React from 'react'
import styles from "./ProductIntro.module.css";
import { Typography, Rate, Carousel, Image, Table } from 'antd';
// 引入table的定義，定義table的columns
import { ColumnsType } from 'antd/es/table';

interface PropsType {
  title: string;
  shortDescription: string;
  price: string | number;
  coupons: string;
  points: string;
  discount: string;
  rating: string | number;
  pictures: string[]
}

// 定義table的row橫行
interface RowType {
  key: number;
  title: string;
  description: string | number | JSX.Element;
}

// 定義table的columns，並且把對row的定義作為columns定義的泛型參數
const columns: ColumnsType<RowType> = [
  // 第1豎欄column
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120
  },
  // 第2豎欄column
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center"
  }
]

export const ProductIntro: React.FC<PropsType> = ({ title, shortDescription, price, coupons, points, discount, rating, pictures }) => {
  // 這是table每行的數據，給它加上RowType定義每行。下面的key值相當於map()裡面給每個渲染的項目加的key
  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "路线名称",
      description: title,
    },
    {
      key: 1,
      title: "价格",
      description: (
        <>
          ¥{" "}
          <Typography.Text type="danger" strong>
            {price}
          </Typography.Text>
        </>
      ),
    },
    {
      key: 2,
      title: "限时抢购折扣",
      description: discount ? (
        <>
          ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
          <Typography.Text type="danger" strong>
            ¥ {discount}
          </Typography.Text>
        </>
      ) : (
        "暂无折扣"
      ),
    },
    {
      key: 3,
      title: "领取优惠",
      description: coupons ? discount : "无优惠券可领",
    },
    {
      key: 4,
      title: "线路评价",
      description: (
        <>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {rating} 星
          </Typography.Text>
        </>
      ),
    },
  ];

  return (
    <div className={styles['intro-container']}>
      {/* title */}
      <Typography.Title level={4}>{title}</Typography.Title>
      {/* description */}
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles['intro-detail-content']}>
        <Typography.Text style={{ marginLeft: 20 }}>
          ￥<span className={styles['intro-detail-strong-text']}>{price}</span>
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles['intro-detail-content']}>评级: {rating}</span>
        </Typography.Text>
      </div>
      {/* carousel */}
      <Carousel autoplay slidesToShow={3}>
        {pictures.map((p, index) => <Image key={index} height={150} src={p} />)}
      </Carousel>
      {/* table */}
      {/* 用RowType定義Table */}
      <Table<RowType>
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
        showHeader={false}
      />
    </div>
  )
}
