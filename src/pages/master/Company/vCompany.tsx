import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable, Column } from "../../../assets/css/prime-library";
import {
  Button,
  InputText,
  FilterMatchMode,
} from "../../../assets/css/prime-library";

import { useHistory } from "react-router-dom";
import BasicDemo from "../../../alert/alert";
import { getCompanyListFromServer, deleteCompanyListFromServer } from "redux/slices/master/companySlice";
import { openEditOrCreateList } from "redux/slices/master/countrySlice";

const VCompanyMaster = () => {
  const dispatch: any = useDispatch();
  const history = useHistory();
  const { companyList } = useSelector((state: any) => state.company);
  const { companyDeletedList } = useSelector((state: any) => state.company);
  const { companyUpdateList } = useSelector((state: any) => state.company);
  const [companies, setCompanies] = useState<any[]>([]);
  const [rowData, setRowData] = useState(null);
  useEffect(() => {
    const data = {
      CompanyId: 0,
      Taskname: "SearchInitialize",
    };
    dispatch(getCompanyListFromServer(data));
  }, []);

  useEffect(() => {
    setCompanies(companyList);
  }, [companyList]);

  useEffect(() => {
    if (companyDeletedList != null) {
      const data = {
        CompanyId: 0,
        Taskname: "SearchInitialize",
      };
      dispatch(getCompanyListFromServer(data));
      setRowData(companyDeletedList);
    }
  }, [companyDeletedList]);
  useEffect(() => {
    if (companyUpdateList != null) {
      setRowData(companyUpdateList);
    }
  }, [companyUpdateList]);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        <Button
          label=""
          title="View"
          icon="pi pi-eye"
          className="mr-2"
          onClick={() => {
            dispatch(openEditOrCreateList({ data: rowData, view: true }));
            history.push("/cCompany");
          }}
        />
        <Button
          label=""
          title="Edit"
          icon="pi pi-pencil"
          className="mr-2"
          onClick={() => {
            dispatch(openEditOrCreateList({ data: rowData, view: false }));
            history.push("/cCompany");
          }}
        />

        <Button
          label=""
          severity="danger"
          icon="pi pi-trash"
          title="Clear"
          className="text-center"
          onClick={() => {
            const data = {
              CompanyId: rowData.CompanyId,
            };
            dispatch(deleteCompanyListFromServer(data));
          }}
        />
      </>
    );
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const renderHeader = () => {
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
  const header = renderHeader();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  return (
    <div className="page-container">
      <div className="inner-page-container">
        <div className="page-title">
          <div className="grid grid-nogutter">
            <div className="md:col-6">
              <h1>Company Master</h1>
            </div>
            <div className="md:col-6 text-right">
              <div className="action-btn">
                {/* <a
                  href="/cStateMaster"
                  title="Create New"
                  className="p-button p-button-success text-center"
                >
                  <i className="pi pi-plus"></i>
                </a> */}
                <Button
                  label=""
                  icon="pi pi-plus"
                  title="Add"
                  className="p-button p-button-success text-center"
                  onClick={() => {
                    dispatch(openEditOrCreateList({ data: null, view: false }));
                    history.push("/cCompany");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form-container scroll-y">
          <div className="white">
            <div className="widget-body">
              <div className="card">
                <DataTable
                  value={companies}
                  showGridlines
                  paginator
                  filters={filters}
                  filterDisplay="menu"
                  globalFilterFields={[
                    "CompanyName",
                    "CompanyCode",
                    "StatusName",
                    "CreatedBy",
                  ]}
                  header={header}
                  emptyMessage="No Data found."
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: "50rem" }}
                >
                  <Column header="Action" body={actionBodyTemplate}></Column>
                  <Column
                    sortable
                    field="CompanyCode"
                    header="Company Code"
                  ></Column>
                  <Column
                    sortable
                    field="CompanyName"
                    header="Company Name"
                  ></Column>
                  <Column
                    sortable
                    field="StatusName"
                    header="StatusName"
                  ></Column>
                  {/* <Column sortable field="createdBy" header="Created By"></Column> */}
                </DataTable>
              </div>
              {rowData != null && <BasicDemo sample={rowData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCompanyMaster;
