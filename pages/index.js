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

export default HomePage;
