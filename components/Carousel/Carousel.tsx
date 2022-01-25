import React from 'react'
import CardMedia from '@mui/material/CardMedia'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

export const CarouselScreen = () => {
  var items = [
    {
      name: 'shirt1',
      image: 'images/banner1.jpg',
    },
    {
      name: 'shirt2',
      image: 'images/banner2.jpg',
    },
    {
      name: 'shirt3',
      image: 'images/banner3.jpg',
    },
  ]
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={20}
      totalSlides={3}
      isPlaying={true}
    >
      <Slider>
        {items.map((item) => {
          return (
            <Slide index={0}>
              <CardMedia
                component='img'
                image={item.image}
                title={item.name}
              ></CardMedia>
            </Slide>
          )
        })}
      </Slider>
    </CarouselProvider>
  )
}
