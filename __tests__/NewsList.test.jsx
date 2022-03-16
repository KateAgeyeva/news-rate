import { render, screen } from '@testing-library/react';
import NewsList from '../components/news/NewsList';

describe('NewsList', () => {
    //can't get through slice method in NewsItem
    it('renders news if request succeeds', async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: 'Title', url: 'www.url.com', date: new Date() }],
        });
        render(<NewsList />)
        const list = await screen.findAllByRole('listitem')
        expect(list).not.toHaveLength(0);
    });
})