import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Action } from 'redux';
import { Base16Theme } from 'base16';
import { PerformAction } from 'redux-devtools';
import LogMonitorEntry from './LogMonitorEntry';
import shouldPureComponentUpdate from 'react-pure-render/function';

interface Props<S, A extends Action<unknown>> {
  actionsById: { [actionId: number]: PerformAction<A> };
  computedStates: { state: S; error?: string }[];
  stagedActionIds: number[];
  skippedActionIds: number[];
  currentStateIndex: number;
  consecutiveToggleStartId: number | null | undefined;

  select: (state: S) => any;
  onActionClick: (id: number) => void;
  onActionShiftClick: (id: number) => void;
  theme: Base16Theme;
  expandActionRoot: boolean;
  expandStateRoot: boolean;
  markStateDiff: boolean;
}

export default class LogMonitorEntryList<
  S,
  A extends Action<unknown>
> extends Component<Props<S, A>> {
  static propTypes = {
    actionsById: PropTypes.object,
    computedStates: PropTypes.array,
    stagedActionIds: PropTypes.array,
    skippedActionIds: PropTypes.array,
    currentStateIndex: PropTypes.number,
    consecutiveToggleStartId: PropTypes.number,

    select: PropTypes.func.isRequired,
    onActionClick: PropTypes.func.isRequired,
    theme: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    expandActionRoot: PropTypes.bool,
    expandStateRoot: PropTypes.bool
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const elements = [];
    const {
      theme,
      actionsById,
      computedStates,
      currentStateIndex,
      consecutiveToggleStartId,
      select,
      skippedActionIds,
      stagedActionIds,
      expandActionRoot,
      expandStateRoot,
      markStateDiff,
      onActionClick,
      onActionShiftClick
    } = this.props;

    for (let i = 0; i < stagedActionIds.length; i++) {
      const actionId = stagedActionIds[i];
      const action = actionsById[actionId].action;
      const { state, error } = computedStates[i];
      let previousState;
      if (i > 0) {
        previousState = computedStates[i - 1].state;
      }
      elements.push(
        <LogMonitorEntry
          key={actionId}
          theme={theme}
          select={select}
          action={action}
          actionId={actionId}
          state={state}
          previousState={previousState}
          collapsed={skippedActionIds.includes(actionId)}
          inFuture={i > currentStateIndex}
          selected={consecutiveToggleStartId === i}
          error={error}
          expandActionRoot={expandActionRoot}
          expandStateRoot={expandStateRoot}
          markStateDiff={markStateDiff}
          onActionClick={onActionClick}
          onActionShiftClick={onActionShiftClick}
        />
      );
    }

    return <div>{elements}</div>;
  }
}
