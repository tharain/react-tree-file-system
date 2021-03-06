import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolder } from '@fortawesome/free-regular-svg-icons';

interface Props {
  value: Node[],
  fileOnClick: (event: React.SyntheticEvent<EventTarget>, indexes: number[], value: Node) => void,
  folderOnClick: (event: React.SyntheticEvent<EventTarget>, indexes: number[], state: boolean, value: Node) => void,
  onDrop?: (fromIndexes: number[], toIndexes: number[]) => void,
  onDrag?: (fromIndexes: number[], toIndexes: number[]) => void,
  folderIcon?: JSX.Element,
  fileIcon?: JSX.Element,
  style?: React.CSSProperties,
  isDraggable?: boolean,
  selected?: string,
  selectedClassName?: string,
}

interface Node {
  title: string,
  isOpen?: boolean,
  isLocked?: boolean,
  isHidden?: boolean,
  children?: Node[],
  style?: React.CSSProperties,
  className?: string,
  [extra: string]: any,
}

const renderChildren = (
  children: Node[],
  indexes: number[],
  fileOnClick?: (event: React.SyntheticEvent<EventTarget>, indexes: number[], value: Node) => void,
  folderOnClick?: (event: React.SyntheticEvent<EventTarget>, indexes: number[], state: boolean, value: Node) => void,
  onDrop?: (fromIndexes: number[], toIndexes: number[]) => void,
  onDrag?: (fromIndexes: number[], toIndexes: number[]) => void,
  fileIcon?: JSX.Element,
  folderIcon?: JSX.Element,
  isDraggable?: boolean,
  selected?: string,
  selectedClassName?: string,
) => {
  return (
    <div key={`${indexes[indexes.length - 1]}_child`} className="tree_file_system_children">
      {renderParent(children, indexes, fileOnClick, folderOnClick, onDrop, onDrag, fileIcon, folderIcon, isDraggable, selected, selectedClassName)}
    </div>
  )
}

const renderParent = (
  parent: Node[],
  indexes: number[] = [],
  fileOnClick?: (event: React.SyntheticEvent<EventTarget>, indexes: number[], value: Node) => void,
  folderOnClick?: (event: React.SyntheticEvent<EventTarget>, indexes: number[], state: boolean, value: Node) => void,
  onDrop?: (fromIndexes: number[], toIndexes: number[]) => void,
  onDrag?: (fromIndexes: number[], toIndexes: number[]) => void,
  fileIcon?: JSX.Element,
  folderIcon?: JSX.Element,
  isDraggable?: boolean,
  selected?: string,
  selectedClassName?: string,
) => {
  let rend: JSX.Element[] = [];
  parent.sort((a,b) => a.title.localeCompare(b.title)).forEach((p: Node, i: number) => {
    rend.push(
      <div
        key={`${i}_node`}
        draggable={isDraggable}
        style={p.style}
        onDragStart={(e) => {
          const newIndexes = [...indexes, i]
          e.dataTransfer.setData('react_tree_file_system_from', newIndexes.join(','));
        }}
        onDrop={(e) => {
          e.preventDefault();
          if((p.children && p.children.length > 0) || p.type === 'folder') {
            const ids = e.dataTransfer.getData("react_tree_file_system_from").split(',').filter(x=>x !== '').map(x => Number(x));
            const newIndexes = [...indexes, i];
            if(!newIndexes.slice(0,ids.length).join(',').startsWith(ids.join(','))) {
              onDrop ? onDrop(ids, newIndexes) : onDrag && onDrag(ids, newIndexes);
            }
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        role="button"
        className={`tree_file_system_node ${[...indexes, i].join(',') === selected && (selectedClassName || 'tree_file_system_node_selected')} ${p.className}`}
        onClick={(event) => {
          const newIndexes = [...indexes, i];
          if(!p.children || ((p.children && p.children.length === 0) && p.type !== 'folder')) {
            fileOnClick && fileOnClick(event, newIndexes, { ...p });
          }
          if(((p.children && p.children.length > 0) || p.type === 'folder')) {
            folderOnClick && folderOnClick(event, newIndexes, !p.isOpen, p);
          }
        }}
        tabIndex={0}
      >
        <>
          {(!p.children || ((p.children && p.children.length === 0) && p.type !== 'folder')) ? (p.fileIcon || fileIcon || <FontAwesomeIcon icon={faFileAlt} className="tree_file_system_space" />) : undefined}
          {((p.children && p.children.length > 0) || p.type === 'folder') ? (p.folderIcon || folderIcon || <FontAwesomeIcon icon={faFolder} className="tree_file_system_space" />) : undefined}
          {p.title}
        </>
      </div>
    );

    if(p.isOpen) {
      const newIndexes = [...indexes, i];
      rend.push(renderChildren(p.children || [], newIndexes, fileOnClick, folderOnClick, onDrop, onDrag, fileIcon, folderIcon, isDraggable, selected, selectedClassName));
    }
  })
  return rend;
}

const Tree = ({ value, fileOnClick, folderOnClick, fileIcon, folderIcon, style, isDraggable, onDrop, onDrag, selected, selectedClassName }: Props) => <div style={{ ...style }}>{renderParent(value, [], fileOnClick, folderOnClick, onDrop, onDrag, fileIcon, folderIcon, isDraggable, selected, selectedClassName)}</div>;

export default Tree;
