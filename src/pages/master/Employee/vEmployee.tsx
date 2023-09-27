import React, { useState, useEffect } from "react";
import { DataTable, Column } from "../../../assets/css/prime-library";
// import { ProductService } from "./../../../service/ProductService";
import { InputText, FilterMatchMode } from "../../../assets/css/prime-library";

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

const VEmployeeMaster = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
  }, []);
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
              <h1>Employee Master</h1>
            </div>
            <div className="md:col-6 text-right">
              <div className="action-btn">
                <a
                  href="/cEmployeeMaster"
                  title="Create New"
                  className="p-button p-button-success text-center"
                >
                  <i className="pi pi-plus"></i>
                </a>
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
                  globalFilterFields={["code", "name", "category", "quantity"]}
                  header={header}
                  emptyMessage="No Data found."
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: "50rem" }}
                >
                  <Column field="code" header="Code"></Column>
                  <Column sortable field="name" header="Name"></Column>
                  <Column sortable field="category" header="Category"></Column>
                  <Column sortable field="quantity" header="Quantity"></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VEmployeeMaster;
