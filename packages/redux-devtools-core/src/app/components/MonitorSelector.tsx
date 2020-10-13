import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, ResolveThunks } from 'react-redux';
import { Tabs } from 'devui';
import { monitors } from '../utils/getMonitor';
import { selectMonitor } from '../actions';
import { StoreState } from '../reducers';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ResolveThunks<typeof actionCreators>;
type Props = StateProps & DispatchProps;

class MonitorSelector extends Component<Props> {
  static propTypes = {
    selected: PropTypes.string,
    selectMonitor: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.selected !== this.props.selected;
  }

  render() {
    return (
      <Tabs
        main
        collapsible
        position="center"
        tabs={monitors}
        onClick={this.props.selectMonitor}
        selected={this.props.selected || 'InspectorMonitor'}
      />
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  selected: state.monitor.selected,
});

const actionCreators = {
  selectMonitor,
};

export default connect(mapStateToProps, actionCreators)(MonitorSelector);
