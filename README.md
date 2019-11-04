# react-tree-file-system

A basic tree file system that allows customisation
- custom CSS and classNames
- drag and drop available
- demo available

### 1 Demo

Version 1.1.0
![](Demo2.gif)

Version 1.0.6
![](Demo.gif)

You can also try out [here](https://tharain.github.io/react-tree-file-system/)

### 2 Get Started

```bash
# To download, either
npm install --save react-tree-file-system
# or
yarn add react-tree-file-system
```

In your code
```javascript
import Tree from 'react-tree-file-system';

// import stylesheet
import 'react-tree-file-system/index.css';
```

### Uncontrolled component

- you can toggle folder to open or close by using recursion

```javascript
const recursiveSetState = (tree, indexes, currIndex, key, value) => {
  const dupTree= tree.slice();
  const getIndex = indexes[currIndex];
  if (currIndex === indexes.length - 1) {
    dupTree[getIndex][key] = value;
    return tree;
  }
  dupTree[getIndex].children = recursiveSetState(
    (dupTree[getIndex].children || []).slice(0),
    indexes,
    currIndex + 1, key, value
  );
  return dupTree;
}

// ...

class YourClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeValue: [
        {
          title: 'folder name'
          type: 'folder',
          children: [
            {
              title: 'child 1'
            },
            {
              title: 'child 2'
            },
            {
              title: 'child 3'
            }
          ]
        }
      ]
    }
  }

  render() {
    return (
      // ...

      <Tree
        value={this.state.treeValue}
        folderOnClick={(_, indexes, state) => {
          this.setState(prevState => {
            return {
              treeValue: recursiveSetState(prevState.treeValue, indexes, 0, 'isOpen', state);
            }
          });
        }}
      />

      // ...
    )
  }
}
```

- you can support on drag with recursion

```javascript

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


// ...

class YourClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeValue: [
        {
          title: 'folder name'
          type: 'folder',
          children: [
            {
              title: 'child 1'
            },
            {
              title: 'child 2'
            },
            {
              title: 'child 3'
            }
          ]
        }
      ]
    }
  }

  render() {
    return (
      // ...

      <Tree
        value={this.state.treeValue}
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
      />

      // ...
    )
  }
}
```


### <a name="tree">4 Tree Structure</a>

```javascript
// Node
interface Node {
  title: string,
  isOpen?: boolean,
  // isLocked?: boolean, // No support yet
  // isHidden?: boolean, // No support yet
  children?: Node[],
  folderIcon?: React.Element,
  fileIcon?: React.Element,
  style?: React.CSSProperties,
  className?: string,
  // able to add anything here
}

// Example
[
  {
    title: 'main', // what is displayed
    isOpen: false, // optional
    type: 'folder',
    folderIcon: <FolderIcon /> // optional
    children: [
      {
        title: 'Child 1',
      },
      {
        title: 'Readme.md',
        fileIcon: <FileIcon />, // optional
        text: 'demo text'
      },
    ]
  },
  // ... repeat Node
]
```

### 5 API

| Property | Description | Type | Default |
| :------: | :------: | :------: | :------: |
| value | The Tree structure given in [point 4](#tree) | Node[] | undefined |
| fileOnClick | Called when file is clicked | (event, indexes: number[], value: Node) => void | undefined |
| folderOnClick | Called when folder is clicked | (event, indexes: number[], state: boolean, value: Node) => void | undefined |
| onDrop | Called when something is dragged on folder [Replace onDrag] | (event, fromIndexes, toIndexes) => void | undefined |
| onDrag | Called when something is dragged on folder [Depreciated] | (event, fromIndexes, toIndexes) => void | undefined |
| folderIcon | Replace the default folder icon | JSX.Element | undefined |
| fileIcon | Replace the default file icon | JSX.Element | undefined |
| style | customize the general style | React.CSSProperties | undefined |
| isDraggable | customize the general style | React.CSSProperties | false |
| selected | Enable highlighting of cell clicked. Basically just store the indexes as indexes.join(',') | string | undefined |
| selectedClassName | customize the highlighted style with your own className | string | undefined |
