import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  addCompanyListFromServer,
  initialCompanyValue,
  updateCompanyListFromServer,
} from "redux/slices/master/companySlice";
import { CompanyValidationSchema } from "validations/Master";

const CCompany = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (editOrCreateList != null) {
      const data = {
        CompanyId: editOrCreateList.CompanyId,
        Taskname: "CreateInitialize",
      };
      dispatch(initialCompanyValue(data));
    } else {
      const data = {
        CompanyId: 0,
        Taskname: "CreateInitialize",
      };
      dispatch(initialCompanyValue(data));
    }
  }, []);

  const currentDate = new Date();
  const { createTranstatus } = useSelector((state: any) => state.company);
  const { companyList } = useSelector((state: any) => state.company);
  const { statusList } = useSelector((state: any) => state.company);
  const { editOrCreateList } = useSelector((state: any) => state.company);
  const { viewList } = useSelector((state: any) => state.company);

  const initialValues = {
    CompanyName: editOrCreateList != null ? editOrCreateList.CompanyName : "",
    Status:
      editOrCreateList != null
        ? editOrCreateList.Status == "Active"
          ? 1
          : 2
        : 1,
    CompanyCode: editOrCreateList != null ? editOrCreateList.CompanyCode : "",
  };
  const onSubmit = (values: any, { resetForm }: any) => {
    console.log("assd");

    // Handle form submission here
    console.log(values);
    console.log(editOrCreateList);

    const addedValue = {
      Company: {
        CompanyId: editOrCreateList != null ? editOrCreateList.CompanyId : 0,
        companyname: values.CompanyName,
        companycode:
          editOrCreateList != null ? editOrCreateList.CompanyCode : "",
        status: values.Status,
        createdby: 1,
        createdon: currentDate,
        modifiedby: 1,
        modifiedon: currentDate,
      },
    };
    if (editOrCreateList != null) {
      dispatch(updateCompanyListFromServer(addedValue));
      navigateTo("/vCompany");
    } else {
      dispatch(addCompanyListFromServer(addedValue));
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
      validationSchema={CompanyValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="page-container">
            <div className="inner-page-container">
              <div className="page-title">
                <div className="grid grid-nogutter">
                  <div className="md:col-6">
                    <h1>Company Master</h1>
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
                          navigateTo("/vCompany");
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
                              <label className="form-label">Company Code</label>
                              <Field
                                as={InputText}
                                disabled
                                className="w-full"
                                id="CompanyCode"
                                name="CompanyCode"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Company Name<span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={InputText}
                                disabled={viewList}
                                className="w-full"
                                id="CompanyName"
                                name="CompanyName"
                                onKeyPress={handleKeyPress}
                                onPaste={handlePaste}
                              />
                              <ErrorMessage
                                name="CompanyName"
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

export default CCompany;
