/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Tree */

import * as React from "react";
import classnames from "classnames";
import { TreeDragDropType } from "./withDragDrop";
import { withDragSource, WithDragSourceProps } from "../../dragdrop/withDragSource";
import { withDropTarget } from "../../dragdrop/withDropTarget";

import "./DragDropTreeNode.scss";

/** Properties for the [[DragDropTreeNodeComponent]] React component */
/** @hidden */
export interface DragDropNodeProps {
  isOver?: boolean;
  isDragging?: boolean;
  canDrag?: boolean;
  canDrop?: boolean;
}

enum HoverMode {
  Above,
  On,
  Below,
}

/** @hidden */
export interface DragDropNodeState {
  hoverMode: HoverMode;
}

// Used internally in ./Tree.tsx
/** @hidden */
export class DragDropTreeNodeComponent extends React.Component<DragDropNodeProps, DragDropNodeState> {
  private _root: HTMLDivElement | null = null;
  public readonly state: DragDropNodeState = {
    hoverMode: HoverMode.On,
  };
  public render() {
    const { isOver, isDragging, canDrop } = this.props as DragDropNodeProps;
    const mode = this.state.hoverMode;
    const classes = classnames(
      "node-drop-target",
      {
        above: canDrop && isOver && mode === HoverMode.Above,
        on: canDrop && isOver && mode === HoverMode.On,
        below: canDrop && isOver && mode === HoverMode.Below,
        dragging: isDragging,
      },
    );
    return (
      <div className={classes} ref={(el) => { this._root = el; }} onDragOver={this._handleDragOver}>
        {this.props.children}
      </div>
    );
  }

  private _handleDragOver = (event: React.DragEvent) => {
    if (this.props.isOver && this._root) {
      const rect = this._root.getBoundingClientRect();
      const relativeY = (event.clientY - rect.top) / rect.height;
      if (relativeY < 1 / 3) {
        if (this.state.hoverMode !== HoverMode.Above)
          this.setState({ hoverMode: HoverMode.Above });
      } else if (relativeY < 2 / 3) {
        if (this.state.hoverMode !== HoverMode.On)
          this.setState({ hoverMode: HoverMode.On });
      } else {
        if (this.state.hoverMode !== HoverMode.Below)
          this.setState({ hoverMode: HoverMode.Below });
      }
    }
  }
}

/** @hidden */
export function DragDropTreeNode<DragDropObject extends TreeDragDropType>() {
  return withDropTarget<DragDropNodeProps & WithDragSourceProps<DragDropObject>, DragDropObject>(
    withDragSource<DragDropNodeProps, DragDropObject>(DragDropTreeNodeComponent));
}
