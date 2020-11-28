import React from 'react';

import {TextBoxComponent, ChangedEventArgs, FormValidatorModel, FormValidator} from '@syncfusion/ej2-react-inputs';
import {DatePickerComponent, ChangedEventArgs as DateChangedArgs} from '@syncfusion/ej2-react-calendars';

import {PreferredControlProps} from '../../CustomFormsRenderer';
import {FormCard} from '../FormCard/FormCard';
import {Row, Col} from '../Grid/Grid';

import './BuchausleiheEintragen.css';

type BuchausleiheEintragenState = {
  isbn?: string,
  ausweisnummer?: string,
  ausleihdatum?: Date
}

export class BuchausleiheEintragen extends React.Component<PreferredControlProps, BuchausleiheEintragenState> {
  private formObject?: FormValidator;

  public state: BuchausleiheEintragenState = {};

  public componentDidMount(): void {
    const options: FormValidatorModel = {
      // add the rules for validation
      rules: {
        'isbn': {
          required: [true, '* ISBN eingeben'],
          regex: ["^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$", "* Bitte eine korrekte ISBN angeben"]
        },
        'ausweisnummer': {
          required: [true, '* Bibliotheksausweisnummer eingeben'],
        },
        'ausleihdatum': {
          required: [true, 'Ausleihdatum eingeben'],
        }
      }
    };
    // initialize the form validator
    this.formObject = new FormValidator('#form1', options);
  }

  public finishUserTask = (): void => {
    if (this.formObject?.validate()) {
      this.formObject.element.reset();
      this.props.finishUserTask(this.state);
    }
  }

  public abortUserTask = (): void => {
    this.props.abortUserTask();
  }

  public suspendUserTask = (): void => {
    this.props.suspendUserTask(this.state);
  }

  public render(): JSX.Element {
    return (
      <FormCard title="Buchausleihe eingeben:" cssClass="buchausleihe-eingeben" finishUserTask={this.finishUserTask} suspendUserTask={this.suspendUserTask} abortUserTask={this.abortUserTask} >
        <form id="form1">
          <Row>
            <Col><TextBoxComponent id="isbn" value={this.state.isbn} change={this.handleISBNChanged.bind(this)} placeholder="ISBN" floatLabelType="Always"></TextBoxComponent></Col>
          </Row>
          <Row>
            <Col><TextBoxComponent id="ausweisnummer" value={this.state.ausweisnummer} change={this.handleAusweisnummerChanged.bind(this)} placeholder="Bibliotheksausweisnummer" floatLabelType="Always"></TextBoxComponent></Col>
          </Row>
          <Row>
            <Col><DatePickerComponent id="ausleihdatum" value={this.state.ausleihdatum} change={this.handleAusleihdatumChanged.bind(this)} placeholder="Ausleihdatum" format='dd.MM.yyyy' floatLabelType="Always"></DatePickerComponent></Col>
            <Col>&nbsp;</Col>
          </Row>
        </form>
      </FormCard>
    );
  }

  private handleISBNChanged(event?: ChangedEventArgs): void {
    this.setState({isbn: event?.value as string});
  }

  private handleAusweisnummerChanged(event?: ChangedEventArgs): void {
    this.setState({ausweisnummer: event?.value});
  }

  private handleAusleihdatumChanged(event?: DateChangedArgs): void {
    this.setState({ausleihdatum: event?.value});
  }
}
