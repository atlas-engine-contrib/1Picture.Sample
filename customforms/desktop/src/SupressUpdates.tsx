import React, {ReactNode} from 'react';

/**
 * This component will suppress all (render) updates to its children.
 */
export class SuppressUpdates extends React.Component {

  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): ReactNode {
    return this.props.children;
  }

}
