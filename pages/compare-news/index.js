import { Fragment, useState } from 'react';
import Head from 'next/head';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CompareNews = (props) => {
    const [query, setQuery] = useState('Weather in Amsterdam');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsResult, setNewsResult] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    
    const today = new Date();
    const start = startDate.toDateString();
    const end = endDate.toDateString();

    //https://newsapi.org/v2/everything?q=${query}&from=${date}&to=${today}&apiKey=206cf23bcbc64c26b9f3ae21410e1728

    const fetchNews = async () => {
        const result = await fetch(
            `https://newsapi.org/v2/everything?q=${query}&from=${start}&to=${end}&apiKey=206cf23bcbc64c26b9f3ae21410e1728`
          );
          const data = await result.json();
          console.log(data.totalResults);
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
        <h2>See News Rate 2022</h2>
        <form onSubmit={getSearchResult}>
        <label>
            Start date:
            <DatePicker type='date' selected={startDate} onSelect={(date) => setStartDate(date)} dateFormat='yyyy-MM-dd' />
        </label>
        <label>
            End date:
            <DatePicker type='date' selected={endDate} onSelect={(date) => setEndDate(date)} dateFormat='yyyy-MM-dd' />
        </label>
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


// const toDate = today.setFullYear(today.getFullYear() - 1);

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