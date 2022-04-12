import { Fragment } from 'react';
import Head from 'next/head';
import NewsList from '../components/news/NewsList';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Popular News NL</title>
        <meta
          name="description"
          content="Compare news popularity and trends in the Netherlands"
        />
      </Head>
        <div className="container mx-auto">
          <p className="flex justify-center pt-10 text-3xl font-bold">
            Top Most Recent News in the Netherlands
          </p>
          <NewsList news={props.news} />
        </div>
    </Fragment>
  );
}

//FETCH DATA FROM API TO PROPS
export async function getStaticProps() {
  try {
    const search = await fetch(`https://newsapi.org/v2/top-headlines?country=nl&apiKey=${process.env.apiKey}`);
  const data = await search.json();
  const result = data.articles;

    return {
      props: {
        news: result.map((data) => ({
          id: data.title,
          url: data.url,
          date: data.publishedAt,
          image: data.urlToImage,
          description: data.description
        }))
      }
    };
   } catch (err) {
     console.error(err);
     return {
       notFound: true
     }
   }
  
};

export default HomePage;
