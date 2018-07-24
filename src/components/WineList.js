import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '.';
import { fetchWinesFrom } from '../actions';
import { connect } from 'react-redux';

export class WineList extends Component {
  onSelectWine = (e, wineId) => {
    e.preventDefault();
    this.props.onSelectWine(wineId);
  };

  render() {
    return (
      <div className="col s12 m6 l4 offset-m3 offset-l4">
        <h2 className="center-align">Wines</h2>
        <div className="collection">
          {this.props.wines.map(wine => (
            <a
              key={wine.id}
              href="#!"
              onClick={e => this.onSelectWine(e, wine.id)}
              className={['collection-item', this.props.wine && wine.id === this.props.wine.id ? 'active' : ''].join(
                ' '
              )}>
              {wine.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export class _WineListPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    console.log(this.props.params.regionId)
    console.log(this.props.wines);
    const region = this.props.params.regionId;
    this.props.fetchWinesFrom(region);
  }


  onSelectWine = id => {
    const root =
      window.location.hostname === 'react-bootcamp.github.io' ? '/react-wines-102/' : '/';
    const region = this.props.params.regionId;
    this.context.router.push({
      pathname: `${root}regions/${region}/wines/${id}`,
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
    return <WineList onSelectWine={this.onSelectWine} wines={this.props.wines} />;
  }
}

const mapStateToProps = (state) => ({
  wines: state.wines,
  loading: state.loading === 'HTTP_LOADING'
});

export const WineListPage = connect(mapStateToProps, { fetchWinesFrom })(_WineListPage);