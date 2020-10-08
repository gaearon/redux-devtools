import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'devui';
import { TiDownload } from 'react-icons/ti';
import { exportState } from '../../actions';

class ExportButton extends Component {
  static propTypes = {
    exportState: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Button title="Export to a file" onClick={this.props.exportState}>
        <TiDownload />
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    exportState: bindActionCreators(exportState, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(ExportButton);