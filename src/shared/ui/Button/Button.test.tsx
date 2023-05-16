import { render, screen } from '@testing-library/react';
import Button, { ButtonTheme } from '../Button/Button';

describe('Button Component Test', () => {
    test('Render button with text', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('Render button with class CLEAR', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
