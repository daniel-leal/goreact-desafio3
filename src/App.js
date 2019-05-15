import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

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
      <ReactMapGL
        {...this.state.viewport}
        onClick={this.handleMapClick}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXACCESSTOKEN}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        onViewportChange={viewport => this.setState({ viewport })}
      >
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
      </ReactMapGL>
    );
  }
}

export default App;
