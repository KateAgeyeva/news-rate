const Top = ({ news }) => {
    console.log(newTwo);
    return <ul>
        {newTwo && newTwo.map((item) => {
             if (item.image !== null) {
                 return <li>

                 </li>;
             }
        })}
    </ul>
};

export default Top;