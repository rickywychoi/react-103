import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchRegions } from '../actions';
import { Loader } from '.';
import { connect } from 'react-redux';

export class Regions extends Component {
  onSelectRegion = (e, region) => {
    e.preventDefault();
    this.props.onSelectRegion(region);
  };

  render() {
    // console.log("region!", this.props.regions)
    // if(!this.props.regions){
    //   return null;
    // }
      return (
        <div className="col s12 m6 l4 offset-m3 offset-l4">
          <h2 className="center-align">Regions</h2>
          <div className="collection">
            {this.props.regions.map(region => (
              <a
                key={region}
                href="#!"
                onClick={e => this.onSelectRegion(e, region)}
                className={['collection-item', region === this.props.region ? 'active' : ''].join(
                  ' '
                )}>
                {region}
              </a>
            ))}
          </div>
        </div>
      );
    
  }
}

export class _RegionsPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    console.log(this.props)
    console.log(this.props.regions)
    this.props.fetchRegions();

  }

  onSelectRegion = region => {
    const root =
      window.location.hostname === 'react-bootcamp.github.io' ? '/react-wines-102/' : '/';
    this.context.router.push({
      pathname: `${root}regions/${region}`,
    });
  };
  

  render() {
    if (this.props.loading) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return (
      <Regions onSelectRegion={this.onSelectRegion} regions={this.props.regions} />

    );
  }
}

const mapStateToProps = (state) => ({
  regions: state.regions,
  loading: state.loading === 'HTTP_LOADING'
});

export const RegionsPage = connect(mapStateToProps, { fetchRegions })(_RegionsPage)