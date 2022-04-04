import NewsItem from './NewsItem';

import { useDispatch } from 'react-redux';

const NewsList = ({ news }) => {
  const newsNewList = news.filter((item) => item.image !== null);
  const newsTwo = newsNewList.splice(0, 2);

  return (
    <div>
      <ul className="grid gap-x-4 gap-y-4 grid-cols-2 mt-14 mr-6 ml-6">
        {news && newsTwo.map((item) => {
          return (
            <NewsItem
              key={item.id}
              id={item.id}
              url={item.url}
              date={item.date}
              image={item.image}
              description={item.description}
            />
          );
        })}
      </ul>
      <ul className="grid gap-x-4 gap-y-4 grid-cols-4 mt-14 mr-6 ml-6">
        {news && newsNewList.map((item) => {
            return (
              <NewsItem
                key={item.id}
                id={item.id}
                url={item.url}
                date={item.date}
                image={item.image}
                description={item.description}
              />
            );
          }
        )}
      </ul>
    </div>
  );
};

export default NewsList;