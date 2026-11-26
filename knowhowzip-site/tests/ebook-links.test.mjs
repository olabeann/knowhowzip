import test from 'node:test';
import assert from 'node:assert/strict';
import { destinationPage, renderInternalLinks } from '../js/ebook-links.mjs';

const pdf = { numPages: 10, getDestination: async name => name === 'chapter' ? [{ num: 20, gen: 0 }] : null,
  getPageIndex: async () => 4 };

test('resolves named, referenced, and indexed destinations; rejects missing/out-of-range pages', async () => {
  assert.equal(await destinationPage(pdf, 'chapter'), 5);
  assert.equal(await destinationPage(pdf, [0]), 1);
  assert.equal(await destinationPage(pdf, [{ num: 20, gen: 0 }]), 5);
  for (const dest of ['missing', null, [], [-1], [10], [1.5], [{}]]) {
    assert.equal(await destinationPage(pdf, dest), null);
  }
});

function container() {
  return { children: [], ownerDocument: { createElement: () => ({ style: {}, setAttribute() {},
    addEventListener(name, handler) { this[name] = handler; } }) },
  replaceChildren(...children) { this.children = children; } };
}

test('positions scaled and rotated link rectangles, navigates on click, skips unsupported links', async () => {
  const layer = container();
  let target;
  const page = { getAnnotations: async () => [
    { subtype: 'Link', dest: 'chapter', rect: [10, 20, 50, 40] },
    { subtype: 'Link', dest: 'missing', rect: [0, 0, 10, 10] },
    { subtype: 'Link', url: 'https://example.com', rect: [0, 0, 10, 10] },
    { subtype: 'Link', dest: [0], rect: [NaN, 0, 10, 10] },
  ] };
  await renderInternalLinks({ pdf, page, viewport: { width: 200, height: 200,
    convertToViewportRectangle: () => [100, 80, 20, 40] }, container: layer, isCurrent: () => true,
    navigate: n => { target = n; } });
  assert.equal(layer.children.length, 1);
  assert.deepEqual(layer.children[0].style, { left: '20px', top: '40px', width: '80px', height: '40px' });
  layer.children[0].click();
  assert.equal(target, 5);
});

test('does not install or activate links from a stale render', async () => {
  const layer = container();
  let current = true, navigated = false;
  const args = { pdf, page: { getAnnotations: async () => [{ subtype: 'Link', dest: [0], rect: [0, 0, 10, 10] }] },
    viewport: { width: 100, height: 100, convertToViewportRectangle: r => r }, container: layer,
    isCurrent: () => current, navigate: () => { navigated = true; } };
  await renderInternalLinks(args);
  const button = layer.children[0];
  current = false;
  button.click();
  assert.equal(navigated, false);
  layer.replaceChildren();
  await renderInternalLinks(args);
  assert.equal(layer.children.length, 0);
});
