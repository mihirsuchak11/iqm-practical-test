import DOMPurify from 'dompurify';

/**
 * sanitize DOMPurify function
 */
export const sanitize = DOMPurify.sanitize;

/**
 * createMarkup function will return sanitized html
 * @param content - {string}
 * @returns {html} version of sanitized content
 */
export function createMarkup(content: string): { __html: string } {
  return { __html: sanitize(content) };
}
