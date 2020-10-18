import React from 'react';
import Cell from './Cell';
import querystring from 'querystring';
import { useServerData } from '../state/serverDataContext';


const years = [];
for (let i = 2006; i <= 2020; i++) {
    years.push(i);
}

const FilterPanel = ({ history, location }) => {
    const [context, dispatch] = useServerData();

    const extractFilters = (type, filterVal) => {
        // update url
        const existingFilters = querystring.parse(location.search.split("?")[1]);

        // de-select
        let filter;
        if (filterVal.toString() === existingFilters[type]) {
            delete existingFilters[type];
            filter = querystring.stringify({ ...existingFilters });
            dispatch({ type: "SET_FILTER", payload: existingFilters });
        } else {
            filter = querystring.stringify({ ...existingFilters, [type]: filterVal });
            dispatch({ type: "SET_FILTER", payload: { ...existingFilters, [type]: filterVal } });
        }
        return filter;
    }

    const handleCellSelection = (type, filterVal) => {
        if (filterVal === 'True') {
            filterVal = "true";
        } else if (filterVal === 'False') {
            filterVal = "false";
        }
        const filter = extractFilters(type, filterVal);
        history.push({
            pathname: '/',
            search: `?${filter}`
        });
    }

    const arrangeCell = (type, value) => {
        const cellRows = [];
        let selectedCell;
        if (context.filter && context.filter.launch_year && type === "launch_year") {
            selectedCell = `launch_year_${context.filter.launch_year}`
        } else if (context.filter && context.filter.launch_success && type === "launch_success") {
            selectedCell = `launch_success_${context.filter.launch_success}`
        } else if (context.filter && context.filter.land_success && type === "land_success") {
            selectedCell = `land_success_${context.filter.land_success}`
        }
        for (let i = 0; i < value.length; i = i + 2) {
            cellRows.push(<div key={`${type}_${value[i]}`} className="cell-row">
                <Cell key={`${type}_${value[i]}`} type={type} text={value[i]} selectCell={handleCellSelection} isSelected={`${type}_${value[i]}` === selectedCell} />
                {i + 1 < value.length && <Cell key={`${type}_${value[i + 1]}`} type={type} text={value[i + 1]} selectCell={handleCellSelection} isSelected={`${type}_${value[i + 1]}` === selectedCell} />}
            </div>)
        }
        return cellRows;
    }

    return (
        <div className="filter-panel">
            <h4 style={{ margin: "10px 0" }}>Filters</h4>
            <div>
                <div className="bottom-border">Launch Year</div>
                <div>
                    {arrangeCell("launch_year", years)}
                </div>

            </div>
            <div>
                <div className="bottom-border">Successful Launch</div>
                {arrangeCell("launch_success", ["true", "false"])}
            </div>

            <div>
                <div className="bottom-border">Successful Landing</div>
                {arrangeCell("land_success", ["true", "false"])}
            </div>
        </div>
    );
}

export default FilterPanel;