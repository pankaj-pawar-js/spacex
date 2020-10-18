import React from 'react';
import Card from './Card';

const CardList = ({ list }) => {
    return (
        <div className="card-list">
            {list.map((data) => <Card key={`${data.mission_name}_${data.flight_number}`} data={data} />)}
        </div>
    );
}

export default CardList;