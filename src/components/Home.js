import React, { useState, useEffect, useMemo } from 'react';

import { api } from '../api';
import { useServerData } from '../state/serverDataContext';
import FilterPanel from './FilterPanel';
import CardList from './CardList';
import querystring from 'querystring';

const Home = (props) => {
  const [allLaunches, dispatch] = useServerData((data, dispatch) => {
    return [data.launches || [], dispatch];
  });

  const [filter] = useServerData((data, dispatch) => {
    return [data.filter || [], dispatch];
  });

  const [launches, setLaunches] = useState(allLaunches);

  const filterLaunchDataBasedOnQS = (params) => {
    const search = querystring.stringify(params);
    api.spaceX.default(search).then(launches => {
      const returnData = {
        launches,
        filter: {
          launch_year: params.launch_year,
          launch_success: params.launch_success,
          land_success: params.land_success
        }
      };

      return returnData;
    }).then((data) => {
      setLaunches(data.launches);
    });
  }

  useEffect(() => {
    if (filter) {
      filterLaunchDataBasedOnQS(filter);
    }
  }, [filter]);

  return (
    <div>
      <h1>SpaceX Launch Programs</h1>
      <div className="home">
        <FilterPanel {...props} />
        <CardList list={launches} />
      </div>
    </div>
  );
};

Home.fetchData = (req) => {
  const search = req.url.split("?")[1];
  const params = querystring.parse(search);

  return api.spaceX.default(search).then(launches => {
    const returnData = {
      launches,
      filter: {
        launch_year: params.launch_year,
        launch_success: params.launch_success,
        land_success: params.land_success
      }
    };
    return returnData;
  });
};

export default Home;
