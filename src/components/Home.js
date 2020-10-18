import React, { useState, useEffect, useMemo } from 'react';

import { api } from '../api';
import { useServerData } from '../state/serverDataContext';
import FilterPanel from './FilterPanel';
import CardList from './CardList';
import querystring from 'querystring';

const Home = (props) => {
  const [allLaunches, dispatch] = useServerData((data, dispatch) => {
    // console.log("store: => ", data);
    return [data.launches || [], dispatch];
  });

  const [filter] = useServerData((data, dispatch) => {
    // console.log("store: => ", data);
    return [data.filter || [], dispatch];
  });

  const [launches, setLaunches] = useState(allLaunches);
  const { location } = props;

  const filterLaunchDataBasedOnQS1 = (filter) => {
    let filterData;
    if (filter.launch_year && (filter.launch_success === true || filter.launch_success === false)) {
      filterData = allLaunches.filter(item => item.launch_year === filter.launch_year && item.launch_success === filter.launch_success);
    } else if (filter.launch_year) {
      filterData = allLaunches.filter(item => item.launch_year === filter.launch_year);
    } else if (filter.launch_success === true || filter.launch_success === false) {
      filterData = allLaunches.filter(item => item.launch_success === filter.launch_success);
    } else {
      filterData = allLaunches;
    }
    return filterData;
  }

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
    // check if query string is set
    if (filter) {
      /*
      
      const filter = allLaunches.filter;
      dispatch({ type: "SET_FILTER", payload: { ...filter } });

      if (filter.launch_success === "True") {
        filter.launch_success = true;
      } else if (filter.launch_success === "False") {
        filter.launch_success = false;
      }
      */

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


  console.log("*************req.url => ", params);

  return api.spaceX.default(search).then(launches => {
    const returnData = {
      launches,
      filter: {
        launch_year: params.launch_year,
        launch_success: params.launch_success,
        land_success: params.land_success
      }
    };
    // console.log("***************** launches =>", returnData);
    return returnData;
  });
};

export default Home;
