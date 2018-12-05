/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module MessageCenter */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps, NoChildrenProps } from "../../utilities/Props";
import "./Message.scss";

/** Properties of [[MessageCenterMessage]] component. */
export interface MessageCenterMessageProps extends CommonProps, NoChildrenProps {
  /** Icon of message entry. */
  icon?: React.ReactNode;
  /** Actual message. */
  content?: React.ReactNode;
}

/** Message entry in [[MessageCenterMessage]] component. */
// tslint:disable-next-line:variable-name
export const MessageCenterMessage: React.StatelessComponent<MessageCenterMessageProps> = (props) => {
  const className = classnames(
    "nz-footer-messageCenter-message",
    props.className);

  return (
    <div
      className={className}
      style={props.style}
    >
      {props.icon &&
        <div className="nz-icon">
          {props.icon}
        </div>
      }
      {props.content &&
        <div className="nz-content">
          {props.content}
        </div>
      }
    </div>
  );
};
