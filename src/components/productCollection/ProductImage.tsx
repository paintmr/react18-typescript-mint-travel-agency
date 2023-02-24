import React from 'react'
import { Image, Typography } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface PropsType extends RouteComponentProps {
  id: string | number,
  size: "large" | "small",
  title: string,
  imageSrc: string,
  price: number | string
}

const ProductImage: React.FC<PropsType> = ({ id, size, title, imageSrc, price, history, location, match }) => {
  return (
    <div onClick={() => history.push(`detail/${id}`)}>
      {size === "large" ?
        (<Image src={imageSrc} height={285} width={490} />) :
        (<Image src={imageSrc} height={120} width={240} />)
      }
      <div>
        <Typography.Text type='secondary'>{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type='danger' strong>￥{price}起</Typography.Text>
      </div>
    </div>
  )
}

export default withRouter(ProductImage)