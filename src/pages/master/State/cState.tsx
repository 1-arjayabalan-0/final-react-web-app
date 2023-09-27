import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";

import AppTable from "components/AppTable";
import PageHeader from "components/PageHeader";
import {
  createInit,
  createStates,
  fetchStates,
  updateStates,
} from "redux/slices/master/state/stateSlice";
import FormFields from "components/FormFields";
import { Formik, useFormik } from "formik";
import { StateValidationSchema } from "validations/Master";
import { Dropdown, Toast } from "assets/css/prime-library";

const CState = () => {
  const route = useHistory();
  const dispatch: any = useDispatch();

  const toast = useRef<Toast>(null);

  useEffect(() => {
    console.log(createOrEditState);
    if (createOrEditState.createEditData != null) {
      if (createOrEditState.isCreate == false) {
        const data = {
          Stateid: createOrEditState.createEditData.StateId,
          Taskname: "CreateInitialize",
        };
        dispatch(createInit(data));
        console.log("asdasd");
      }
    } else {
      const data = {
        Stateid: 0,
        Taskname: "CreateInitialize",
      };
      dispatch(createInit(data));
      console.log("aretert");
    }
  }, []);

  const allStates = useSelector((state: any) => state.states.states);
  const createOrEditState = useSelector((state: any) => state.states);
  const loading = useSelector((state: any) => state.states.loading);
  const error = useSelector((state: any) => state.states.error);
  const countryList = useSelector((state: any) => state.states.CountryList);
  const statusList = useSelector((state: any) => state.states.StatusList);

  const formik: any = useFormik({
    initialValues: {
      CountryName:
        createOrEditState.createEditData != null
          ? createOrEditState.createEditData.CountryId
          : "",
      StateName:
        createOrEditState.createEditData != null
          ? createOrEditState.createEditData.StateName
          : "",
      Status:
        createOrEditState.createEditData != null
          ? createOrEditState.createEditData.Status == "Active"
            ? 1
            : 2
          : 1,
    },
    validationSchema: StateValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      let StateFormValue = {
        State: {
          countryid: values.CountryName,
          statename: values.StateName,
          statecode:
            createOrEditState.createEditData != null
              ? createOrEditState.createEditData.StateCode
              : "",
          status: values.Status,
          createdby: 1,
          createdon: new Date(),
          modifiedby: 1,
          modifiedon: new Date(),
          Stateid:
            createOrEditState.createEditData != null
              ? createOrEditState.createEditData.StateId
              : 0,
        },
      };

      if (createOrEditState.createEditData != null) {
        if (createOrEditState.createEditData.isCreate != false) {
          dispatch(updateStates(StateFormValue));
          if (createOrEditState.stateUpdateList.result == true) {
            toast.current?.show({
              severity: "success",
              summary:
                createOrEditState.stateUpdateList.lstErrorItem[0].Message,
              detail: "",
            });
            route("/home/vState");
          }
        }
      } else {
        dispatch(createStates(StateFormValue));
        if (createOrEditState.createTranstatus.result == true) {
          toast.current?.show({
            severity: "success",
            summary: createOrEditState.createTranstatus.lstErrorItem[0].Message,
            detail: "",
          });
        }
      }

      resetForm();
    },
  });

  useEffect(() => {
    console.log(createOrEditState);

    console.log(statusList);
  });

  const handleSelect = (name, other, value) => {
    console.log(name, value);

    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        onSubmit={formik.handleSubmit}
      >
        <div className="page-container">
          <div className="inner-page-container">
            <div className="page-title">
              <div className="grid grid-nogutter">
                <div className="md:col-6">
                  <h1>State</h1>
                </div>
                <div className="md:col-6 text-right">
                  <div className="action-btn">
                    <>
                      <Button
                        label=""
                        title="Save"
                        icon="pi pi-save"
                        className="text-center"
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                      />
                      <Button
                        label=""
                        severity="danger"
                        icon="pi pi-trash"
                        title="Clear"
                        className="text-center"
                      />
                    </>
                    <Button
                      label=""
                      icon="pi pi-search"
                      title="Add"
                      className="p-button p-button-success text-center"
                      onClick={() => {
                        route.push("/home/vState");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-container scroll-y">
              <form>
                <div className="white">
                  <div className="widget-body">
                    <div className="normal-table">
                      <div className="grid">
                        {!loading ? (
                          <>
                            <FormFields
                              type={"select"}
                              name={"CountryName"}
                              label={"Country Name"}
                              options={countryList}
                              show={true}
                              required={true}
                              disable={false}
                              optionLabel={"CountryName"}
                              optionValue={"CountryId"}
                              handleSelect={handleSelect}
                              formik={formik}
                            />
                            <FormFields
                              type={"text"}
                              name={"StateCode"}
                              label={"State Code"}
                              options={""}
                              show={false}
                              required={true}
                              disable={true}
                              optionLabel={""}
                              optionValue={""}
                              handleSelect={""}
                              formik={formik}
                            />
                            <FormFields
                              type={"text"}
                              name={"StateName"}
                              label={"State Name"}
                              show={true}
                              required={true}
                              disable={false}
                              optionLabel={""}
                              optionValue={""}
                              handleSelect={""}
                              formik={formik}
                            />
                            <FormFields
                              type={"select"}
                              name={"Status"}
                              label={"Status"}
                              options={statusList}
                              show={true}
                              required={true}
                              disable={false}
                              optionLabel={"MetaSubDescription"}
                              optionValue={"MetaSubId"}
                              handleSelect={handleSelect}
                              formik={formik}
                            />
                          </>
                        ) : (
                          "loading"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Formik>
      <Toast ref={toast} />
    </>
  );
};

export default CState;
