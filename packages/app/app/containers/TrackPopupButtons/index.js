import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers } from 'recompose';
import { PopupButton } from '@nuclear/ui';

import * as QueueActions from '../../actions/queue';

const getTrackItem = track => ({

});

const TrackPopupButtons = ({
  track,
  withAddToQueue,
  handleAddToQueue
}) => (
  <>
  {
    withAddToQueue &&
    <PopupButton
    onClick={handleAddToQueue}
    ariaLabel='Add track to queue'
    icon='plus'
    label='Add to queue'
    />
  }
  </>
);

const mapStateToProps = state => ({
  streamProviders: state.plugin.plugins.streamProviders
});

const mapDispatchToProps = dispatch => ({
  queueActions: bindActionCreators(QueueActions, dispatch)
});

TrackPopupButtons.propTypes = {
  track: PropTypes.object,
  queueActions: PropTypes.shape({
    addToQueue: PropTypes.func,
    clearQueue: PropTypes.func
  }),
  streamProviders: PropTypes.array,

  withAddToQueue: PropTypes.bool,
  withPlayNow: PropTypes.bool,
  withAddToFavorites: PropTypes.bool,
  withAddToDownloads: PropTypes.bool
};

TrackPopupButtons.defaultProps = {
  queueActions: {},
  streamProviders: [],

  withAddToQueue: true,
  withPlayNow: true,
  withAddToFavorites: true,
  withAddToDownloads: true
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    handleAddToQueue: ({ track, queueActions, streamProviders }) => () =>
    queueActions.addToQueue(streamProviders, track)
  })
)(TrackPopupButtons);
