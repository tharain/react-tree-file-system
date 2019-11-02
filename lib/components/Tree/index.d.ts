import * as React from 'react';
interface Props {
    value: Node[];
    fileOnClick: (event: React.SyntheticEvent<EventTarget>, indexes: number[], value: Node) => void;
    folderOnClick: (event: React.SyntheticEvent<EventTarget>, indexes: number[], state: boolean, value: Node) => void;
    onDrag?: (fromIndexes: number[], toIndexes: number[]) => void;
    folderIcon?: JSX.Element;
    fileIcon?: JSX.Element;
    style?: React.CSSProperties;
    isDraggable?: boolean;
}
interface Node {
    title: string;
    isOpen?: boolean;
    isLocked?: boolean;
    isHidden?: boolean;
    children?: Node[];
    [extra: string]: any;
}
declare const Tree: ({ value, fileOnClick, folderOnClick, fileIcon, folderIcon, style, isDraggable, onDrag }: Props) => JSX.Element;
export default Tree;
