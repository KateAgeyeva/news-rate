import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index';

describe('HomePage', () => {
    it('renders news if request succeeds', async() => {
        render(<HomePage />)
        const list = await screen.findAllByRole('list')
        expect(list).not.toHaveLength(0);
    });
    it('contains text "Compare any News worldwide"', async() => {
        render(<HomePage />)
        const text = await screen.findByText('Compare any News worldwide')
        expect(text).toBeInTheDocument;
    });
})