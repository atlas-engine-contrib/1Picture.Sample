import React from 'react';

import {TextBoxComponent, ChangedEventArgs, FormValidatorModel, FormValidator} from '@syncfusion/ej2-react-inputs';
import {DatePickerComponent, ChangedEventArgs as DateChangedEventArgs} from '@syncfusion/ej2-react-calendars';

import {PreferredControlProps} from '../../CustomFormsRenderer';
import {FormCard} from '../FormCard/FormCard';
import {Row, Col, ColMin} from '../Grid/Grid';

import './BibliotheksausweisErstellen.css';

type BibliotheksausweisErstellenState = {
  vorname?: string,
  nachname?: string,
  geburtsdatum?: Date,
  strasse?: string,
  hausnummer?: string,
  postleitzahl?: string,
  stadt?: string
}

export class BibliotheksausweisErstellen extends React.Component<PreferredControlProps, BibliotheksausweisErstellenState> {

  private formObject?: FormValidator;

  public state: BibliotheksausweisErstellenState = {};

  public componentDidMount(): void {
    const options: FormValidatorModel = {
      // add the rules for validation
      rules: {
        'vorname': {
          required: [true, '* Vorname eingeben'],
        },
        'nachname': {
          required: [true, '* Nachname eingeben'],
        },
        'geburtsdatum': {
          required: [true, 'Geburtsdatum eingeben'],
        },
        'strasse': {
          required: [true, '* Strasse eingeben'],
        },
        'hausnummer': {
          required: [true, '* Hsnr. eingeben'],
        },
        'postleitzahl': {
          required: [true, '* PLZ eingeben'],
        },
        'stadt': {
          required: [true, '* Stadt eingeben'],
        }
      }
    };
    // initialize the form validator
    this.formObject = new FormValidator('#form1', options);
  }

  public finishUserTask = (): void => {
    if (this.formObject?.validate()) {
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
      <FormCard title="Bibliotheksausweis erstellen:" finishUserTask={this.finishUserTask} suspendUserTask={this.suspendUserTask} abortUserTask={this.abortUserTask} >
        <form id="form1">
          <Row>
            <Col>
              <TextBoxComponent id='vorname' value={this.state.vorname} change={this.handleVornameChanged.bind(this)} placeholder="Vorname" floatLabelType="Always"></TextBoxComponent>
            </Col>
            <Col><TextBoxComponent id='nachname' value={this.state.nachname} change={this.handleNachnameChanged.bind(this)} placeholder="Nachname" floatLabelType="Always"></TextBoxComponent></Col>
          </Row>
          <Row>
            <Col><DatePickerComponent id='geburtsdatum' value={this.state.geburtsdatum} change={this.handleGeburtsdatumChanged.bind(this)} placeholder="Geburtsdatum" format='dd.MM.yyyy' floatLabelType="Always"></DatePickerComponent></Col>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col><TextBoxComponent id='strasse' value={this.state.strasse} change={this.handleStrasseChanged.bind(this)} placeholder="Strasse" floatLabelType="Always"></TextBoxComponent></Col>
            <ColMin><TextBoxComponent id='hausnummer' value={this.state.hausnummer} change={this.handleHausnummerChanged.bind(this)} placeholder="Hsnr." floatLabelType="Always"></TextBoxComponent></ColMin>
          </Row>

          <Row>
            <ColMin><TextBoxComponent id='postleitzahl' value={this.state.postleitzahl} change={this.handlePostleitzahlChanged.bind(this)} placeholder="PLZ" floatLabelType="Always"></TextBoxComponent></ColMin>
            <Col><TextBoxComponent id='stadt' value={this.state.stadt} change={this.handleStadtChanged.bind(this)} placeholder="Stadt" floatLabelType="Always"></TextBoxComponent></Col>
          </Row>
        </form>
      </FormCard>
    );
  }

  private handleVornameChanged(event?: ChangedEventArgs): void {
    this.setState({vorname: event?.value});
  }

  private handleNachnameChanged(event?: ChangedEventArgs): void {
    this.setState({nachname: event?.value});
  }

  private handleGeburtsdatumChanged(event?: DateChangedEventArgs): void {
    this.setState({geburtsdatum: event?.value});
  }

  private handleStrasseChanged(event?: ChangedEventArgs): void {
    this.setState({strasse: event?.value});
  }

  private handleHausnummerChanged(event?: ChangedEventArgs): void {
    this.setState({hausnummer: event?.value});
  }

  private handlePostleitzahlChanged(event?: ChangedEventArgs): void {
    this.setState({postleitzahl: event?.value});
  }

  private handleStadtChanged(event?: ChangedEventArgs): void {
    this.setState({stadt: event?.value});
  }

}
