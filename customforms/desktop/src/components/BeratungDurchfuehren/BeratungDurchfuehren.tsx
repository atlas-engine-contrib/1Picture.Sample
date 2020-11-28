import React, {createRef} from 'react';

import {
    ColumnDirective, ColumnsDirective, GridComponent,
} from '@syncfusion/ej2-react-grids';
import {DataModels} from '@atlas-engine/atlas_engine_client';
import {ChangedEventArgs, TextBoxComponent} from '@syncfusion/ej2-react-inputs';

import {PreferredControlProps} from '../../CustomFormsRenderer';
import {FormCard} from '../FormCard/FormCard';

import './BeratungDurchfuehren.css';
import {Col, Row} from '../Grid/Grid';
import {Buch} from '../../model/buch';
import {SuppressUpdates} from '../../SupressUpdates';
import {BuchMitBeratung} from '../../model/buchMitBeratung';

type BeratungDurchfuehrenState = {
    beratungsTexte: {
        [isbn: string]: string;
    };
}

export class BeratungDurchfuehren extends React.Component<PreferredControlProps, BeratungDurchfuehrenState> {

    public state: BeratungDurchfuehrenState = {
        beratungsTexte: {},
    };

    private gridRef = createRef<GridComponent>();

    public getBooks(): Array<Buch> {
        const payload = this.props.userTask.tokens.find((token) => token.type === DataModels.FlowNodeInstances.ProcessTokenType.onEnter)?.payload;
        return payload.books;
    }

    public finishUserTask = (): void => {
        const buecherMitBeratung: Array<BuchMitBeratung> = this
            .getBooks()
            .map((buch) => {
                return {
                    buch: buch,
                    beratung: this.state.beratungsTexte[buch.isbn],
                };
            });

        this.props.finishUserTask(buecherMitBeratung);
    }

    public abortUserTask = (): void => {
        this.props.abortUserTask();
    }

    public suspendUserTask = (): void => {
        this.props.suspendUserTask(this.state);
    }

    public getSelectedRowIndex(): number {
        if (!this.gridRef.current) {
            return -1;
        }

        return this.gridRef.current.selectedRowIndex;
    }

    public getSelectedBook(): Buch {
        const rowIndex = this.getSelectedRowIndex();
        if (rowIndex < 0) {
            return this.getBooks()[0];
        }

        return this.getBooks()[rowIndex];
    }

    public render(): JSX.Element {
        return (
            <FormCard
                title="Beratung zu folgenden Büchern gewünscht:"
                finishUserTask={this.finishUserTask}
                suspendUserTask={this.suspendUserTask}
                abortUserTask={this.abortUserTask}
                finishButtonText="Beratung abgeschlossen"
            >
                <Row>
                    <Col>
                        <SuppressUpdates>
                            <GridComponent
                                ref={this.gridRef}
                                dataSource={this.getBooks()}
                                height={100}
                                rowSelected={(): void => this.forceUpdate()}
                            >
                                <ColumnsDirective>
                                    <ColumnDirective field='title' headerText="Titel" width='100' />
                                    <ColumnDirective field='author' headerText="Autor" width='100' />
                                    <ColumnDirective field='isbn' headerText="ISBN" width='100' />
                                </ColumnsDirective>
                            </GridComponent>
                        </SuppressUpdates>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBoxComponent
                            value="Terminal 1"
                            placeholder="Ort"
                            floatLabelType="Always"
                            readOnly={true}
                        />
                    </Col>
                </Row>
            </FormCard>
        );
    }

    private handleBeratungChanged(event?: ChangedEventArgs): void {
        const newBeratungsTexte = Object.assign({}, this.state.beratungsTexte);
        newBeratungsTexte[this.getSelectedBook().isbn] = event?.value ?? '';

        this.setState({beratungsTexte: newBeratungsTexte});
    }

}
