import NewsItem from './NewsItem';

const NewsList = ({ news }) => {
  return (
    <ul className="grid gap-x-10 gap-y-4 grid-cols-2 pt-14">
      {news.map((item) => (
        <NewsItem
          key={item.id}
          id={item.id}
          url={item.url}
          date={item.date}
        />
      ))}
    </ul>
  );
};

export default NewsList;