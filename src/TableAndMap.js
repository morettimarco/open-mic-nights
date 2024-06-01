// Importing necessary libraries and components
import React, { useState, useEffect, useMemo } from "react";
import { useFilters, useTable } from "react-table";
import {
  BsPencilSquare,
  BsInstagram,
  BsFacebook,
  BsWhatsapp,
  BsEnvelopeAt,
  BsGoogle,
} from "react-icons/bs";
import Map from "./Map";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { ApiKey } from "./constants";

// Spreadsheet ID
const SpreadsheetId = "1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8";

// Function to create a select filter for the table
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="select is-small"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

/**
 * A search filter for a column in a table.
 *
 * @param {Object} column - The column to filter.
 * @param {string} column.filterValue - The current filter value.
 * @param {function} column.setFilter - The function to call to set the filter value.
 * @returns {JSX.Element} - The search input element.
 */
function SearchColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    // The search input element
    <input
      className="input is-small" // The class name for styling
      value={filterValue || ""} // The current filter value or an empty string
      onChange={(e) => setFilter(e.target.value)} // The function to call when the input value changes
    />
  );
}

/**
 * Custom hook to fetch data from a Google Spreadsheet.
 *
 * @param {string} spreadsheetId - The ID of the Google Spreadsheet.
 * @param {string} apiKey - The API key to access the Google Spreadsheet.
 * @returns {Object} - The fetched data including header values, rows, and fetching status.
 */
function useFetchData(spreadsheetId, apiKey) {
  const [data, setData] = useState({
    headerValues: null,
    rows: [],
    isFetching: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setData({ ...data, isFetching: true });

        const doc = new GoogleSpreadsheet(spreadsheetId);
        doc.useApiKey(apiKey);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        rows.sort((a, b) => a.Name.localeCompare(b.Name));

        setData({
          headerValues: sheet.headerValues,
          rows: rows,
          isFetching: false,
        });
      } catch (e) {
        console.error(e);
        setData({ ...data, isFetching: false });
      }
    }

    fetchData();
  }, [spreadsheetId, apiKey]);

  return data;
}

/**
 * Custom hook to process the rows data.
 *
 * @param {Object} data - The data object containing header values, rows, and fetching status.
 * @returns {Array} - The processed rows data.
 */
function useRowsData(data) {
  return useMemo(() => {
    if (!data.isFetching && data.headerValues != null) {
      return data.rows.map((row) => ({
        Address: row["Address"],
        AudienceEntryFee: row["Audience Entry Fee"],
        HowToBook: row["Contact / Book a Spot"],
        Language: row["Language"],
        Category: row["Event Category"],
        SubCategory: row["Event Sub-Category"],
        Status: row["Status"],
        OrganizerName: row["Organizer Name"],
        Description: row["Event Description"],
        FacebookGroup: row["Facebook Group"],
        FacebookPage: row["Facebook Page"],
        WhatsApp: row["WhatsApp"],
        GForm: row["Google Form"],
        Email: row["Email"],
        Frequency: row["Frequency"],
        Instagram: row["Instagram"],
        Latitude: row["Latitude"],
        Level: row["Comedian Level"],
        Longitude: row["Longitude"],
        Name: row["Name"],
        RowNumber: row.rowNumber,
        Time: row["Event Time"],
        UpdateInfoFormLink: row["Update Info Form Link"],
        Venue: row["Venue"],
        Weekday: row["Weekday / Month"],
        Website: row["Website"],
        WheelchairAccess: row["Wheelchair Access"],
      }));
    }
    return [];
  }, [data]);
}

/**
 * Custom hook to define the table columns.
 *
 * @param {Object} data - The data object containing header values, rows, and fetching status.
 * @returns {Array} - The table columns definition.
 */
function useColumns(data) {
  return useMemo(() => {
    if (!data.isFetching && data.headerValues != null) {
      return [
        {
          Header: "",
          accessor: "UpdateInfoFormLink",
          disableFilters: true,
          Cell: ({ row }) => (
            <a href={row.original.UpdateInfoFormLink} target="_blank">
              <BsPencilSquare />
            </a>
          ),
        },
        {
          Header: "",
          accessor: "Instagram",
          maxWidth: 20,
          minWidth: 20,
          width: 20,
          disableFilters: true,
          Cell: ({ row }) => (
            <div>
              <a
                href={row.original.Instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram />
              </a>
              <a
                href={row.original.FacebookPage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook />
              </a>
              <a href={row.original.WhatsApp}>
                <BsWhatsapp />
              </a>
              <a
                href={row.original.GForm}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGoogle />
              </a>
              <a
                href={
                  row.original.Email === ""
                    ? ""
                    : row.original.Language === "Italian" // Generates a different email link for Italian speakers
                    ? `mailto:${row.original.Email}?subject=Iscrizione%20open%20mic%20${row.original.Venue}`
                    : `mailto:${row.original.Email}?subject=Sign%20up%20to%20open%20mic%20${row.original.Venue}`
                }
              >
                <BsEnvelopeAt />
              </a>
            </div>
          ),
        },
        {
          Header: "Name",
          accessor: "Name",
          disableFilters: false,
          maxWidth: 300,
          minWidth: 300,
          Cell: ({ cell: { value } }) => (
            <b>
              <i>{value}</i>
            </b>
          ),
          Filter: SearchColumnFilter,
        },
        // Add other column definitions here...
        {
          Header: "Description",
          accessor: "Description",
          hideInitially: true,
          Filter: SearchColumnFilter,
        },
        {
          Header: "Category",
          accessor: "Category",
          hideInitially: true,
          Filter: SearchColumnFilter,
        },
        {
          Header: "Sub Category",
          accessor: "SubCategory",
          hideInitially: true,
          Filter: SearchColumnFilter,
        },
        {
          Header: "Status",
          accessor: "Status",
          maxWidth: 600,
          Filter: SelectColumnFilter,
          filter: "equals",
        },
        {
          Header: "Organizer Name",
          accessor: "OrganizerName",
          hideInitially: true,
          Filter: SearchColumnFilter,
        },
        {
          Header: "Audience Entry Fee",
          accessor: "AudienceEntryFee",
          hideInitially: true,
          Filter: SelectColumnFilter,
        },
        {
          Header: "Level",
          accessor: "Level",
          Filter: SelectColumnFilter,
          filter: "equals",
        },
        {
          Header: "Language",
          accessor: "Language",
          Filter: SelectColumnFilter,
        },
        {
          Header: "Frequency",
          accessor: "Frequency",
          Filter: SelectColumnFilter,
        },
        {
          Header: "Weekday",
          accessor: "Weekday",
          Filter: SelectColumnFilter,
        },
        {
          Header: "Time",
          accessor: "Time",
          Filter: SearchColumnFilter,
        },
        {
          Header: "Venue",
          accessor: "Venue",
          maxWidth: 600,
          minWidth: 200,
          width: 400,
          Filter: SearchColumnFilter,
          disableFilters: true,
        },
        {
          Header: "Website",
          accessor: "Website",
          hideInitially: true,
          disableFilters: true,
        },
        {
          Header: "Address",
          accessor: "Address",
          maxWidth: 600,
          minWidth: 300,
          width: 400,
          Filter: SearchColumnFilter,
          disableFilters: true,
        },
        {
          Header: "Wheelchair Access",
          accessor: "WheelchairAccess",
          hideInitially: true,
          Filter: SelectColumnFilter,
        },
        {
          Header: "How To Book",
          accessor: "HowToBook",
          Filter: SearchColumnFilter,
          disableFilters: true,
        },
        {
          Header: "Facebook Group",
          accessor: "FacebookGroup",
          hideInitially: true,
          disableFilters: true,
          Cell: ({ row }) => (
            <a href={row.original.FacebookGroup}>
              {row.original.FacebookGroup}
            </a>
          ),
        },
      ];
    }
    return [];
  }, [data]);
}

/**
 * Custom hook to create a table instance using React Table.
 *
 * @param {Array} columns - The columns definition.
 * @param {Array} rowsData - The rows data.
 * @returns {Object} - The table instance.
 */
function useTableInstance(columns, rowsData) {
  return useTable(
    {
      columns,
      data: rowsData,
      initialState: {
        hiddenColumns: columns
          .filter((c) => c.hideInitially)
          .map((c) => c.accessor),
      },
    },
    useFilters
  );
}

/**
 * Component to render the table and map.
 *
 * @param {Object} tableInstance - The table instance.
 * @returns {JSX.Element} - The rendered component.
 */
function TableComponent({ tableInstance }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = tableInstance;

  return (
    <>
      <div className="columns is-multiline">
        <span className="map column is-12-mobile is-5-desktop">
          <Map results={rows} />
        </span>
        <span className="table_wrapper column is-12-mobile is-7-desktop">
          <div id="table-dropdown" className="dropdown">
            <div className="dropdown-trigger">
              <button
                className="button"
                onClick={() =>
                  document
                    .getElementById("table-dropdown")
                    .classList.toggle("is-active")
                }
              >
                Select columns 🔽
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              {allColumns.map((column) => (
                <div key={column.id} className="dropdown-content">
                  <label className="checkbox">
                    <input type="checkbox" {...column.getToggleHiddenProps()} />
                    {column.id}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <table className="table is-hoverable" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps({
                        style: {
                          minWidth: column.minWidth,
                          width: column.width,
                        },
                      })}
                    >
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </span>
      </div>
    </>
  );
}

/**
 * Main component to fetch data and render the table and map.
 *
 * @returns {JSX.Element} - The rendered component.
 */
function TableAndMap() {
  const data = useFetchData(SpreadsheetId, ApiKey);
  const rowsData = useRowsData(data);
  const columns = useColumns(data);
  const tableInstance = useTableInstance(columns, rowsData);

  return <TableComponent tableInstance={tableInstance} />;
}

export default TableAndMap;
