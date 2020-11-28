import React from 'react';

import {ButtonComponent} from '@syncfusion/ej2-react-buttons';
import {TextBoxComponent, InputEventArgs} from '@syncfusion/ej2-react-inputs';
import {ColumnDirective, ColumnsDirective, GridComponent, PageSettingsModel} from '@syncfusion/ej2-react-grids';

import {PreferredControlProps} from '../../CustomFormsRenderer';

import './BuchauswahlZusammenstellen.css';
import {FormCard} from '../FormCard/FormCard';
import {Row, Col} from '../Grid/Grid';
import {Buch} from '../../model/buch';

type BuchauswahlZusammenstellenState = {
  searchValue?: string,
  books: Buch[],
  selectedBooks: Buch[]
}

export class BuchauswahlZusammenstellen extends React.Component<PreferredControlProps, BuchauswahlZusammenstellenState> {

  public state: BuchauswahlZusammenstellenState = {books: [], selectedBooks: []};


  public finishUserTask = (): void => {
    const books = this.state.selectedBooks.slice();

    this.props.finishUserTask({books: books, beratungGewuenscht: true});
  }

  public abortUserTask = (): void => {
    this.props.abortUserTask();
  }

  public suspendUserTask = (): void => {
    this.props.suspendUserTask(this.state);
  }

  public pageOptions: PageSettingsModel = {
    pageSize: 4
  };

  public render(): JSX.Element {
    return (
      <FormCard title="Buch auswählen:" finishButtonText="Beratung" cssClass="buch-auswaehlen" finishUserTask={this.finishUserTask} suspendUserTask={this.suspendUserTask} abortUserTask={this.abortUserTask}>
        <Row>
          <Col>
            <TextBoxComponent value={this.state.searchValue} input={this.handleSearchValueInput.bind(this)} placeholder="Suchen" floatLabelType="Always"></TextBoxComponent>
          </Col>
          <Col>
            &nbsp;
          </Col>
          <Col>
            &nbsp;
          </Col>
        </Row>
        <Row>
          <Col>
            <GridComponent dataSource={this.state.books} height={190}>
              <ColumnsDirective>
                <ColumnDirective field='title' headerText="Titel" width='100' />
                <ColumnDirective field='author' headerText="Autor" width='100' />
                <ColumnDirective field='isbn' headerText="ISBN" width='100' />
                <ColumnDirective headerText='' width='50' template={this.addColumnTemplate.bind(this)} textAlign='Center' />
              </ColumnsDirective>
            </GridComponent>
          </Col>
        </Row>
        <Row>
          <Col>
            <span>Ausgewählt:</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <GridComponent dataSource={this.state.selectedBooks} height={190}>
              <ColumnsDirective>
                <ColumnDirective field='title' headerText="Titel" width='100' />
                <ColumnDirective field='author' headerText="Autor" width='100' />
                <ColumnDirective field='isbn' headerText="ISBN" width='100' />
                <ColumnDirective headerText='' width='50' template={this.removeColumnTemplate.bind(this)} textAlign='Center' />
              </ColumnsDirective>
            </GridComponent>
          </Col>
        </Row>
      </FormCard>
    );
  }

  private async handleSearchValueInput(event?: InputEventArgs): Promise<void> {
    if (event) {
      await this.searchBooks(event?.value);
    }
  }

  private async searchBooks(searchValue?: string): Promise<void> {
    const response = await fetch('http://localhost:5011/api/books/search/' + searchValue);
    const books: Buch[] = await response.json();
    this.setState({books: books});
  }

  private addColumnTemplate(buch: Buch): any {
    const newBuch = {
      title: buch.title,
      author: buch.author,
      isbn: buch.isbn,
      genre: buch.genre,
    };
    return (<div>
      <ButtonComponent onClick={() => this.handleAdd(newBuch)}>+</ButtonComponent>
    </div>);
  }

  private handleAdd(buch: Buch): void {
    const index = this.state.books.findIndex(b => b.isbn === buch.isbn);
    const books = this.state.books.slice();
    books.splice(index, 1);

    const selectedBooks = [...this.state.selectedBooks, buch];
    this.setState({selectedBooks: selectedBooks, books: books});
  }

  private removeColumnTemplate(buch: Buch): any {
    const newBuch = {
      title: buch.title,
      author: buch.author,
      isbn: buch.isbn,
      genre: buch.isbn,
    };

    return (<div>
      <ButtonComponent onClick={() => this.handleRemove(newBuch)}>-</ButtonComponent>
    </div>);
  }

  private handleRemove(buch: Buch): void {
    const index = this.state.selectedBooks.findIndex(b => b.isbn === buch.isbn);
    const selectedBooks = this.state.selectedBooks.slice();
    selectedBooks.splice(index, 1);

    const books = [...this.state.books, buch];
    this.setState({selectedBooks: selectedBooks, books: books});
  }
}
