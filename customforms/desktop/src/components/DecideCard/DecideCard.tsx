import React from 'react';
import {ButtonComponent} from '@syncfusion/ej2-react-buttons';

import './DecideCard.css'

type DecideCardProps = {
    title: string;
    acceptText: string;
    declineText: string;
    accept: Function;
    decline: Function;
    suspend: Function;
}

export const DecideCard = (props: React.PropsWithChildren<DecideCardProps>) => {
    return <div className="e-card form-card" id="basic">
        <div className="e-card-header form-card-header">
            <div className="e-card-header-caption">
                <div className="e-card-title">{props.title}</div>
            </div>
        </div>
        <div>
            {props.children}
        </div>
        <div className="e-card-actions e-card-horizontal decide-card-buttons">
            <ButtonComponent onClick={() => props.decline()} cssClass="e-danger decline-button">{props.declineText}</ButtonComponent>
            <ButtonComponent onClick={() => props.accept()} cssClass="e-success accept-button">{props.acceptText}</ButtonComponent>
        </div>
    </div>
};
