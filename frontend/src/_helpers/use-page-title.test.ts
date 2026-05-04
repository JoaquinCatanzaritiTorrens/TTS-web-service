import { renderHook } from '@testing-library/react';
import { usePageTitle } from './use-page-title';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('usePageTitle Hook', () => {
    const originalTitle = document.title;

    beforeEach(() => {
        document.title = originalTitle;
    });

    afterEach(() => {
        document.title = originalTitle;
    });

    it('should set the document title to the provided text', () => {
        renderHook(() => usePageTitle('New Title'));
        expect(document.title).toBe('New Title');
    });
});