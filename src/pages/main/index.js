import React, { Component, Fragment } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ModalActions } from '../../store/ducks/modal';

import GlobalStyle from '../../styles/global';

import SideBar from '../../components/sidebar';
import UserForm from '../../components/userForm';

import './styles.css';

class Main extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    users: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      data: PropTypes.array,
    }).isRequired,
  };

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

  handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    const { showModal } = this.props;

    console.tron.log(e.lngLat);

    await showModal({ latitude, longitude });
  };

  render() {
    const { viewport: viewportState } = this.state;
    const { users } = this.props;

    return (
      <Fragment>
        <GlobalStyle />
        <ReactMapGL
          {...viewportState}
          onClick={this.handleMapClick}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOXACCESSTOKEN}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {users.data.map(user => (
            <Marker
              latitude={user.cordinates.latitude}
              longitude={user.cordinates.longitude}
              key={user.id}
              captureClick
            >
              <img className="avatar" alt={user.name} src={user.avatar} />
            </Marker>
          ))}
        </ReactMapGL>
        <SideBar />
        <UserForm />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
