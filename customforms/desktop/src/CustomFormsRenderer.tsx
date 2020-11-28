import React from 'react';

import {DataModels} from '@atlas-engine/atlas_engine_client';

import {CustomFormService, CustomFormState} from '@atlas-engine-contrib/atlas-ui_sdk';
import {IIdentity} from '@atlas-engine/iam.contracts';

export type PreferredControlProps = {
  userTask: DataModels.FlowNodeInstances.UserTask;
  supspendState: CustomFormState;
  abortUserTask: () => void;
  finishUserTask: (result: DataModels.FlowNodeInstances.UserTaskResult) => void;
  suspendUserTask: (state: CustomFormState) => void;
};

export type CustomFormsRendererProps = {
  components: {
    [preferredControl: string]: React.ComponentClass<PreferredControlProps>;
  };
}

export type CustomFormsServiceState = {
  targetComponent: React.ComponentClass<PreferredControlProps> | null;
  userTask: DataModels.FlowNodeInstances.UserTask | null;
  supspendState: CustomFormState | null;
}

export class CustomFormsRenderer extends React.Component<CustomFormsRendererProps, CustomFormsServiceState> {

  public state: CustomFormsServiceState = {
    targetComponent: null,
    userTask: null,
    supspendState: null,
  };

  private customFormService: CustomFormService | null = null;

  public componentDidMount(): void {
    this.customFormService = new CustomFormService();
    this.customFormService.onUserTaskReceived(this.updateComponent);
  }

  public updateComponent = (userTask: DataModels.FlowNodeInstances.UserTask, _identity: IIdentity, supspendState: CustomFormState | null): void => {

    const preferredControl = userTask.userTaskConfig.customForm;
    if (!preferredControl) {
      throw new Error(`No preferredControl set in usertask: ${JSON.stringify(userTask)}`);
    }

    const component = this.props.components[preferredControl];
    if (!component) {
      throw new Error(`No component found for usertask ${JSON.stringify(userTask)}`);
    }

    this.setState({
      targetComponent: component,
      userTask: userTask,
      supspendState: supspendState,
    });
  }

  public componentWillUnmount(): void {
    if (!this.customFormService) {
      return;
    }
    this.customFormService.destroy();
  }

  public suspendUserTask = (state: CustomFormState): void => {
    this.customFormService?.suspendUserTask(state);
  }

  public abortUserTask = (): void => {
    this.customFormService?.abortUserTask();
  }

  public finishUserTask = (result: DataModels.FlowNodeInstances.UserTaskResult): void => {
    this.customFormService?.finishUserTask(result);
  }

  public render(): JSX.Element | null {
    if (!this.state.targetComponent) {
      return null;
    }

    const componentInstance = React.createElement(this.state.targetComponent, {
      userTask: this.state.userTask,
      supspendState: this.state.supspendState,
      suspendUserTask: this.suspendUserTask,
      abortUserTask: this.abortUserTask,
      finishUserTask: this.finishUserTask,
    } as PreferredControlProps);

    return componentInstance;
  }

}
