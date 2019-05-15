import React, { Component, Fragment } from 'react';
import ReactMapGL, { Marker, FullscreenControl } from 'react-map-gl';

import GlobalStyle from './styles/global';

import SideBar from './components/sidebar';

class App extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -1.456562,
      longitude: -48.4780078,
      zoom: 14,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }));
  };

  handleMapClick(e) {
    const [longitude, latitude] = e.lngLat;

    alert(`Latitude: ${latitude} \nLongitude: ${longitude}`);
  }

  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <ReactMapGL
          {...this.state.viewport}
          onClick={this.handleMapClick}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOXACCESSTOKEN}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <SideBar />
          <Marker latitude={-1.456562} longitude={-48.4780078} captureClick>
            <img
              style={{
                borderRadius: 100,
                width: 48,
                height: 48,
              }}
              alt="desenv"
              src="https://avatars1.githubusercontent.com/u/3511128?v=4"
            />
          </Marker>

          <Marker latitude={-1.4582129} longitude={-48.48208137} captureClick>
            <img
              style={{
                borderRadius: 100,
                width: 48,
                height: 48,
              }}
              alt="desenv"
              src="https://avatars1.githubusercontent.com/u/7287437?v=4"
            />
          </Marker>
        </ReactMapGL>
      </Fragment>
    );
  }
}

export default App;
