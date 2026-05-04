import React from 'react';
import { render, screen } from '@testing-library/react';
import GradientText from './GradientText';
import { describe, it, expect } from 'vitest';

describe('GradientText Component', () => {
    it('should render the component with correct children', () => {
        render(<GradientText>Hello World</GradientText>);
        
        const element = screen.getByText('Hello World');
        expect(element).toBeInTheDocument();
        expect(element.tagName.toLowerCase()).toBe('h2');
        expect(element).toHaveClass('gradient-text-component');
    });
});