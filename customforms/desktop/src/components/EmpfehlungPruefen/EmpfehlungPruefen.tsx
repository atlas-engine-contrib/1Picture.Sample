import React from 'react';

import {DataModels} from '@atlas-engine/atlas_engine_client';
import {Row} from 'react-bootstrap';

import {BuchMitBeratung} from '../../model/buchMitBeratung';
import {PreferredControlProps} from '../../CustomFormsRenderer';
import {DecideCard} from '../DecideCard/DecideCard';

type EmpfehlungPruefenState = {
    books: Array<BuchMitBeratung>;
}

export class EmpfehlungPruefen extends React.Component<PreferredControlProps, EmpfehlungPruefenState> {

    constructor(props: PreferredControlProps) {
        super(props);

        const books = this.props.userTask.tokens.find((token) => token.type === DataModels.FlowNodeInstances.ProcessTokenType.onEnter)?.payload;
        this.state = {
            books: books,
        };
    }

    public annehmen = (): void => {
        this.props.finishUserTask({annehmen: true});
    }

    public ablehnen = (): void => {
        this.props.finishUserTask({annehmen: false});
    }

    public pausieren = (): void => {
        this.props.suspendUserTask(this.state);
    }

    public render(): JSX.Element {
        return (
            <DecideCard
                title="Möchten Sie folgende Bücher ausleihen?"
                acceptText="Ja"
                declineText="Nein"
                accept={this.annehmen.bind(this)}
                decline={this.ablehnen.bind(this)}
                suspend={this.pausieren.bind(this)}
            >
                <ol>
                    {
                        this.state.books
                            .map((book) => {
                                return (
                                    <li key={book.buch.isbn}>
                                        <Row>
                                            <div className='col'>
                                                <b>{book.buch.author}: {book.buch.title}</b> ({book.buch.isbn})<br />
                                                {book.beratung}
                                            </div>
                                            <div className='col col-1' style={{maxWidth: 'initial'}}>
                                                <button
                                                    className='e-control e-btn e-lib e-danger'
                                                    onClick={(): void => this.handleRemoveBookClick(book)}
                                                >
                                                    Löschen
                        </button>
                                            </div>
                                        </Row>
                                    </li>
                                );
                            })
                    }
                </ol>
            </DecideCard>
        );
    }

    private handleRemoveBookClick = (book: BuchMitBeratung): void => {
        const index = this.state.books.findIndex((b) => b.buch.isbn === book.buch.isbn);
        if (index < 0) {
            return;
        }

        const newBooks = this.state.books.slice();
        newBooks.splice(index, 1);

        this.setState({
            books: newBooks,
        });
    }

}
