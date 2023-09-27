import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  InputText,
  InputTextarea,
  Dropdown,
  RadioButton,
  Calendar,
} from "../../../assets/css/prime-library";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import BasicDemo from "../../../alert/alert";
import {
  initialCountryValue,
  updateCountryListFromServer,
  addCountryListFromServer,
} from "redux/slices/master/countrySlice";
import {
  CompanyValidationSchema,
  CountryValidationSchema,
} from "validations/Master";

const CCountryMaster = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (editOrCreateList == null) {
      const data = {
        Countryid: 0,
        Taskname: "CREATEINITIALIZE",
      };
      dispatch(initialCountryValue(data));
    }
  }, []);
  // const {HdrTable} = useSelector((state :any) => state.state)
  const { createTranstatus } = useSelector((state: any) => state.country);
  const { countryList } = useSelector((state: any) => state.country);
  const { statusList } = useSelector((state: any) => state.country);
  const { editOrCreateList } = useSelector((state: any) => state.country);
  const { viewList } = useSelector((state: any) => state.country);

  const initialValues = {
    CountryName: editOrCreateList != null ? editOrCreateList.CountryName : "",
    Nationality: editOrCreateList != null ? editOrCreateList.Nationality : "",
    Status: editOrCreateList != null ? editOrCreateList.Status : 1,
    CountryCode: editOrCreateList != null ? editOrCreateList.CountryCode : "",
    CountryShortform:
      editOrCreateList != null ? editOrCreateList.CountryShortForm : "",
  };
  const onSubmit = (values: any, { resetForm }: any) => {
    // Handle form submission here
    console.log(values);
    const addedValue = {
      CountryMaster: {
        CountryId: editOrCreateList != null ? editOrCreateList.CountryId : 0,
        CountryName: values.CountryName,
        CountryCode:
          editOrCreateList != null ? editOrCreateList.CountryCode : "",
        CountryShortForm: values.CountryShortform,
        Nationality: values.Nationality,
        Status: values.Status,
        CreatedBy: 1,
        CreatedOn: "2023-09-05T14:44:04.107",
        ModifiedBy: 1,
        ModifiedOn: "2023-09-05T14:44:04.107",
      },
    };
    if (editOrCreateList != null) {
      dispatch(updateCountryListFromServer(addedValue));
      navigateTo("/home/vCountry");
    } else {
      dispatch(addCountryListFromServer(addedValue));
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
      validationSchema={CountryValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="page-container">
            <div className="inner-page-container">
              <div className="page-title">
                <div className="grid grid-nogutter">
                  <div className="md:col-6">
                    <h1>Country Master</h1>
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
                          navigateTo("/home/vCountry");
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
                              <label className="form-label">Country Code</label>
                              <Field
                                as={InputText}
                                disabled
                                className="w-full"
                                id="CountryCode"
                                name="CountryCode"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Country Name<span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={InputText}
                                disabled={viewList}
                                className="w-full"
                                id="CountryName"
                                name="CountryName"
                                onKeyPress={handleKeyPress}
                                onPaste={handlePaste}
                              />
                              <ErrorMessage
                                name="CountryName"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Country Shortform
                                <span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={InputText}
                                disabled={viewList}
                                className="w-full"
                                id="CountryShortform"
                                name="CountryShortform"
                                onKeyPress={handleKeyPressAlpha}
                                onPaste={handlePasteAlpha}
                              />
                              <ErrorMessage
                                name="CountryShortform"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Nationality<span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={InputText}
                                disabled={viewList}
                                className="w-full"
                                id="Nationality"
                                name="Nationality"
                                onKeyPress={handleKeyPress}
                                onPaste={handlePaste}
                              />
                              <ErrorMessage
                                name="Nationality"
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

export default CCountryMaster;
