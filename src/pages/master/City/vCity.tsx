import React, { useState, useEffect } from "react";
import { DataTable, Column } from "../../../assets/css/prime-library";
// import { ProductService } from "./../../../service/ProductService";
import {
  Button,
  InputText,
  FilterMatchMode,
} from "../../../assets/css/prime-library";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BasicDemo from "../../../alert/alert";
import {
  getCityListFromServer,
  initialCityValue,
  deleteCityListFromServer,
} from "redux/slices/master/citySlice";
import { openEditOrCreateList } from "redux/slices/master/numberingShemaSlice";

const VCityMaster = () => {
  const dispatch: any = useDispatch();
  const history = useHistory();
  const { CityList } = useSelector((state: any) => state.city);
  const { stateList } = useSelector((state: any) => state.city);
  const { stateDeletedList } = useSelector((state: any) => state.city);
  const { stateUpdateList } = useSelector((state: any) => state.city);
  const { HdrTable } = useSelector((state: any) => state.city);
  const [products, setProducts] = useState<any[]>([]);
  const [rowData, setRowData] = useState(null);
  useEffect(() => {
    if (HdrTable != null) history.push("/cCityMaster");
  }, [HdrTable]);
  useEffect(() => {
    setProducts(CityList);
  }, [CityList]);
  useEffect(() => {
    if (stateDeletedList != null) {
      const data = {
        Cityid: 0,
        Taskname: "SEARCHINITIALIZE",
      };
      dispatch(getCityListFromServer(data));
      setRowData(stateDeletedList);
    }
  }, [stateDeletedList]);
  useEffect(() => {
    if (stateUpdateList != null) {
      setRowData(stateUpdateList);
    }
  }, [stateUpdateList]);

  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
    const data = {
      Cityid: 0,
      Taskname: "SEARCHINITIALIZE",
    };
    dispatch(getCityListFromServer(data));
  }, []);
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
            const data = {
              Cityid: rowData.CityId,
              Taskname: "CREATEINITIALIZE",
            };
            dispatch(initialCityValue(data));
          }}
        />
        <Button
          label=""
          title="Edit"
          icon="pi pi-pencil"
          className="mr-2"
          onClick={() => {
            dispatch(openEditOrCreateList({ data: rowData, view: false }));
            const data = {
              Cityid: rowData.CityId,
              Taskname: "CREATEINITIALIZE",
            };
            dispatch(initialCityValue(data));
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
              Cityid: rowData.Cityid,
            };
            dispatch(deleteCityListFromServer(data));
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
              <h1>City Master</h1>
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
                    history.push("/cCityMaster");
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
                  value={products}
                  showGridlines
                  paginator
                  filters={filters}
                  filterDisplay="menu"
                  globalFilterFields={[
                    "CountryName",
                    "StateName",
                    "CityCode",
                    "CityName",
                    "StatusName",
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
                    field="CountryName"
                    header="Country Name"
                  ></Column>
                  <Column
                    sortable
                    field="StateName"
                    header="Province Name"
                  ></Column>
                  <Column sortable field="CityCode" header="City Code"></Column>
                  <Column sortable field="CityName" header="City Name"></Column>
                  <Column sortable field="StatusName" header="Status"></Column>
                  {/* <Column sortable field="CreatedBy" header="Created By"></Column> */}
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

export default VCityMaster;
