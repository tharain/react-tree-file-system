"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
var renderChildren = function (children, indexes, fileOnClick, folderOnClick, onDrag, fileIcon, folderIcon, isDraggable) {
    return (React.createElement("div", { key: indexes[indexes.length - 1] + "_child", className: "tree_file_system_children" }, renderParent(children, indexes, fileOnClick, folderOnClick, onDrag, fileIcon, folderIcon, isDraggable)));
};
var renderParent = function (parent, indexes, fileOnClick, folderOnClick, onDrag, fileIcon, folderIcon, isDraggable) {
    if (indexes === void 0) { indexes = []; }
    var rend = [];
    parent.sort(function (a, b) { return a.title.localeCompare(b.title); }).forEach(function (p, i) {
        rend.push(React.createElement("div", { key: i + "_node", draggable: isDraggable, onDragStart: function (e) {
                var newIndexes = __spreadArrays(indexes, [i]);
                e.dataTransfer.setData('react_tree_file_system_from', newIndexes.join(','));
            }, onDrop: function (e) {
                e.preventDefault();
                if ((p.children && p.children.length > 0) || p.type === 'folder') {
                    var ids = e.dataTransfer.getData("react_tree_file_system_from").split(',').filter(function (x) { return x !== ''; }).map(function (x) { return Number(x); });
                    var newIndexes = __spreadArrays(indexes, [i]);
                    if (!newIndexes.slice(0, ids.length).join(',').startsWith(ids.join(','))) {
                        onDrag && onDrag(ids, newIndexes);
                    }
                }
            }, onDragOver: function (e) {
                e.preventDefault();
            }, role: "button", className: "tree_file_system_node", onClick: function (event) {
                var newIndexes = __spreadArrays(indexes, [i]);
                if (!p.children || ((p.children && p.children.length === 0) && p.type !== 'folder')) {
                    fileOnClick && fileOnClick(event, newIndexes, __assign({}, p));
                }
                if (((p.children && p.children.length > 0) || p.type === 'folder')) {
                    folderOnClick && folderOnClick(event, newIndexes, !p.isOpen, p);
                }
            }, tabIndex: 0 },
            React.createElement(React.Fragment, null,
                (!p.children || ((p.children && p.children.length === 0) && p.type !== 'folder')) ? (p.fileIcon || fileIcon || React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_regular_svg_icons_1.faFileAlt, className: "tree_file_system_space" })) : undefined,
                ((p.children && p.children.length > 0) || p.type === 'folder') ? (p.folderIcon || folderIcon || React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_regular_svg_icons_1.faFolder, className: "tree_file_system_space" })) : undefined,
                p.title)));
        if (p.isOpen) {
            var newIndexes = __spreadArrays(indexes, [i]);
            rend.push(renderChildren(p.children || [], newIndexes, fileOnClick, folderOnClick, onDrag, fileIcon, folderIcon, isDraggable));
        }
    });
    return rend;
};
var Tree = function (_a) {
    var value = _a.value, fileOnClick = _a.fileOnClick, folderOnClick = _a.folderOnClick, fileIcon = _a.fileIcon, folderIcon = _a.folderIcon, style = _a.style, isDraggable = _a.isDraggable, onDrag = _a.onDrag;
    return React.createElement("div", { style: __assign({}, style) }, renderParent(value, [], fileOnClick, folderOnClick, onDrag, fileIcon, folderIcon, isDraggable));
};
exports.default = Tree;
