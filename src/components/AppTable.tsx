import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import React, { useState } from "react";
import { Tag } from "primereact/tag";
import { getSeverity } from "./UtilityComp";
import { InputText, FilterMatchMode } from "../assets/css/prime-library";

const statusBodyTemplate = (rowData) => {
  return (
    <Tag value={rowData.Status} severity={getSeverity(rowData.Status)}></Tag>
  );
};

const AppTable = (props) => {
  const {
    data,
    pageConfig,
    selectedData,
    setSelectedData,
    globalFilter,
    loading,
    handleActions,
  } = props;
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const actionBodyTemplate: any = (rowData) => {
    return (
      <React.Fragment>
        {pageConfig.tableActions.map((item) => {
          return (
            (item.name === "edit" && (
              <Button
                label=""
                title="Edit"
                icon="pi pi-pencil"
                className="mr-2"
                onClick={() => handleActions.edit(rowData)}
              />
            )) ||
            (item.name === "delete" && (
              <Button
                label=""
                severity="danger"
                icon="pi pi-trash"
                title="Clear"
                className="text-center"
                onClick={() => handleActions.delete(rowData)}
              />
            ))
          );
        })}
      </React.Fragment>
    );
  };

  const TableHeader = () => {
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters["global"].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
    };

    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const loadActionContent = (rowData) => {
    return actionBodyTemplate(rowData);
  };

  const loadContent = (col) => {
    switch (col.badge) {
      case true:
        return statusBodyTemplate;
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <DataTable
          value={data}
          showGridlines
          filters={filters}
          selection={selectedData}
          emptyMessage={"No Data Found"}
          style={{
            minWidth: "50rem",
          }}
          onSelectionChange={(e) => setSelectedData(e.value)}
          dataKey="id"
          paginator={pageConfig.tablePagination}
          rows={pageConfig.tableRows}
          rowsPerPageOptions={pageConfig.tableRowsOptions}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          globalFilter={globalFilter}
          header={TableHeader}
        >
          {pageConfig.tableAction ? (
            <Column
              field={"Actions"}
              header={"Actions"}
              style={pageConfig.tableActionStyle}
              body={loadActionContent}
            ></Column>
          ) : null}
          {pageConfig.tableCheckSelection ? (
            <Column selectionMode="multiple" exportable={false}></Column>
          ) : null}

          {pageConfig.tableColumns.length > 0 &&
            pageConfig.tableColumns.map((col) => {
              return (
                <Column
                  key={col.name}
                  field={col.name}
                  header={col.title}
                  sortable={col.sort}
                  style={col.colStyle}
                  body={loadContent(col)}
                ></Column>
              );
            })}
        </DataTable>
      )}
    </>
  );
};

export default AppTable;
