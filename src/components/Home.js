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

  const [launches, setLaunches] = useState(allLaunches);
  const { location } = props;

  const filterLaunchDataBasedOnQS = (filter) => {
    let filterData;
    if (filter.year && (filter.launch_success === true || filter.launch_success === false)) {
      filterData = allLaunches.filter(item => item.launch_year === filter.year && item.launch_success === filter.launch_success);
    } else if (filter.year) {
      filterData = allLaunches.filter(item => item.launch_year === filter.year);
    } else if (filter.launch_success === true || filter.launch_success === false) {
      filterData = allLaunches.filter(item => item.launch_success === filter.launch_success);
    } else {
      filterData = allLaunches;
    }
    return filterData;
  }

  useEffect(() => {
    // check if query string is set
    if (location.search) {
      const filter = querystring.parse(location.search.split("?")[1]);
      dispatch({ type: "SET_FILTER", payload: { ...filter } });

      if (filter.launch_success === "True") {
        filter.launch_success = true;
      } else if (filter.launch_success === "False") {
        filter.launch_success = false;
      }

      const filterData = filterLaunchDataBasedOnQS(filter);
      setLaunches(filterData);
    }
  }, [location.search]);

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

Home.fetchData = () => {
  return fetch('https://api.spacexdata.com/v3/launches?limit=100').then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }).then(launches => {
    const returnData = {
      launches,
      filter: {
        year: null,
        launch_success: null,
        land_success: null
      }
    };
    // console.log("***************** launches =>", returnData);
    return returnData;
  });
};

export default Home;
