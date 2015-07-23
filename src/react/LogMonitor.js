import React, { PropTypes, findDOMNode } from 'react';
import LogMonitorEntry from './LogMonitorEntry';

export default class LogMonitor {
  constructor() {
    window.addEventListener('keydown', ::this.handleKeyPress);
  }

  static propTypes = {
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    monitorState: PropTypes.object.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired,
    jumpToState: PropTypes.func.isRequired,
    setMonitorState: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired
  };

  static defaultProps = {
    select: (state) => state,
    monitorState: { isVisible: true }
  };

  componentWillReceiveProps(nextProps) {
    const node = findDOMNode(this);
    if (!node) {
      this.scrollDown = true;
    } else if (
      this.props.stagedActions.length < nextProps.stagedActions.length
    ) {
      const scrollableNode = node.parentElement;
      const { scrollTop, offsetHeight, scrollHeight } = scrollableNode;

      this.scrollDown = Math.abs(
        scrollHeight - (scrollTop + offsetHeight)
      ) < 20;
    } else {
      this.scrollDown = false;
    }
  }

  componentDidUpdate() {
    const node = findDOMNode(this);
    if (!node) {
      return;
    }

    if (this.scrollDown) {
      const scrollableNode = node.parentElement;
      const { offsetHeight, scrollHeight } = scrollableNode;

      scrollableNode.scrollTop = scrollHeight - offsetHeight;
      this.scrollDown = false;
    }
  }

  handleRollback() {
    this.props.rollback();
  }

  handleSweep() {
    this.props.sweep();
  }

  handleCommit() {
    this.props.commit();
  }

  handleToggleAction(index) {
    this.props.toggleAction(index);
  }

  handleReset() {
    this.props.reset();
  }

  handleKeyPress(event) {
    const { monitorState } = this.props;

    if (event.ctrlKey && event.keyCode === 72) { // Ctrl+H
      event.preventDefault();
      this.props.setMonitorState({
        ...monitorState,
        isVisible: !monitorState.isVisible
      });
    }
  }

  render() {
    const elements = [];
    const { monitorState, skippedActions, stagedActions, computedStates, select } = this.props;

    if (!monitorState.isVisible) {
      return null;
    }

    for (let i = 0; i < stagedActions.length; i++) {
      const action = stagedActions[i];
      const { state, error } = computedStates[i];

      elements.push(
        <LogMonitorEntry key={i}
                         index={i}
                         select={select}
                         action={action}
                         state={state}
                         collapsed={skippedActions[i]}
                         error={error}
                         onActionClick={::this.handleToggleAction} />
      );
    }

    return (
      <div style={{
        fontFamily: 'monospace',
        position: 'relative',
        padding: '1rem',
        height: '100%'
      }}>
        <div style={{marginBottom: 40, fontSize: 12}}>
          <div style={{float: 'left'}}>
            {computedStates.length > 1 &&
              <button onClick={::this.handleRollback} style={{
                cursor: 'pointer',
                padding: '5px 7px',
                border: '1px solid #eee',
                display: 'inline-block'
              }}>
                Rollback
              </button>
            }
            {Object.keys(skippedActions).some(key => skippedActions[key]) &&
              <button onClick={::this.handleSweep} style={{
                cursor: 'pointer',
                padding: '5px 7px',
                border: '1px solid #eee',
                display: 'inline-block'
              }}>
                Sweep
              </button>
            }
            {computedStates.length > 1 &&
              <button onClick={::this.handleCommit} style={{
                cursor: 'pointer',
                padding: '5px 7px',
                border: '1px solid #eee',
                display: 'inline-block'
              }}>
                Commit
              </button>
            }
          </div>
          <div style={{float: 'right'}}>
            <button onClick={::this.handleReset} style={{
              cursor: 'pointer',
              padding: '5px 7px',
              border: '1px solid #eee',
              display: 'inline-block'
            }}>
              Reset
            </button>
          </div>
        </div>
        {elements}
        <p style={{bottom: 0, position: 'absolute'}}>Tip: Ctrl-H to hide</p>
      </div>
    );
  }
}
