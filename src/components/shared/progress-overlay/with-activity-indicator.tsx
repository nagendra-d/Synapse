import React from 'react';
import {
  Consumer,
  GlobalActivityIndicatorProps,
} from './global-activity-context';

export function withActivityIndicator<TProps>(
  WrappedComponent: React.ComponentType<TProps & GlobalActivityIndicatorProps>,
): React.FunctionComponent<TProps> {
  return (props) => (
    <Consumer>
      {(state: Partial<GlobalActivityIndicatorProps>) => (
        <WrappedComponent
          {...props}
          {...(state as GlobalActivityIndicatorProps)}
        />
      )}
    </Consumer>
  );
}
