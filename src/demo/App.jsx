import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';

import Tree from 'src/components/Tree';

const recursiveSetState = (tree, indexes, currIndex, key, value) => {
  const dupTree= tree.slice();
  const getIndex = indexes[currIndex];
  if (currIndex === indexes.length - 1) {
    dupTree[getIndex][key] = value;
    return tree;
  }
  dupTree[getIndex].children = recursiveSetState((dupTree[getIndex].children || []).slice(0), indexes, currIndex + 1, key, value);
  return dupTree;
}

const recursivelySetChild = (tree, toIndexes, currIndex, extractData) => {
  const dupTree= tree.slice();
  const getIndex = toIndexes[currIndex];
  if (currIndex === toIndexes.length - 1) {
    dupTree[getIndex].children.push(extractData);
    return tree;
  }
  dupTree[getIndex].children = recursivelySetChild((dupTree[getIndex].children || []).slice(0), toIndexes, currIndex + 1, extractData);
  return dupTree;
}

const getRecursiveItem = (tree, fromIndexes, currIndex) => {
  const dupTree = tree.slice(0);
  const getIndex = fromIndexes[currIndex];
  if(currIndex === fromIndexes.length - 1) {
    const child = dupTree.filter((_, i) => i === getIndex);
    return child[0];
  }
  return getRecursiveItem((dupTree[getIndex].children || []).slice(0), fromIndexes, currIndex + 1);
}

const popRecursiveItem = (tree, fromIndexes, currIndex) => {
  const dupTree = tree.slice(0);
  const getIndex = fromIndexes[currIndex];
  if(currIndex === fromIndexes.length - 1) {
    const filtered = dupTree.filter((_, i) => i !== getIndex);
    return filtered;
  }
  const children = popRecursiveItem((dupTree[getIndex].children || []).slice(0), fromIndexes, currIndex + 1);
  dupTree[getIndex].children = children;
  return dupTree;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTree: [{
        title: 'main',
        isOpen: false,
        type: 'folder',
        children: [
          {
            title: 'Child 1',
          },
          {
            title: 'Child 2',
            isOpen: false,
            type: 'folder',
            children: [
              {
                title: 'Child 2.1',
                isOpen: false,
                type: 'folder',
                children: [
                  {
                    title: 'Readme.md',
                    fileIcon: <FontAwesomeIcon icon={faNewspaper} className="tree_file_system_space" />,
                    text: `
# README React-Tree-File-system
This is a demo of the file system.
                    `
                  },
                  {
                    title: 'Child 2.2',
                  }
                ]
              }
            ]
          }
        ]
      }],
      text: '',
      action: ''
    }
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div id="parentFileFrame">
          <div
            role="button"
            className="file_button"
            tabIndex={0}
            onClick={() => {
              this.setState((prevState) => {
                return {
                  defaultTree: [...prevState.defaultTree, {
                    title: 'New Folder',
                    type: 'folder',
                    isOpen: false,
                    children: [],
                  }]
                }
              })
            }}
          >Add Folder</div>
          <div
            role="button"
            className="file_button"
            tabIndex={0}
            onClick={() => {
              this.setState((prevState) => {
                return {
                  defaultTree: [...prevState.defaultTree, {
                    title: 'New File',
                  }]
                }
              })
            }}
          >Add File</div>
          <Tree
            isDraggable
            style={{ padding: 20, borderTop: '2px solid black' }}
            value={this.state.defaultTree}
            onDrag={(fromIndexes, toIndexes) => {
              this.setState(prevState => {
                const extractData = getRecursiveItem(prevState.defaultTree, fromIndexes, 0);
                const extraData = recursivelySetChild(prevState.defaultTree, toIndexes, 0, extractData);
                const newData = popRecursiveItem(prevState.defaultTree, fromIndexes, 0);
                return {
                  defaultTree: newData
                }
              })
            }}
            fileOnClick={(_, indexes, value) => {
              this.setState({
                text: `---

${value.text || `
### ${value.title}'s content:
\`\`\`json
${JSON.stringify(value)}
\`\`\`
                `}`,
                action: `Clicked on file ${value.title}`
              })
            }}
            folderOnClick={(_, indexes, state, value) => {

              this.setState(prevState => {
                const newData = recursiveSetState(prevState.defaultTree.slice(0), indexes, 0, 'isOpen', state)
                return {
                  defaultTree: newData,
                  action: `Clicked on folder ${value.title}`
                }
              })
            }}
          />
        </div>
        <div id="contentTextArea">
          <div id="childTextArea">
            {this.state.action}
            <ReactMarkdown
              source={this.state.text}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
