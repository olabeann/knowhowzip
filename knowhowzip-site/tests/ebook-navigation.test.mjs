import test from 'node:test';
import assert from 'node:assert/strict';
import { installPageSwipe, pageKeyDirection } from '../js/ebook-navigation.mjs';

function reader() {
  const handlers = {}, turns = [], captures = new Set();
  let enabled = true;
  const stage = { clientWidth: 600, classList: { add() {}, remove() {} },
    addEventListener: (name, fn) => { handlers[name] = fn; },
    setPointerCapture: id => captures.add(id), hasPointerCapture: id => captures.has(id),
    releasePointerCapture: id => captures.delete(id) };
  installPageSwipe(stage, { enabled: () => enabled, navigate: d => turns.push(d) });
  const emit = (name, values = {}) => {
    const event = { pointerId: 1, isPrimary: true, button: 0, clientX: 200, clientY: 100, detail: 1,
      preventDefault() { this.prevented = true; }, stopImmediatePropagation() { this.stopped = true; }, ...values };
    handlers[name](event);
    return event;
  };
  const swipe = (dx, dy = 0, pointerType = 'touch') => {
    emit('pointerdown', { pointerType });
    emit('pointermove', { pointerType, clientX: 200 + dx, clientY: 100 + dy });
    emit('pointerup', { pointerType, clientX: 200 + dx, clientY: 100 + dy });
  };
  return { emit, swipe, turns, setEnabled: value => { enabled = value; } };
}

test('mouse and touch horizontal swipes turn exactly one page per gesture', () => {
  const r = reader();
  r.swipe(-100, 0, 'mouse'); r.swipe(100); r.swipe(-300);
  assert.deepEqual(r.turns, [1, -1, 1]);
});
test('taps keep PDF links clickable, swipes suppress accidental link clicks', () => {
  const r = reader();
  r.swipe(2);
  assert.equal(r.emit('click').prevented, undefined);
  r.swipe(-100);
  assert.equal(r.emit('click').stopped, true);
  assert.equal(r.emit('click', { detail: 0 }).prevented, undefined);
});
test('short drags, vertical/diagonal scroll, zoom, cancellation and multitouch do not turn pages', () => {
  const r = reader();
  r.swipe(20); r.swipe(10, 150); r.swipe(100, 100);
  r.setEnabled(false); r.swipe(-100); r.setEnabled(true);
  r.emit('pointerdown'); r.emit('pointermove', { clientX: 50 }); r.emit('pointercancel'); r.emit('pointerup', { clientX: 50 });
  r.emit('pointerdown'); r.emit('pointerdown', { pointerId: 2, isPrimary: false });
  r.emit('pointerup', { pointerId: 2 }); r.emit('pointermove', { clientX: 50 }); r.emit('pointerup', { clientX: 50 });
  assert.deepEqual(r.turns, []);
  r.swipe(-100);
  assert.deepEqual(r.turns, [1]);
});
test('arrow keys work on buttons, but preserve editing and browser shortcuts', () => {
  const event = { key: 'ArrowRight', target: { closest: () => null } };
  assert.equal(pageKeyDirection(event), 1);
  assert.equal(pageKeyDirection({ ...event, key: 'ArrowLeft' }), -1);
  assert.equal(pageKeyDirection({ ...event, key: 'ArrowDown' }), 0);
  for (const modifier of ['ctrlKey', 'metaKey', 'altKey', 'shiftKey', 'isComposing', 'defaultPrevented']) {
    assert.equal(pageKeyDirection({ ...event, [modifier]: true }), 0);
  }
  assert.equal(pageKeyDirection({ ...event, target: { closest: () => ({}) } }), 0);
});
