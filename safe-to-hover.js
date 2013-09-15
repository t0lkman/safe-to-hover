// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';
(function(global) {
  var DELAY_BEFORE_HOVER_IS_SAFE_IN_MS = 45; // ~3ish frames.

  function decorateScrollableElement(scrollableEl) {
    var bodyEl = getBodyElForScrollingEl(scrollableEl);
    decoreateDocumentBodyForSaneHovering(bodyEl);

    scrollableEl._pendingScrollingTimeout = undefined;
    scrollableEl.addEventListener('scroll', elementDidScroll);
  }

  function getBodyElForScrollingEl(scrollableEl) {
    var elWin;
    if (scrollableEl instanceof Window)
      elWin = scrollableEl;
    else
      elWin = scrollableEl.ownerDocument.defaultView;
    return elWin.document.body;
  }

  function decoreateDocumentBodyForSaneHovering(bodyEl) {
    if (bodyEl._scrollingCount !== undefined)
      return;
    bodyEl._scrollingCount = 0;
    bodyEl.setAttribute('safe-to-hover');
  }

  function elementDidScroll() {
    var bodyEl = getBodyElForScrollingEl(this);
    var window = bodyEl.ownerDocument.defaultView;
    if (this._pendingScrollingTimeout) {
      window.clearTimeout(this._pendingScrollingTimeout);
    } else {
      if (bodyEl._scrollingCount++ == 0)
        bodyDidBecomeUnsafeToHover(bodyEl);
    }
    window._pendingScrollingTimeout = window.setTimeout(
      elementDidStopScrolling, DELAY_BEFORE_HOVER_IS_SAFE_IN_MS);
  }

  function elementDidStopScrolling() {
    var bodyEl = getBodyElForScrollingEl(this);
    this._pendingScrollingTimeout = undefined;

    // Something else may still be scrolling.
    if (--bodyEl._scrollingCount > 0)
      return;
    bodyDidBecomeSafeToHover(bodyEl);
  }

  function bodyDidBecomeUnsafeToHover(bodyEl) {
    bodyEl.removeAttribute('safe-to-hover');
  }

  function bodyDidBecomeSafeToHover(bodyEl) {
    bodyEl.setAttribute('safe-to-hover');
  }

  window.SafeToHover = {
    decorateScrollableElement: decorateScrollableElement
  };
})(window);
