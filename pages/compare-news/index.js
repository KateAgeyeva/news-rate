import { Fragment, useState } from 'react';
import Head from 'next/head';

const CompareNews = (props) => {
    const [query, setQuery] = useState('Weather in Amsterdam');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsResult, setNewsResult] = useState('');

    //https://newsapi.org/v2/everything?q=${query}&from=${date}&to=${today}&apiKey=206cf23bcbc64c26b9f3ae21410e1728

    const fetchNews = async () => {
        const result = await fetch(
            `https://newsapi.org/v2/everything?language=nl&q=${query}&apiKey=206cf23bcbc64c26b9f3ae21410e1728`
          );
          const data = await result.json();
          setNewsResult(data.totalResults);
    };

    const getSearchResult = (event) => {
      event.preventDefault();
      fetchNews();
      setIsLoaded(true);
    }

    return (
      <Fragment>
        <Head>
          <title>Compare News Popularity</title>
          <meta name="description" content="News in the Netherlands" />
        </Head>
        <h2>Compare News Here</h2>
        <form onSubmit={getSearchResult}>
          <label>
            Search:
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {isLoaded &&
            <p>{newsResult}</p>
        }
      </Fragment>
    );
};

const today = new Date();
const date = today.setFullYear(today.getFullYear() - 1);

// export async function getStaticProps() {
//     const search = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${date}&to=${today}&apiKey=206cf23bcbc64c26b9f3ae21410e1728`);
//     const data = await search.json();
//     const result = data.totalResults;

//     return {
//         props: {
//             totalNumber: result
//         }
//     }
// }

export default CompareNews;