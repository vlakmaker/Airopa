/**
 * Custom error classes for content loading and processing
 */
export class ContentLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContentLoadError';
  }
}

export class ContentParseError extends Error {
  constructor(message: string, public rawContent?: string) {
    super(message);
    this.name = 'ContentParseError';
  }
}

export class ContentValidationError extends Error {
  constructor(message: string, public missingFields?: string[]) {
    super(message);
    this.name = 'ContentValidationError';
  }
}

/**
 * Standardize error handling across the application
 */
export function handleContentError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === 'string') {
    return new Error(error);
  }

  return new Error('Unknown content loading error');
}

/**
 * Validate required frontmatter fields
 */
export function validateFrontmatter(data: any): void {
  const requiredFields = ['title', 'date', 'pillar'];
  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
    throw new ContentValidationError(
      `Missing required frontmatter fields: ${missingFields.join(', ')}`,
      missingFields
    );
  }
}