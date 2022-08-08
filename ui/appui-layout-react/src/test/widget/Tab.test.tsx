/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { Rectangle } from "@itwin/core-react";
import { act, fireEvent, render } from "@testing-library/react";
import {
  addPanelWidget, addTab, createNineZoneState, createTabState, FloatingWidgetIdContext, NineZoneDispatch, PanelSideContext, ShowWidgetIconContext, WidgetContext, WidgetOverflowContext, WidgetStateContext,
  WidgetTab, WidgetTabProvider, WidgetTabsEntryContext,
} from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";

describe("WidgetTab", () => {
  it("should render active", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1", { hideWithUiWhenFloating: true });
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTabProvider
              tab={nineZone.tabs.t1}
            />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render a menu tab", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetOverflowContext.Provider value={{ close: sinon.spy() }}>
              <WidgetTabProvider tab={nineZone.tabs.t1} />
            </WidgetOverflowContext.Provider>
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </TestNineZoneProvider>,
    );
    container.getElementsByClassName("nz-widget-menuTab").length.should.eq(1);
  });

  it("should render minimized", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"], { minimized: true });
    nineZone = addTab(nineZone, "t1");
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTabProvider tab={nineZone.tabs.t1} />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render first inactive", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTabProvider tab={nineZone.tabs.t1} firstInactive />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render last not overflown", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: true,
          }}>
            <WidgetTabProvider tab={nineZone.tabs.t1} />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render tab with icon only", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1", { iconSpec: "icon-placeholder" });
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
      >
        <ShowWidgetIconContext.Provider value={true} >
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabsEntryContext.Provider value={{
              lastNotOverflown: true,
            }}>
              <WidgetTabProvider tab={nineZone.tabs.t1} showOnlyTabIcon={true} />
            </WidgetTabsEntryContext.Provider>
          </WidgetStateContext.Provider>
        </ShowWidgetIconContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render tab with text and icon", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1", { iconSpec: "icon-placeholder" });
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
      >
        <ShowWidgetIconContext.Provider value={true} >
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabsEntryContext.Provider value={{
              lastNotOverflown: true,
            }}>
              <WidgetTabProvider tab={nineZone.tabs.t1} showOnlyTabIcon={false} />
            </WidgetTabsEntryContext.Provider>
          </WidgetStateContext.Provider>
        </ShowWidgetIconContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render badge", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    const { container } = render(
      <TestNineZoneProvider
        state={nineZone}
        tab={<WidgetTab badge="Badge" />}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTabProvider
              tab={nineZone.tabs.t1}
            />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should dispatch WIDGET_TAB_CLICK", () => {
    const fakeTimers = sinon.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    render(
      <TestNineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <PanelSideContext.Provider value="left">
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabsEntryContext.Provider value={{
              lastNotOverflown: false,
            }}>
              <WidgetTabProvider tab={nineZone.tabs.t1} />
            </WidgetTabsEntryContext.Provider>
          </WidgetStateContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(tab);
      fakeTimers.tick(300);
    });
    sinon.assert.calledOnceWithExactly(dispatch, sinon.match({
      type: "WIDGET_TAB_CLICK",
      side: "left",
      widgetId: "w1",
      id: "t1",
    }));
  });

  it("should dispatch WIDGET_TAB_DOUBLE_CLICK", () => {
    const fakeTimers = sinon.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    render(
      <TestNineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <PanelSideContext.Provider value="left">
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabsEntryContext.Provider value={{
              lastNotOverflown: false,
            }}>
              <WidgetTabProvider tab={nineZone.tabs.t1} />
            </WidgetTabsEntryContext.Provider>
          </WidgetStateContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(tab);
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(tab);
      fakeTimers.tick(300);
    });
    sinon.assert.calledOnceWithExactly(dispatch, sinon.match({
      type: "WIDGET_TAB_DOUBLE_CLICK",
      side: "left",
      widgetId: "w1",
      id: "t1",
    }));
  });

  it("should dispatch WIDGET_TAB_DRAG_START on pointer move", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1", { hideWithUiWhenFloating: true});
    render(
      <TestNineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <WidgetContext.Provider value={{ measure: () => new Rectangle() }}>
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabProvider tab={nineZone.tabs.t1} />
          </WidgetStateContext.Provider>
        </WidgetContext.Provider>
      </TestNineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });
    });
    sinon.assert.calledOnceWithExactly(dispatch, sinon.match({
      type: "WIDGET_TAB_DRAG_START",
      widgetId: "w1",
      id: "t1",
    }));
  });

  it("should not dispatch WIDGET_TAB_DRAG_START on pointer move if pointer moved less than 10px", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    render(
      <TestNineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabProvider tab={nineZone.tabs.t1} />
        </WidgetStateContext.Provider>
      </TestNineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseMove(document, { clientX: 5, clientY: 0 });
    });
    sinon.assert.notCalled(dispatch);
  });

  it("should dispatch FLOATING_WIDGET_BRING_TO_FRONT", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", ["t1"]);
    nineZone = addTab(nineZone, "t1");
    render(
      <TestNineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <FloatingWidgetIdContext.Provider value="fw1">
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabProvider tab={nineZone.tabs.t1} />
          </WidgetStateContext.Provider>
        </FloatingWidgetIdContext.Provider>
      </TestNineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.touchStart(tab, {
        touches: [{}],
      });
    });
    sinon.assert.calledOnceWithExactly(dispatch, sinon.match({
      type: "FLOATING_WIDGET_BRING_TO_FRONT",
      id: "fw1",
    }));
  });
  it ("should create tab states with hideWithUiWhenFloating properly set", () => {
    const firstTab = createTabState("firstTab");
    firstTab?.hideWithUiWhenFloating?.should.false;

    const secondTab = createTabState("secondTab", {hideWithUiWhenFloating: true});
    secondTab?.hideWithUiWhenFloating?.should.true;
  });
});
