import React, { Component } from 'react'
import { render } from 'react-dom'
import '../stylesheets/App.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Crousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
      <Carousel autoPlay>
          <div>
            <img src="http://wearefanatics.com/wp-content/uploads/Running-Backs_header.png" />
            <p className="legend">Prospect VS Pros</p>
          </div>
          <div>
            <img src="https://getsafe.com/wp-content/uploads/2016/03/ff-header.png" />
            <p className="legend">Gear of Wars</p>
          </div>
          <div>
            <img src="https://i.pinimg.com/originals/b2/5d/76/b25d762ee471cc2268a49f88edb9da2c.jpg" />
            <p className="legend">Fortresses</p>
          </div>
          <div>
            <img src="https://images-na.ssl-images-amazon.com/images/G/33/img17/video-games/content-grid/banner-interior-halo.jpg" />
            <p className="legend">Interior Halo</p>
          </div>
          <div>
            <img src="https://images-na.ssl-images-amazon.com/images/G/33/img17/video-games/content-grid/banner-interior-gears-of-war.jpg" />
            <p className="legend">Gears Of Wars</p>
          </div>
          <div>
            <img src="http://3.bp.blogspot.com/-x6_NreN1uNo/UIbrUT65PqI/AAAAAAAAAbY/_T_yiCZRWrM/s1600/hd50B.jpg" />
            <p className="legend">Cene Manchete</p>
          </div>
        </Carousel>
      </div>
    );

  }
}
export default Crousel;
