"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_markdown_1 = require("react-markdown");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
var Tree_1 = require("src/components/Tree");
var recursiveSetState = function (tree, indexes, currIndex, key, value) {
    var dupTree = tree.slice();
    var getIndex = indexes[currIndex];
    if (currIndex === indexes.length - 1) {
        dupTree[getIndex][key] = value;
        return tree;
    }
    dupTree[getIndex].children = recursiveSetState((dupTree[getIndex].children || []).slice(0), indexes, currIndex + 1, key, value);
    return dupTree;
};
var recursivelySetChild = function (tree, toIndexes, currIndex, extractData) {
    var dupTree = tree.slice();
    var getIndex = toIndexes[currIndex];
    if (currIndex === toIndexes.length - 1) {
        dupTree[getIndex].children.push(extractData);
        return tree;
    }
    dupTree[getIndex].children = recursivelySetChild((dupTree[getIndex].children || []).slice(0), toIndexes, currIndex + 1, extractData);
    return dupTree;
};
var getRecursiveItem = function (tree, fromIndexes, currIndex) {
    var dupTree = tree.slice(0);
    var getIndex = fromIndexes[currIndex];
    if (currIndex === fromIndexes.length - 1) {
        var child = dupTree.filter(function (_, i) { return i === getIndex; });
        return child[0];
    }
    return getRecursiveItem((dupTree[getIndex].children || []).slice(0), fromIndexes, currIndex + 1);
};
var popRecursiveItem = function (tree, fromIndexes, currIndex) {
    var dupTree = tree.slice(0);
    var getIndex = fromIndexes[currIndex];
    if (currIndex === fromIndexes.length - 1) {
        var filtered = dupTree.filter(function (_, i) { return i !== getIndex; });
        return filtered;
    }
    var children = popRecursiveItem((dupTree[getIndex].children || []).slice(0), fromIndexes, currIndex + 1);
    dupTree[getIndex].children = children;
    return dupTree;
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
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
                                            fileIcon: <react_fontawesome_1.FontAwesomeIcon icon={free_regular_svg_icons_1.faNewspaper} className="tree_file_system_space"/>,
                                            text: "\n# README React-Tree-File-system\nThis is a demo of the file system.\n                    "
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
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        return (<div style={{ display: 'flex' }}>
        <div id="parentFileFrame">
          <div role="button" className="file_button" tabIndex={0} onClick={function () {
            _this.setState(function (prevState) {
                return {
                    defaultTree: __spreadArrays(prevState.defaultTree, [{
                            title: 'New Folder',
                            type: 'folder',
                            isOpen: false,
                            children: [],
                        }])
                };
            });
        }}>Add Folder</div>
          <div role="button" className="file_button" tabIndex={0} onClick={function () {
            _this.setState(function (prevState) {
                return {
                    defaultTree: __spreadArrays(prevState.defaultTree, [{
                            title: 'New File',
                        }])
                };
            });
        }}>Add File</div>
          <Tree_1.default isDraggable style={{ padding: 20, borderTop: '2px solid black' }} value={this.state.defaultTree} onDrag={function (fromIndexes, toIndexes) {
            _this.setState(function (prevState) {
                var extractData = getRecursiveItem(prevState.defaultTree, fromIndexes, 0);
                var extraData = recursivelySetChild(prevState.defaultTree, toIndexes, 0, extractData);
                var newData = popRecursiveItem(prevState.defaultTree, fromIndexes, 0);
                return {
                    defaultTree: newData
                };
            });
        }} fileOnClick={function (_, indexes, value) {
            _this.setState({
                text: "---\n\n" + (value.text || "\n### " + value.title + "'s content:\n```json\n" + JSON.stringify(value) + "\n```\n                "),
                action: "Clicked on file " + value.title
            });
        }} folderOnClick={function (_, indexes, state, value) {
            _this.setState(function (prevState) {
                var newData = recursiveSetState(prevState.defaultTree.slice(0), indexes, 0, 'isOpen', state);
                return {
                    defaultTree: newData,
                    action: "Clicked on folder " + value.title
                };
            });
        }}/>
        </div>
        <div id="contentTextArea">
          <div id="childTextArea">
            {this.state.action}
            <react_markdown_1.default source={this.state.text}/>
          </div>
        </div>
      </div>);
    };
    return App;
}(react_1.default.Component));
exports.default = App;
