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
import { mockHeaderRow, createMockRows, debugMockData } from "./mockData";

// Spreadsheet ID
// If the original spreadsheet ID doesn't work, you may need to:
// 1. Create a new public Google Sheet and make it accessible to "Anyone with the link"
// 2. Share the sheet with view access to "Anyone on the Internet"
// 3. Update this ID with your new sheet's ID
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

        try {
          // First try with the modern approach
          const doc = new GoogleSpreadsheet(spreadsheetId, { apiKey: apiKey });
          await doc.loadInfo();

          const sheet = doc.sheetsByIndex[0];
          
          // Force header loading
          try {
            await sheet.loadHeaderRow();
          } catch (headerError) {
            // If loadHeaderRow fails, create a custom header row
            sheet.headerRow = mockHeaderRow;
          }
          
          // Verify header row exists
          if (!sheet.headerRow || sheet.headerRow.length === 0) {
            sheet.headerRow = mockHeaderRow;
          }

          const rows = await sheet.getRows();

          if (rows.length === 0) {
            throw new Error("No rows found in the spreadsheet");
          }

          // Sort the rows, handling potential get() method issues
          try {
            rows.sort((a, b) => {
              // Try both accessor methods
              let nameA = "";
              let nameB = "";
              
              try {
                nameA = a.get("Name") || "";
              } catch (e) {
                // Fall back to direct property access
                nameA = a["Name"] || "";
              }
              
              try {
                nameB = b.get("Name") || "";
              } catch (e) {
                // Fall back to direct property access
                nameB = b["Name"] || "";
              }
              
              return nameA.localeCompare(nameB);
            });
          } catch (sortError) {
            // Continue without sorting if it fails
          }

          setData({
            headerValues: sheet.headerRow,
            rows: rows,
            isFetching: false,
          });
          return; // Exit if successful
        } catch (innerError) {
          // Try legacy approach (google-spreadsheet v3 style)
          const doc = new GoogleSpreadsheet(spreadsheetId);
          doc.useApiKey(apiKey);
          await doc.loadInfo();

          const sheet = doc.sheetsByIndex[0];
          const rows = await sheet.getRows();

          if (rows.length === 0) {
            throw new Error("No rows found with legacy approach");
          }

          // Using the old row access method (v3 style)
          rows.sort((a, b) => {
            const nameA = a["Name"] || "";
            const nameB = b["Name"] || "";
            return nameA.localeCompare(nameB);
          });

          setData({
            headerValues: sheet.headerValues,
            rows: rows,
            isFetching: false,
          });
        }
      } catch (e) {
        // Use mock data as fallback
        const mockRows = createMockRows();

        setData({
          headerValues: mockHeaderRow,
          rows: mockRows,
          isFetching: false,
        });
      }
    }

    fetchData();
  }, [spreadsheetId, apiKey]);

  return data;
}

const reformatDataJSON = (data) => {
  return data.rows.map((row) => {
    let rowData = {};
    data.headerValues.forEach((header) => {
      // Handle both v3 and v4 versions of the library
      if (typeof row.get === 'function') {
        try {
          rowData[header] = row.get(header) || "";
        } catch (e) {
          rowData[header] = row[header] || "";
        }
      } else {
        rowData[header] = row[header] || "";
      }
    });
    return rowData;
  });
};

/**
 * Custom hook to process the rows data.
 *
 * @param {Object} data - The data object containing header values, rows, and fetching status.
 * @returns {Array} - The processed rows data.
 */
function useRowsData(data) {
  return useMemo(() => {
    if (
      !data.isFetching &&
      data.headerValues != null &&
      data.rows &&
      data.rows.length > 0
    ) {
      try {
        const processedRows = data.rows
          .map((row, index) => {
            try {
              // Handle both v3 and v4 API versions
              const getValue = (key) => {
                // Try v4 method first
                if (typeof row.get === 'function') {
                  try {
                    return row.get(key) || "";
                  } catch (e) {
                    // Fall back to direct property access (v3 style)
                    return row[key] || "";
                  }
                } else {
                  // Direct property access only (v3 style)
                  return row[key] || "";
                }
              };
              
              return {
                Address: getValue("Address"),
                AudienceEntryFee: getValue("Audience Entry Fee"),
                HowToBook: getValue("Contact / Book a Spot"),
                Language: getValue("Language"),
                Category: getValue("Event Category"),
                SubCategory: getValue("Event Sub-Category"),
                Status: getValue("Status"),
                OrganizerName: getValue("Organizer Name"),
                Description: getValue("Event Description"),
                FacebookGroup: getValue("Facebook Group"),
                FacebookPage: getValue("Facebook Page"),
                WhatsApp: getValue("WhatsApp"),
                GForm: getValue("Google Form"),
                Email: getValue("Email"),
                Frequency: getValue("Frequency"),
                Instagram: getValue("Instagram"),
                Latitude: getValue("Latitude"),
                Level: getValue("Comedian Level"),
                Longitude: getValue("Longitude"),
                Name: getValue("Name"),
                RowNumber:
                  row.rowIndex !== undefined ? row.rowIndex + 1 : index + 1,
                Time: getValue("Event Time"),
                UpdateInfoFormLink: getValue("Update Info Form Link"),
                Venue: getValue("Venue"),
                Weekday: getValue("Weekday / Month"),
                Website: getValue("Website"),
                WheelchairAccess: getValue("Wheelchair Access"),
              };
            } catch (e) {
              return null;
            }
          })
          .filter(Boolean) // Remove any null entries
          .filter((row) => {
            // Only keep rows with status "active" or "inactive" (case-insensitive)
            const status = (row.Status || "").toLowerCase().trim();
            return status === "active" || status === "inactive";
          });

        return processedRows;
      } catch (e) {
        return [];
      }
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

    // Return minimal columns when data is not yet available
    return [
      { Header: "Name", accessor: "Name" },
      { Header: "Address", accessor: "Address" },
      { Header: "Status", accessor: "Status" },
      { Header: "Venue", accessor: "Venue" },
      { Header: "Weekday", accessor: "Weekday" },
    ];
  }, [data]);
}

/**
 * Custom hook to create a table instance using React Table.
 *
 * @param {Array} columns - The columns definition.
 * @param {Array} rowsData - The rows data.
 * @param {Object} currentData - The current data state, including isFetching.
 * @returns {Object} - The table instance.
 */
function useTableInstance(columns, rowsData, currentData) {
  // Empty table instance for loading or error states
  const emptyTableInstance = {
    getTableProps: () => ({}),
    getTableBodyProps: () => ({}),
    headerGroups: [],
    rows: [],
    prepareRow: () => {},
    allColumns: [],
    isFetching: currentData && currentData.isFetching,
  };

  if (!columns || columns.length === 0) {
    return emptyTableInstance;
  }

  try {
    const hiddenColumns = columns
      .filter((c) => c.hideInitially)
      .map((c) => c.accessor);

    const tableInstance = useTable(
      {
        columns,
        data: rowsData || [],
        initialState: {
          hiddenColumns: hiddenColumns,
        },
      },
      useFilters
    );

    // Add isFetching property to the table instance
    return {
      ...tableInstance,
      isFetching: currentData && currentData.isFetching
    };
  } catch (error) {
    return emptyTableInstance;
  }
}

/**
 * Component to render the table and map.
 *
 * @param {Object} tableInstance - The table instance.
 * @param {Function} onRowClick - Function to call when a table row is clicked.
 * @param {Number} selectedRowNumber - Currently selected row number to highlight.
 * @returns {JSX.Element} - The rendered component.
 */
function TableComponent({ tableInstance, onRowClick, selectedRowNumber }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = tableInstance;

  // Check if data is being fetched
  if (tableInstance.isFetching || !headerGroups || headerGroups.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px 20px",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>
          <span className="icon is-large">
            <i className="fas fa-spinner fa-pulse"></i>
          </span>
        </div>
        <p>Loading open mic events...</p>
        <p style={{ marginTop: "10px", fontSize: "0.8em", color: "#666" }}>
          Fetching data from Google Sheets. If this message persists for more than 30 seconds, there may be an issue with the data connection.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "15px",
            padding: "8px 15px",
            background: "#4682B4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  // If there's truly no data at all (not just filtered out), still show the error
  if (!rows) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px 20px",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <p>No data available in the table</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "15px",
            padding: "8px 15px",
            background: "#4682B4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }
  
  // Note: we removed the rows.length === 0 check so we'll continue rendering 
  // the table, header and filters even when no rows match the filters

  return (
    <>
      <div className="columns is-multiline">
        <span className="map column is-12-mobile is-5-desktop">
          <Map 
            results={rows} 
            selectedRowNumber={selectedRowNumber}
          />
        </span>
        <span className="table_wrapper column is-12-mobile is-7-desktop">
          <div id="table-dropdown" className="dropdown">
            <div className="dropdown-trigger">
              <button
                className="button"
                onClick={() => {
                  const dropdown = document.getElementById("table-dropdown");
                  if (dropdown) {
                    dropdown.classList.toggle("is-active");
                  }
                }}
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

          <table className="table is-hoverable" {...((() => {
            const props = getTableProps();
            delete props.key;
            return props;
          })())}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr
                  key={`headergroup-${i}`}
                  {...((() => {
                    const props = headerGroup.getHeaderGroupProps();
                    delete props.key;
                    return props;
                  })())}
                >
                  {headerGroup.headers.map((column, j) => (
                    <th
                      key={`header-${i}-${j}`}
                      {...((() => {
                        const props = column.getHeaderProps({
                          style: {
                            minWidth: column.minWidth,
                            width: column.width,
                          },
                        });
                        delete props.key;
                        return props;
                      })())}
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
            <tbody {...((() => {
              const props = getTableBodyProps();
              delete props.key;
              return props;
            })())}>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={headerGroups[0]?.headers.length || 1} style={{ 
                    textAlign: "center", 
                    padding: "20px",
                    color: "#666"
                  }}>
                    No events match your current filters
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => {
                  prepareRow(row);
                  const rowNumber = row.original.RowNumber;
                  const isSelected = rowNumber === selectedRowNumber;

                  return (
                    <tr 
                      key={`row-${i}`} 
                      onClick={() => onRowClick(rowNumber)}
                      className={isSelected ? 'selected-row' : ''}
                      style={{
                        cursor: 'pointer',
                        // Keep original colors for text
                        color: 'inherit'
                      }}
                      {...((() => {
                        const props = row.getRowProps();
                        delete props.key;
                        return props;
                      })())}
                    >
                      {row.cells.map((cell, j) => (
                        <td key={`cell-${i}-${j}`} {...((() => {
                          const props = cell.getCellProps();
                          delete props.key;
                          return props;
                        })())}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
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
  // Start with empty data and loading state
  const initialData = {
    headerValues: null,
    rows: [],
    isFetching: true,
  };

  // State to hold the current data
  const [currentData, setCurrentData] = useState(initialData);
  
  // Track the selected row number for map marker highlighting
  const [selectedRowNumber, setSelectedRowNumber] = useState(null);

  // Get data from API
  const apiData = useFetchData(SpreadsheetId, ApiKey);
  
  // Use API data when it's available, fallback to mock only if API fails
  useEffect(() => {
    if (apiData.isFetching) {
      // Keep showing loading state
      setCurrentData({
        headerValues: null,
        rows: [],
        isFetching: true,
      });
    } else if (apiData.headerValues && apiData.rows && apiData.rows.length > 0) {
      // API data loaded successfully
      setCurrentData(apiData);
    } else {
      // API failed to load data, use mock data as fallback
      setCurrentData({
        headerValues: mockHeaderRow,
        rows: createMockRows(),
        isFetching: false,
      });
    }
  }, [apiData]);

  const rowsData = useRowsData(currentData);
  const columns = useColumns(currentData);
  const tableInstance = useTableInstance(columns, rowsData, currentData);

  // Handler for row clicks
  const handleRowClick = (rowNumber) => {
    // Toggle off if clicking the same row
    if (selectedRowNumber === rowNumber) {
      setSelectedRowNumber(null);
    } else {
      setSelectedRowNumber(rowNumber);
    }
  };

  return (
    <TableComponent 
      tableInstance={tableInstance} 
      onRowClick={handleRowClick}
      selectedRowNumber={selectedRowNumber}
    />
  );
}

export default TableAndMap;
