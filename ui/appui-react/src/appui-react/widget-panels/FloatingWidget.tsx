/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { FloatingWidget as FloatingWidgetComponent } from "@itwin/appui-layout-react";
import { UiShowHideManager } from "../utils/UiShowHideManager";

/** @internal */
export function FloatingWidget() {
  return (
    <FloatingWidgetComponent
      onMouseEnter={UiShowHideManager.handleWidgetMouseEnter}
    />
  );
}