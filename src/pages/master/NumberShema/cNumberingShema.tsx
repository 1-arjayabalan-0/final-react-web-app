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
  addStateListFromServer,
  initialNumberValue,
  updateStateListFromServer,
} from "redux/slices/master/numberingShemaSlice";
import { NumberingSchemaValidationSchema } from "validations/Master";

const CnumberingShema = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (editOrCreateList == null) {
      const data = {
        NumberSchemaId: 0,
      };
      dispatch(initialNumberValue(data));
    }
  }, []);
  const currentDate = new Date();
  const { NumberingSchemaUpdatedList } = useSelector(
    (state: any) => state.numberingShema
  );
  const { createTranstatus } = useSelector(
    (state: any) => state.numberingShema
  );
  const { DocumentList } = useSelector((state: any) => state.numberingShema);
  const { SymbolList } = useSelector((state: any) => state.numberingShema);
  const { DateFormatList } = useSelector((state: any) => state.numberingShema);
  const { StatusList } = useSelector((state: any) => state.numberingShema);
  const { editOrCreateList } = useSelector(
    (state: any) => state.numberingShema
  );
  const { viewList } = useSelector((state: any) => state.numberingShema);
  const initialValues = {
    Document:
      NumberingSchemaUpdatedList != null && editOrCreateList != null
        ? NumberingSchemaUpdatedList.DocumentId
        : "",
    EnterPrefix:
      NumberingSchemaUpdatedList != null && editOrCreateList != null
        ? NumberingSchemaUpdatedList.Prefix
        : "",
    SymbolFields:
      NumberingSchemaUpdatedList != null && editOrCreateList != null
        ? NumberingSchemaUpdatedList.SymbolId
        : "",
    // DateFormat:NumberingSchemaUpdatedList!=null?NumberingSchemaUpdatedList.StateName:'',
    Entersuffix:
      NumberingSchemaUpdatedList != null && editOrCreateList != null
        ? NumberingSchemaUpdatedList.Suffix
        : "",
    Status:
      NumberingSchemaUpdatedList != null && editOrCreateList != null
        ? NumberingSchemaUpdatedList.Status
        : 1,
  };
  const onSubmit = (values: any, { resetForm }: any) => {
    // Handle form submission here
    console.log(values);
    const addedValue = {
      NumberingSchema: {
        NumberingSchemaId:
          NumberingSchemaUpdatedList != null && editOrCreateList != null
            ? NumberingSchemaUpdatedList.NumberingSchemaId
            : 0,
        PlantId: 1,
        DocumentId: values.Document,
        Prefix: values.EnterPrefix,
        SymbolId: values.SymbolFields,
        Suffix: values.Entersuffix,
        Createdby: 1,
        Createdon: currentDate,
        Modifiedby: 2,
        Modifiedon: currentDate,
        Status: values.Status,
        DateFormat: values.DateFormat,
      },
    };
    if (editOrCreateList != null) {
      dispatch(updateStateListFromServer(addedValue));
      navigateTo("/vNumberingShema");
    } else {
      dispatch(addStateListFromServer(addedValue));
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
      validationSchema={NumberingSchemaValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="page-container">
            <div className="inner-page-container">
              <div className="page-title">
                <div className="grid grid-nogutter">
                  <div className="md:col-6">
                    <h1>numbering Shema</h1>
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
                          navigateTo("/vNumberingShema");
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
                                Document <span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={Dropdown}
                                value={formik.values.Document}
                                options={DocumentList}
                                optionLabel="FunctionName"
                                optionValue="FunctionId"
                                placeholder="Select"
                                className="w-full"
                                id="Document"
                                name="Document"
                                disabled={
                                  editOrCreateList == null && !viewList
                                    ? false
                                    : true
                                }
                                onBlur={formik.handleBlur}
                                onChange={(e: any) => {
                                  formik.setFieldValue("Document", e.value);
                                }}
                              />
                              <ErrorMessage
                                name="Document"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Enter Prefix<span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={InputText}
                                disabled={viewList}
                                className="w-full"
                                id="EnterPrefix"
                                name="EnterPrefix"
                                onKeyPress={handleKeyPress}
                                onPaste={handlePaste}
                              />
                              <ErrorMessage
                                name="EnterPrefix"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Symbol Fields<span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={Dropdown}
                                value={formik.values.SymbolFields}
                                options={SymbolList}
                                optionLabel="MetaSubDescription"
                                optionValue="MetaSubId"
                                placeholder="Select"
                                className="w-full"
                                id="SymbolFields"
                                name="SymbolFields"
                                disabled={viewList}
                                onBlur={formik.handleBlur}
                                onChange={(e: any) => {
                                  formik.setFieldValue("SymbolFields", e.value);
                                }}
                              />
                              <ErrorMessage
                                name="SymbolFields"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Date Format<span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={Dropdown}
                                value={formik.values.DateFormat}
                                options={DateFormatList}
                                optionLabel="MetaSubDescription"
                                optionValue="MetaSubId"
                                placeholder="Select"
                                className="w-full"
                                id="DateFormat"
                                name="DateFormat"
                                disabled={viewList}
                                onBlur={formik.handleBlur}
                                onChange={(e: any) => {
                                  formik.setFieldValue("DateFormat", e.value);
                                }}
                              />
                              <ErrorMessage
                                name="DateFormat"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-12 md:col-3">
                              <label className="form-label">
                                Enter suffix<span className="hlt-txt">*</span>
                              </label>
                              <Field
                                as={InputText}
                                disabled={viewList}
                                className="w-full"
                                id="Entersuffix"
                                name="Entersuffix"
                                onKeyPress={handleKeyPress}
                                onPaste={handlePaste}
                              />
                              <ErrorMessage
                                name="Entersuffix"
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
                                options={StatusList}
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

export default CnumberingShema;
