import { Marked } from 'marked';

// Markdown de las notas de versión. Se muestra con set:html, así que se
// endurece: el HTML crudo se escapa y no se aceptan enlaces ni imágenes con
// esquemas distintos de http(s), mailto o rutas del sitio.
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SAFE_URL = /^(https?:|mailto:|\/|#)/i;

const notes = new Marked({
  renderer: {
    html: ({ text }) => escapeHtml(text),
  },
  walkTokens(token) {
    if ((token.type === 'link' || token.type === 'image') && !SAFE_URL.test(token.href.trim())) {
      token.href = '#';
    }
  },
});

export function renderNotes(markdown: string): string {
  return notes.parse(markdown, { async: false });
}
