import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';


const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>News Popularity The Netherlands</title>
        <meta name="description" content="Compare news popularity and trends in the Netherlans" />
      </Head>
      <button>
        <Link href="/compare-news">Start</Link>
      </button>
    </Fragment>
  )
}

export async function getStaticProps() {
  
  const search = await fetch(`https://newsapi.org/v2/top-headlines?country=nl&apiKey=206cf23bcbc64c26b9f3ae21410e1728`);
  const data = await search.json();
  const result = data.articles;

  return {
    props: {
      news: result.map((data) => ({
        sourceName: data.source.name,
        id: data.title,
        url: data.url,
        date: data.publishedAt
      }))
    }
  };
};

export default HomePage;
