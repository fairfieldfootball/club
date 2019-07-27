import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from './root';

export default {
  withDispatchFunction: <S, D>(mapStateToProps: (state: RootState) => S, dispatchProps: (dispatch: Dispatch) => D) =>
    connect(
      mapStateToProps,
      dispatchProps
    ),

  withDispatchObject: <S, D>(mapStateToProps: (state: RootState) => S, dispatchProps: D) =>
    connect(
      mapStateToProps,
      dispatchProps
    ),

  withMerge: <P, S, D, O = {}>(
    mapStateToProps: (state: RootState) => S,
    mapDispatchToProps: (dispatch: Dispatch) => D,
    mergeProps: (s: S, d: D, o: O) => P
  ) =>
    connect<S, D, O, P, RootState>(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps
    ),
};
