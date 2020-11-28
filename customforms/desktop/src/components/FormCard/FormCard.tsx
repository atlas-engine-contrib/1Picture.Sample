import React from 'react';
import {ButtonComponent} from '@syncfusion/ej2-react-buttons';

import './FormCard.css'

type FormCardProps = {
    title: string;
    finishUserTask: Function;
    suspendUserTask: Function;
    abortUserTask: Function;
    cssClass?: string;
    finishButtonText?: string;
}

export const FormCard = (props: React.PropsWithChildren<FormCardProps>) => {
    return <div className={"e-card form-card " + ((props.cssClass) ? props.cssClass : "")} id="basic">
        <div className="e-card-header form-card-header">
            <div className="e-card-header-caption">
                <div className="e-card-title">{props.title}</div>
            </div>
        </div>
        <div >
            {props.children}
        </div>
        <div className="e-card-actions e-card-horizontal form-card-buttons">
            <ButtonComponent onClick={() => props.finishUserTask()} cssClass="e-primary finish-button">{props.finishButtonText ?? 'Weiter'}</ButtonComponent>
        </div>
    </div>
};
