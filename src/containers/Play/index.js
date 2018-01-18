import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayList from '../../components/PlayList';
import { prevItem, nextItem, overview, start, load } from '../../actions/playActions';
import './index.css';

class Play extends Component {
  componentDidMount() {
    setTimeout(this.props.load, 100);
  }

  generateClassName () {
    return `${this.props.loaded ? '' : 'loading'} ${this.props.showingOverview ? 'showing-overview' : ''} ${this.props.started ? '' : 'not-started'} ${this.props.complete ? 'list-complete' : ''}`;
  }

  render () {
    return (
      <div className={this.generateClassName()}>
        <PlayList
          showingOverview={this.props.showingOverview}
          currentItem={this.props.currentItem}
          items={this.props.items} />
        <div className="buttons">
        	<button className="buttons__button buttons__button--previous" id="back" onClick={this.props.prevItem}>
        		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        			<path d="M0 0h24v24H0z" fill="none"/>
        			<path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
        		</svg>
        		&nbsp;Back
        	</button>
        	<button className="buttons__button buttons__button--overview" id="overview" onClick={this.props.overview}>
        		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        			<path d="M0 0h24v24H0z" fill="none"/>
        			<path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        		</svg>
        		&nbsp;Overview
        	</button>
        	<button className="buttons__button buttons__button--resume" id="resume" onClick={this.props.overview}>
        		Resume&nbsp;
        		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        			<path d="M0 0h24v24H0z" fill="none"/>
        			<path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
        		</svg>
        	</button>
        	<button className="buttons__button buttons__button--start" id="start" onClick={this.props.start}>
        		Start&nbsp;
        		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        			<path d="M0 0h24v24H0z" fill="none"/>
        			<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        		</svg>
        	</button>
        	<button className="buttons__button buttons__button--next" id="next" onClick={this.props.nextItem}>
        		Complete&nbsp;
        		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        			<path d="M0 0h24v24H0z" fill="none"/>
        			<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        		</svg>
        	</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.playList;
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(load()),
    start: (started) => dispatch(start(started)),
    overview: () => dispatch(overview()),
    nextItem: () => dispatch(nextItem()),
    prevItem: () => dispatch(prevItem())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
