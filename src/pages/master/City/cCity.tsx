import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import BasicDemo from "../../../alert/alert";
import {
  initialCityValue,
  updateCityListFromServer,
  addCityListFromServer,
} from "redux/slices/master/citySlice";
import { CityValidationSchema } from "validations/Master";
import { Button, Dropdown, InputText } from "assets/css/prime-library";

const CCityMaster = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (editOrCreateList != null) {
      const data = {
        Cityid: 0,
        Taskname: "CREATEINITIALIZE",
      };
      dispatch(initialCityValue(data));
    }
  }, []);

  const { HdrTable } = useSelector((state: any) => state.city);
  const { createTranstatus } = useSelector((state: any) => state.city);
  const { countryList } = useSelector((state: any) => state.city);
  const { stateList } = useSelector((state: any) => state.city);
  const { statusList } = useSelector((state: any) => state.city);
  const { editOrCreateList } = useSelector((state: any) => state.city);
  const { viewList } = useSelector((state: any) => state.city);

  const initialValues = {
    Countryname: HdrTable != null ? HdrTable.CountryId : "",
    StateName: HdrTable != null ? HdrTable.StateId : "",
    Citycode: HdrTable != null ? HdrTable.CityCode : "",
    CityName: HdrTable != null ? HdrTable.CityName : "",
    Status: HdrTable != null ? HdrTable.Status : 1,
  };
  const onSubmit = (values: any, { resetForm }: any) => {
    // Handle form submission here
    console.log(values);
    const addedValue = {
      CityMaster: {
        CityId: editOrCreateList != null ? editOrCreateList.Cityid : 0,
        CountryId: values.Countryname,
        StateId: values.StateName,
        CityName: values.CityName,
        CityCode: editOrCreateList != null ? editOrCreateList.Citycode : "",
        CompanyId: 1,
        PlantId: 1,
        Status: values.Status,
        CreatedBy: 1,
        CreatedOn: "2023-09-05T14:44:04.107",
        ModifiedBy: 1,
        ModifiedOn: "2023-09-05T14:44:04.107",
      },
    };
    if (editOrCreateList != null) {
      dispatch(updateCityListFromServer(addedValue));
      navigateTo("/vCityMaster");
    } else {
      dispatch(addCityListFromServer(addedValue));
    }

    resetForm();
  };
  const history = useHistory();
  function navigateTo(url: string) {
    history.push(url);
  }
  const handleClearClick = (formik: any) => {
    formik.resetForm();
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isValidChar = /^[a-zA-Z0-9]*$/.test(e.key);
    if (!isValidChar) {
      e.preventDefault();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    if (!/^[a-zA-Z0-9]*$/.test(pastedText)) {
      e.preventDefault();
    }
  };
  const handleKeyPressAlpha = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isValidChar = /^[a-zA-Z]*$/.test(e.key);
    if (!isValidChar) {
      e.preventDefault();
    }
  };
  const handlePasteAlpha = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    if (!/^[a-zA-Z]*$/.test(pastedText)) {
      e.preventDefault();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CityValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="page-container">
            <div className="inner-page-container">
              <div className="page-title">
                <div className="grid grid-nogutter">
                  <div className="md:col-6">
                    <h1>City Master</h1>
                  </div>
                  <div className="md:col-6 text-right">
                    <div className="action-btn">
                      <Button
                        disabled={viewList}
                        label=""
                        title="Save"
                        icon="pi pi-eye"
                        className="text-center"
                        type="submit"
                      />
                      <Button
                        disabled={viewList}
                        label=""
                        severity="danger"
                        icon="pi pi-trash"
                        title="Clear"
                        className="text-center"
                        onClick={() => handleClearClick(formik)}
                      />
                      <a
                        title="Back to View"
                        className="p-button p-button-success text-center"
                        onClick={() => {
                          navigateTo("/vCityMaster");
                        }}
                      >
                        <i className="pi pi-search"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-container scroll-y">
                <div className="white">
                  {/* <div className="widget-hdr">
                            <div className="sub-title">
                                <div className="grid">
                                    <div className="md:col-6">
                                        <h2>Personal Information</h2>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                  <div className="widget-body">
                    <div className="normal-table">
                      <div className="grid">
                        <div className="col-12 md:col-11">
                          <div className="grid">
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Country Name <span className="hlt-txt">*</span>
                              </label>
                              {/* <Field as={Dropdown} options={countryOption} optionLabel="Countryname" placeholder="Select" className="w-full" id="Countryname" name="Countryname"  onChange={(e: any) => {formik.setFieldValue('Countryname',e.value);}}/>onChange={(e :any)=>{setselectedCountry(e.value)}} */}
                              <Field
                                as={Dropdown}
                                value={formik.values.Countryname}
                                options={countryList}
                                optionLabel="CountryName"
                                optionValue="CountryId"
                                placeholder="Select"
                                className="w-full"
                                id="Countryname"
                                name="Countryname"
                                disabled={viewList}
                                onBlur={formik.handleBlur}
                                onChange={(e: any) => {
                                  formik.setFieldValue("Countryname", e.value);
                                }}
                              />
                              <ErrorMessage
                                name="Countryname"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                State Name <span className="hlt-txt">*</span>
                              </label>
                              {/* <Field as={Dropdown} options={countryOption} optionLabel="Countryname" placeholder="Select" className="w-full" id="Countryname" name="Countryname"  onChange={(e: any) => {formik.setFieldValue('Countryname',e.value);}}/>onChange={(e :any)=>{setselectedCountry(e.value)}} */}
                              <Field
                                as={Dropdown}
                                value={formik.values.StateName}
                                options={stateList}
                                optionLabel="StateName"
                                optionValue="StateId"
                                placeholder="Select"
                                className="w-full"
                                id="StateName"
                                name="StateName"
                                disabled={viewList}
                                onBlur={formik.handleBlur}
                                onChange={(e: any) => {
                                  formik.setFieldValue("StateName", e.value);
                                }}
                              />
                              <ErrorMessage
                                name="StateName"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">City code</label>
                              <Field
                                as={InputText}
                                disabled
                                className="w-full"
                                id="Citycode"
                                name="Citycode"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                City Name <span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={InputText}
                                disabled={viewList}
                                className="w-full"
                                id="CityName"
                                name="CityName"
                                onKeyPress={handleKeyPress}
                                onPaste={handlePaste}
                              />
                              <ErrorMessage
                                name="CityName"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Status <span className="hlt-txt">*</span>
                              </label>
                              {/* <Field as={Dropdown} options={statusOption} optionLabel="Metadatasubdescription" placeholder="Select" className="w-full" id="Status" name="Status" onChange={(e: any) => {formik.setFieldValue('Status', e.value);}}/> */}
                              <Field
                                as={Dropdown}
                                value={formik.values.Status}
                                options={statusList}
                                optionLabel="MetaSubDescription"
                                optionValue="MetaSubId"
                                placeholder="Select"
                                className="w-full"
                                id="Status"
                                name="Status"
                                disabled={
                                  editOrCreateList != null && !viewList
                                    ? false
                                    : true
                                }
                                onBlur={formik.handleBlur}
                                onChange={(e: any) => {
                                  formik.setFieldValue("Status", e.value);
                                }}
                              />
                              <ErrorMessage
                                name="Status"
                                component="div"
                                className="error"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {createTranstatus != null && (
                    <BasicDemo sample={createTranstatus} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CCityMaster;
