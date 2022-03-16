import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NewsList from '../components/news/NewsList';


const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>News Popularity The Netherlands</title>
        <meta
          name="description"
          content="Compare news popularity and trends in the Netherlans"
        />
      </Head>
      <div className="fixed bg-sky-800 text-white w-full py-4 font-serif font-semibold">
        <p className="text-4xl overline text-center">Top News NL</p>
      </div>
      <div className="flex justify-center space-x-10 pt-28 bg-sky-400 text-white pb-10">
        <button className='text-lg font-medium underline'>
          <Link href="/compare-news">Click here to compare any news worldwide</Link>
        </button>
      </div>
      <div className="container mx-auto">
        <p className="flex justify-center pt-10 text-2xl text-slate-500">Top-20 most recent news in the Netherlands</p>
        <NewsList news={props.news} />
      </div>
      <footer className="flex justify-center p-10">
        <p>This web app is made with the help of <a href="https://newsapi.org/" target='_blank'>News API</a></p>
      </footer>
    </Fragment>
  );
}

export async function getStaticProps() {
  
  const search = await fetch(`https://newsapi.org/v2/top-headlines?country=nl&apiKey=206cf23bcbc64c26b9f3ae21410e1728`);
  const data = await search.json();
  const result = data.articles;

  return {
    props: {
      news: result.map((data) => ({
        id: data.title,
        url: data.url,
        date: data.publishedAt
      }))
    }
  };
};

export default HomePage;
