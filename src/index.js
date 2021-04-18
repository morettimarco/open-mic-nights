import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import './styles.css';
import { useFilters, useTable } from 'react-table'
import logo from './apple-touch-icon.png';

const { GoogleSpreadsheet } = require('google-spreadsheet');

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}


function TableAndMap() {
  console.log(logo)
  const [data, setData] = useState({ headerValues: null, rows: [], isFetching: false });

  useEffect(() => {
    (async function () {
      try {
        setData({ ...data, isFetching: true });

        const doc = new GoogleSpreadsheet('1uwHo4bGisUiQgwAnkFbVUZG2fabZD-uwaNx4JHlWnSs');
        doc.useApiKey("AIzaSyDWzk5MJLYVpzppXB9xxJWjVJnoe97erbc");
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]
        const rows = await sheet.getRows()

        setData({ headerValues: sheet.headerValues, rows: rows, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ ...data, isFetching: false });
      }
    }());
  }, []);

  const rowsData = React.useMemo(
    () => {
      if (!data.isFetching && data.headerValues != null) {
        return data.rows.map((item) => {
          return {
            RowNumber: item.rowNumber,
            Bringer: item.Bringer,
            FacebookPage: item.FacebookPage,
            Frequency: item.Frequency,
            Name: item.Name,
            Venue: item.Venue,
            Latitude: item.Latitude,
            Longitude: item.Longitude,
          }
        })
      }

      return []
    },
    [data]
  )

  const columns = React.useMemo(
    () => {
      if (!data.isFetching && data.headerValues != null) {
        // return data.headerValues.map((item) => { return { Header: item, accessor: item }; })
        return [
          {
            Header: 'Bringer',
            accessor: 'Bringer',
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Facebook Page',
            accessor: 'FacebookPage',
          },
          {
            Header: 'Frequency',
            accessor: 'Frequency',
          },
          {
            Header: 'Name',
            accessor: 'Name',
          },
          {
            Header: 'Venue',
            accessor: 'Venue',
          },
          {
            Header: 'Latitude',
            accessor: 'Latitude',
          },
          {
            Header: 'Longitude',
            accessor: 'Longitude',
          },
          {
            Header: 'RowNumber',
            acccessor: 'RowNumber',
          }
        ]
      }

      return []
    },
    [data]
  )

  const filterTypes = React.useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: SelectColumnFilter,
    }),
    []
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({ columns, data: rowsData, defaultColumn, filterTypes }, useFilters)

  return (
    <div>
      <div className="columns is-multiline">
        <span className="map column is-12-mobile is-5-desktop">
          <Map
            results={rows}
          />
        </span>
        <span className="column is-12-mobile is-7-desktop">
          <table className=" table is-hoverable" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                      <div>{column.canFilter ? column.render("Filter") : null}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </span>
      </div>
    </div>
  )
}

const InfoWindow = (props) => {
  const { name } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 50,
    left: '-45px',
    textAlign: 'center',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        {name}
      </div>
    </div>
  );
};

class MapMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const markerStyle = {
      border: '1px solid white',
      borderRadius: '50%',
      height: 20,
      width: 20,
      backgroundColor: this.props.show ? 'red' : 'blue',
      cursor: 'pointer',
      zIndex: 10,
    };
    return (
      <div style={markerStyle}>
        {this.props.show && <InfoWindow name={this.props.name} />}
      </div>
    );
  }
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    }
  }

  _onChildClick = (key, childProps) => {
    this.setState((state) => {
      let index = state.results.findIndex(e => e.show);
      if (index > 0 && state.results[index].original.RowNumber != parseInt(key)) {
        state.results[index].show = false;
      }
      index = state.results.findIndex(e => e.original.RowNumber == parseInt(key));
      state.results[index].show = !state.results[index].show; // eslint-disable-line no-param-reassign
      return { results: state.results };
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.results != prevProps.results) {
      this.setState(() => {
        const newState = this.props.results.map(result => ({ ...result, show: false }));
        return { results: newState };
      })
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB2xTrXYV7Y6bN1BVVPrt2ZUglBPTZ-2S4' }}
          defaultCenter={{ lat: 51.5074, lng: -0.05 }}
          defaultZoom={14}
          onChildClick={this._onChildClick}
        >
          {this.state.results.map((item) =>
            <MapMarker
              key={item.original.RowNumber}
              lat={item.original.Latitude}
              lng={item.original.Longitude}
              name={item.original.Name}
              show={item.show}
            />,
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <nav className="navbar is-white has-shadow py-4 mb-2">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src={logo} style={{ maxHeight: "60px" }} />
          </a>
          <div className="navbar-item">
            <p className="title">
              🎙Search Open Mic Nights in London
            </p>
          </div>
          <div className="navbar-burger" onClick={() => document.getElementById("nav-links").classList.toggle("is-active")}>
            <span></span>
            <span></span>
            <span></span>

          </div>
        </div>
        <div className="navbar-menu" id="nav-links">
          <div className="navbar-end">
            <a className="navbar-item">Facebook</a>
            <a className="navbar-item">Sheet</a>
            <a className="navbar-item">🙏 Submit feedback 🙏</a>
          </div>
        </div>
      </nav>

      <TableAndMap />

      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column has-text-weight-bold	has-text-right">
              My night's details are out of date! How do I update this?
            </div>
            <div className="column">
              Just let us know: email addr.
            </div>
          </div>

          <div className="columns">
            <div className="column has-text-weight-semibold	has-text-right">
              My night isn't listed! How can I add it?
            </div>
            <div className="column">
              You guessed it - just let us know: email addr.
            </div>
          </div>

        </div>
      </div>
      <p className="has-text-centered my-2 mx-2">
        Website created with ❤ by <a href="https://apuchitnis.github.io/">@apuchitnis</a>. Thanks to GC for compiling all of the data.
      </p>
    </div>
  );
}

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);