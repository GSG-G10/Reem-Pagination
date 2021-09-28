import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;

function AnimalCard(props) {
  const {data}=props;
  return (
    <div className='card'>
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt={`${data.cover_photo.alt_description}`} src={data.cover_photo.urls.small} className='cat-img'/>}
  >
    <Meta title={data.cover_photo.description?data.cover_photo.description:'cute cat'}description=' ' />
    <a href={data.cover_photo.links.html} > Show Image in website</a>
  </Card>
  </div>
  )
}

export default AnimalCard
