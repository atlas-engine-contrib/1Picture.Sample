import React from 'react';

import './Grid.css';

type RowProps = {
    cssClass?: string;
}

export const Row = (props: React.PropsWithChildren<RowProps>) => <div className={"row " + props.cssClass}>{props.children}</div>;
export const Col = (props: React.PropsWithChildren<any>) => <div className="col">{props.children}</div>;
export const ColMin = (props: React.PropsWithChildren<any>) => <div className="col-3">{props.children}</div>;
