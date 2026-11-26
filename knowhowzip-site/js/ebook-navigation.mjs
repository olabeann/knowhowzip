export function pageKeyDirection(event) {
  if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return 0;
  if (event.target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"]')) return 0;
  return event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
}

export function installPageSwipe(stage, { enabled, navigate }) {
  const pointers = new Set();
  let gesture = null, suppressClick = false;
  const reset = () => {
    if (gesture && stage.hasPointerCapture?.(gesture.id)) stage.releasePointerCapture(gesture.id);
    gesture = null;
    stage.classList.remove('page-dragging');
  };
  stage.addEventListener('pointerdown', event => {
    pointers.add(event.pointerId);
    suppressClick = false;
    if (pointers.size !== 1 || event.isPrimary === false || event.button !== 0 || !enabled()) { reset(); return; }
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
  });
  stage.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    if (!enabled()) { reset(); return; }
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.5) { reset(); return; }
      gesture.horizontal = true;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add('page-dragging');
    }
    event.preventDefault();
  });
  stage.addEventListener('pointerup', event => {
    pointers.delete(event.pointerId);
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    const dragged = gesture.horizontal;
    const threshold = Math.max(50, Math.min(100, stage.clientWidth * .12));
    const turn = enabled() && dragged && Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.5;
    suppressClick = dragged;
    reset();
    if (turn) navigate(dx < 0 ? 1 : -1);
  });
  stage.addEventListener('pointercancel', event => { pointers.delete(event.pointerId); reset(); });
  stage.addEventListener('lostpointercapture', () => { gesture = null; stage.classList.remove('page-dragging'); });
  // Release a mouse gesture even when its pointer leaves the page before capture.
  stage.addEventListener('pointerleave', event => {
    if (!stage.hasPointerCapture?.(event.pointerId)) { pointers.delete(event.pointerId); reset(); }
  });
  stage.addEventListener('click', event => {
    if (!suppressClick || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, true);
  stage.addEventListener('dragstart', event => { if (enabled()) event.preventDefault(); });
}
