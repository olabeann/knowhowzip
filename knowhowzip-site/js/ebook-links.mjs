// PDF destinations use zero-based page indexes or indirect page references.
export async function destinationPage(pdf, destination) {
  const dest = typeof destination === 'string'
    ? await pdf.getDestination(destination) : destination;
  if (!Array.isArray(dest) || !dest.length) return null;
  const ref = dest[0];
  const index = Number.isInteger(ref) ? ref
    : ref && Number.isInteger(ref.num) && Number.isInteger(ref.gen)
      ? await pdf.getPageIndex(ref) : -1;
  return Number.isInteger(index) && index >= 0 && index < pdf.numPages ? index + 1 : null;
}

export async function renderInternalLinks({ pdf, page, viewport, container, isCurrent, navigate }) {
  const annotations = await page.getAnnotations({ intent: 'display' });
  const links = await Promise.all(annotations.map(async annotation => {
    if (annotation.subtype !== 'Link' || !annotation.dest || annotation.noHTML) return null;
    if (!Array.isArray(annotation.rect) || annotation.rect.length !== 4 || !annotation.rect.every(Number.isFinite)) return null;
    try {
      const target = await destinationPage(pdf, annotation.dest);
      if (!target) return null;
      const rect = viewport.convertToViewportRectangle(annotation.rect);
      const left = Math.max(0, Math.min(rect[0], rect[2]));
      const top = Math.max(0, Math.min(rect[1], rect[3]));
      const width = Math.min(viewport.width, Math.max(rect[0], rect[2])) - left;
      const height = Math.min(viewport.height, Math.max(rect[1], rect[3])) - top;
      if (width <= 0 || height <= 0) return null;
      const button = container.ownerDocument.createElement('button');
      button.type = 'button';
      button.className = 'pdf-page-link';
      button.setAttribute('aria-label', `${target}페이지로 이동`);
      button.title = `${target}페이지로 이동`;
      Object.assign(button.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
      button.addEventListener('click', () => { if (isCurrent()) navigate(target); });
      return button;
    } catch {
      // A broken destination must not prevent the rest of the page from rendering.
      return null;
    }
  }));
  if (isCurrent()) container.replaceChildren(...links.filter(Boolean));
}
