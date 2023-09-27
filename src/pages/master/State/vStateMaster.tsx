import React, { useState, useEffect } from "react";
import { DataTable, Column } from "../../../assets/css/prime-library";
// import { ProductService } from "./../../../service/ProductService";
import {Button, InputText, FilterMatchMode } from "../../../assets/css/prime-library";
import {useDispatch ,useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import { openEditOrCreateList } from "redux/slices/master/citySlice";
import { getStateListFromServer, deleteStateListFromServer } from "redux/slices/master/stateSlice";
// import BasicDemo from "../../../alert/alert"

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

const VStateMaster = () => {
  const dispatch: any = useDispatch()
  const history = useHistory();
  const {stateList} = useSelector((state :any) => state.state)
  const {stateDeletedList} = useSelector((state :any) => state.state)
  const {stateUpdateList} = useSelector((state :any) => state.state)
  const [products, setProducts] = useState<Product[]>([]);
  const [rowData, setRowData] = useState(null);
  useEffect(() => {
      setProducts(stateList)  
  }, [stateList]);
  useEffect(() => {
    if(stateDeletedList!=null){
      const data ={
        Stateid:0
      }
      dispatch(getStateListFromServer(data))
      setRowData(stateDeletedList)
    }
  
}, [stateDeletedList]);
useEffect(() => {
  if(stateUpdateList!=null){
    setRowData(stateUpdateList)
  }
  

}, [stateUpdateList]);

  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
    const data ={
      Stateid:0
    }
    dispatch(getStateListFromServer(data))
  }, []);
  const actionBodyTemplate = (rowData:any) => {
    return (
           <>
              <Button
                label=""
                title="View"
                icon="pi pi-eye"
                className="mr-2"
                onClick={() => {
                  dispatch(openEditOrCreateList({data:rowData,view:true}))
                  history.push('/cStateMaster')}}
              />
              <Button
                label=""
                title="Edit"
                icon="pi pi-pencil"
                className="mr-2"
                onClick={() => {
                  dispatch(openEditOrCreateList({data:rowData,view:false}))
                  history.push('/cStateMaster')}}
              />
      
              <Button
                label=""
                severity="danger"
                icon="pi pi-trash"
                title="Clear"
                className="text-center"
                onClick={() => {
                  const data ={
                    Stateid:rowData.StateId
                  }
                  dispatch(deleteStateListFromServer(data))
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
              <h1>State Master</h1>
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
              onClick={ ()=>{
                dispatch(openEditOrCreateList({data:null,view:false}))
                history.push('/cStateMaster')
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
                  globalFilterFields={["CountryName", "StateName", "StateCode", "Status","CreatedBy"]}
                  header={header}
                  emptyMessage="No Data found."
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: "50rem" }}
                >
                  <Column header="Action" body={actionBodyTemplate}></Column>
                  <Column sortable field="CountryName" header="Country Name"></Column> 
                  <Column sortable field="StateCode" header="Province Code"></Column>
                  <Column sortable field="StateName" header="Province Name"></Column>
                  <Column sortable field="Status" header="Status"></Column>
                  {/* <Column sortable field="CreatedBy" header="Created By"></Column> */}
                </DataTable>
              </div>
              {rowData!=null&&
              null
              // <BasicDemo  sample={rowData}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VStateMaster;
