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
  getCountryListFromServer,
  openEditOrCreateList,
  initialCountryValue,
  deleteCountryListFromServer,
} from "redux/slices/master/countrySlice";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

const VCountryMaster = () => {
  const dispatch: any = useDispatch();
  const history = useHistory();
  const { countryList } = useSelector((state: any) => state.country);
  const { stateDeletedList } = useSelector((state: any) => state.country);
  const { countryUpdateList } = useSelector((state: any) => state.country);
  const [products, setProducts] = useState<Product[]>([]);
  const [rowData, setRowData] = useState(null);
  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
    const data = {
      Countryid: 0,
      Taskname: "SEARCHINITIALIZE",
    };
    dispatch(getCountryListFromServer(data));
  }, []);
  useEffect(() => {
    setProducts(countryList);
  }, [countryList]);
  useEffect(() => {
    if (stateDeletedList != null) {
      const data = {
        Countryid: 0,
        Taskname: "SEARCHINITIALIZE",
      };
      dispatch(getCountryListFromServer(data));
      setRowData(stateDeletedList);
    }
  }, [stateDeletedList]);
  useEffect(() => {
    if (countryUpdateList != null) {
      setRowData(countryUpdateList);
    }
  }, [countryUpdateList]);

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
            history.push("/home/cCountry");
          }}
        />
        <Button
          label=""
          title="Edit"
          icon="pi pi-pencil"
          className="mr-2"
          onClick={() => {
            const data = {
              Countryid: rowData.CountryId,
              Taskname: "CREATEINITIALIZE",
            };
            dispatch(initialCountryValue(data));
            dispatch(openEditOrCreateList({ data: rowData, view: false }));
            history.push("/home/cCountry");
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
              Stateid: rowData.StateId,
            };
            dispatch(deleteCountryListFromServer(data));
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
              <h1>Country Master</h1>
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
                    history.push("/home/cCountry");
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
                    "CountryShortForm",
                    "CountryCode",
                    "Nationality",
                    "Status",
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
                    field="CountryCode"
                    header="Country Code"
                  ></Column>
                  <Column
                    sortable
                    field="CountryName"
                    header="Country Name"
                  ></Column>
                  <Column
                    sortable
                    field="CountryShortForm"
                    header="country ShortForm"
                  ></Column>
                  <Column
                    sortable
                    field="Nationality"
                    header="Nationality"
                  ></Column>
                  <Column sortable field="Status" header="Status"></Column>
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

export default VCountryMaster;
