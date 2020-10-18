import React from 'react';
import { render } from '@testing-library/react';

import Home from '../Home';
import { ServerDataProvider } from '../../state/serverDataContext';
import reducer from '../../state/reducer';

describe('<Home />', () => {
  let container = null;
  beforeEach(() => {
    const initialState = [
      {
        flight_number: 1, mission_name: "FalconSat", mission_id: [],
        launch_year: "2014", land_success: "true", launch_success: "true", links: { mission_patch_small: "url" }
      }
    ];

    const mount = render(
      <ServerDataProvider reducer={reducer} initialState={initialState}>
        <Home />
      </ServerDataProvider>
    );
    container = mount.container;
  })
  it('Home component should render', () => {
    // check header
    expect(container.querySelector('h1').textContent).toEqual('SpaceX Launch Programs');
    // check Home component's children count
    expect(container.querySelector('.home').childNodes.length).toEqual(2);
    expect(container.querySelector('.filter-panel').querySelector('h4').textContent).toEqual('Filters');
  });

});
