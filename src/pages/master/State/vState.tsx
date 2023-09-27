import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";

import AppTable from "components/AppTable";
import PageHeader from "components/PageHeader";
import {
  createOrEdit,
  deleteStates,
  fetchStates,
} from "redux/slices/master/state/stateSlice";

const VState = () => {
  const [states, setStates] = useState(null);
  const route = useHistory();

  const dispatch: any = useDispatch();
  const allStates = useSelector((state: any) => state.states.StateList);
  const loading = useSelector((state: any) => state.states.loading);

  // Fetch Data from REDUX API CALL
  useEffect(() => {
    const state = {
      Stateid: 0,
    };
    dispatch(fetchStates(state));
  }, [dispatch]);

  // Assign Data  to STATE
  useEffect(() => {
    console.log(allStates);

    // setStates(allStates.StateList);
  }, [allStates]);

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [pageConfig, setPageConfig] = useState({
    pageTitle: "State",
    pageHeader: {
      pageActions: [
        {
          create: true,
          clear: false,
          save: false,
          createQuery: "/home/cState",
        },
      ],
    },
    tableCheckSelection: false,
    tableAction: true,
    tableActionStyle: {
      textAlign: "center",
    },
    tableRows: 10,
    tableRowsOptions: [5, 10, 25],
    tablePagination: true,
    tableActions: [
      {
        title: "Edit",
        name: "edit",
      },
      {
        title: "Delete",
        name: "delete",
      },
    ],
    tableColumns: [
      {
        title: "State Name",
        name: "StateName",
        sort: true,
        avatar: false,
        badge: false,
        colStyle: { minWidth: "16rem" },
      },
      {
        title: "State Code",
        name: "StateCode",
        sort: true,
        avatar: false,
        badge: false,
        colStyle: { minWidth: "10rem" },
      },
      {
        title: "Country",
        name: "CountryName",
        sort: true,
        avatar: false,
        badge: false,
        colStyle: {},
      },
      {
        title: "Created By",
        name: "CreatedBy",
        sort: true,
        avatar: true,
        badge: false,
        colStyle: { minWidth: "6rem" },
      },

      {
        title: "Status",
        name: "Status",
        sort: true,
        avatar: false,
        badge: true,
        colStyle: { minWidth: "2rem" },
      },
    ],
  });

  const handleActions = {
    edit: (rowData) => {
      route.push(`/home/cState`);
      console.log(rowData);
      dispatch(createOrEdit(rowData));
    },
    delete: (rowData) => {
      let StateFormData = {
        Stateid: rowData.StateId,
      };
      dispatch(deleteStates(StateFormData));
    },
  };

  return (
    <>
      <div className="page-container">
        <div className="inner-page-container">
          <PageHeader
            pageTitle={pageConfig.pageTitle}
            pageConfig={pageConfig}
          />
          <div className="form-container scroll-y">
            <div className="white">
              <div className="widget-body">
                <div className="card">
                  <AppTable
                    handleActions={handleActions}
                    data={allStates}
                    loading={loading}
                    pageConfig={pageConfig}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VState;
