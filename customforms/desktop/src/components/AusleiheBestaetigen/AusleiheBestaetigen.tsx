import React from 'react';

import {
  ColumnDirective, ColumnsDirective, GridComponent,
} from '@syncfusion/ej2-react-grids';
import {DataModels} from '@atlas-engine/atlas_engine_client';

import {PreferredControlProps} from '../../CustomFormsRenderer';
import {FormCard} from '../FormCard/FormCard';

import {SuppressUpdates} from '../../SupressUpdates';
import {BuchMitBeratung} from '../../model/buchMitBeratung';

export class AusleiheBestaetigen extends React.Component<PreferredControlProps> {

  public getBooks(): Array<BuchMitBeratung> {
    const payload = this.props.userTask.tokens.find((token) => token.type === DataModels.FlowNodeInstances.ProcessTokenType.onEnter)?.payload;
    return payload;
  }

  public finishUserTask = (): void => {
    this.props.finishUserTask({});
  }

  public abortUserTask = (): void => {
    this.props.abortUserTask();
  }

  public suspendUserTask = (): void => {
    this.props.suspendUserTask(this.state);
  }

  public render(): JSX.Element {
    return (
      <FormCard
        title={`Sie haben folgende Bücher bis zum ${this.getDateInOneMonth()} ausgeliehen:`}
        finishUserTask={this.finishUserTask}
        suspendUserTask={this.suspendUserTask}
        abortUserTask={this.abortUserTask}
        finishButtonText='Fertig'
      >
        <SuppressUpdates>
          <GridComponent
            dataSource={this.getBooks()}
            height={100}
            rowSelected={(): void => this.forceUpdate()}
          >
            <ColumnsDirective>
              <ColumnDirective field='buch.title' headerText="Titel" width='60%'/>
              <ColumnDirective field='buch.author' headerText="Autor" width='40%'/>
            </ColumnsDirective>
          </GridComponent>
        </SuppressUpdates>
      </FormCard>
    );
  }

  private getDateInOneMonth(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString();
  }

}
