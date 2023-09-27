import React, { useState ,useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom'
import {Button,InputText,InputTextarea,Dropdown,RadioButton,Calendar } from '../../../assets/css/prime-library';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch ,useSelector } from 'react-redux'
import { initialStateValue, updateStateListFromServer, addStateListFromServer } from 'redux/slices/master/stateSlice';

// interface Gender {
//     gendername: string;
//     gendercode: string;
// }
const validationSchema = Yup.object({
    Countryname: Yup.number().required('Contry Name is required'),
    StateName: Yup.string().required('State Name is required').max(90, 'Maximum 90 characters allowed'),
    Status: Yup.number().required('Status is required')
  });
const CStateMaster = () => {
   
    const dispatch: any = useDispatch()
    useEffect(()=>{
        if(editOrCreateList!=null){
            const data ={
                Stateid:editOrCreateList.StateId
              }
            dispatch(initialStateValue(data))   
        }else{
        const data ={
            Stateid:0
          }
        dispatch(initialStateValue(data))   
        }
    },[])
    const currentDate = new Date()
    // const {HdrTable} = useSelector((state :any) => state.state)
    const {createTranstatus} = useSelector((state :any) => state.state)
    const {countryList} = useSelector((state :any) => state.state)
    const {statusList}  = useSelector((state :any) => state.state)
    const {editOrCreateList}  = useSelector((state :any) => state.state)
    const {viewList}  = useSelector((state :any) => state.state)
    const initialValues = {
        Countryname:editOrCreateList!=null?editOrCreateList.CountryId:"",
        StateName:editOrCreateList!=null?editOrCreateList.StateName:'',
        Statecode:editOrCreateList!=null?editOrCreateList.StateCode:'',
        Status:editOrCreateList!=null?(editOrCreateList.Status=="Active"?1:2):1,
      };
      const onSubmit = (values: any, { resetForm }: any) => {
        // Handle form submission here
        console.log(values);
        const addedValue ={
            State: {
                countryid: values.Countryname,
                statename: values.StateName,
                statecode: editOrCreateList!=null?editOrCreateList.StateCode:"",
                status: values.Status,
                createdby: 1,
                createdon: currentDate,
                modifiedby: 1,
                modifiedon:currentDate,
                Stateid:editOrCreateList!=null?editOrCreateList.StateId:0
            }
        }
        if(editOrCreateList!=null){
            dispatch(updateStateListFromServer(addedValue))
            navigateTo('/vStateMaster')
        }else{
            dispatch(addStateListFromServer(addedValue))
        }
        
        resetForm()
      };
    const history=useHistory();
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
        const pastedText = e.clipboardData.getData('text');
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
        const pastedText = e.clipboardData.getData('text');
        if (!/^[a-zA-Z]*$/.test(pastedText)) {
          e.preventDefault();
        }
      };
    return ( 
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
          {(formik) => (
        <Form>
        <div className="page-container">
            <div className="inner-page-container">
                <div className="page-title">
                    <div className="grid grid-nogutter">
                        <div className="md:col-6">
                            <h1>State Master</h1>
                        </div>
                        <div className="md:col-6 text-right">
                            <div className='action-btn'>
                                <Button disabled={viewList} label="" title="Save" icon='pi pi-eye' className='text-center' type="submit" />
                                <Button disabled={viewList} label="" severity="danger" icon='pi pi-trash' title="Clear" className='text-center' onClick={() => handleClearClick(formik)}/>
                                <a  title="Back to View" className='p-button p-button-success text-center' onClick={()=>{navigateTo('/vStateMaster')}}><i className='pi pi-search'></i></a>
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
                        <div className='widget-body'>
                            <div className='normal-table'>
                                <div className="grid">
                                     <div className="col-12 md:col-11">
                                        <div className="grid">
                                            <div className="col-12 md:col-3">
                                                <label className='form-label'>Country Name <span className='hlt-txt'>*</span></label>
                                                {/* <Field as={Dropdown} options={countryOption} optionLabel="Countryname" placeholder="Select" className="w-full" id="Countryname" name="Countryname"  onChange={(e: any) => {formik.setFieldValue('Countryname',e.value);}}/>onChange={(e :any)=>{setselectedCountry(e.value)}} */}
                                                <Field as={Dropdown}
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
                                                 onChange={(e: any) => {formik.setFieldValue('Countryname',e.value);}}
                                                 />
                                                <ErrorMessage name="Countryname" component="div" className="error"  />
                                            </div>
                                            <div className='col-12 md:col-3'>
                                               <label className='form-label'>State code</label>
                                              <Field as={InputText} disabled className='w-full'  id="Statecode" name="Statecode"/>
                                            </div>
                                            <div className='col-12 md:col-3'>
                                               <label className='form-label'>State Name <span className='hlt-txt'>*</span></label>
                                              <Field as={InputText} disabled={viewList} className='w-full' id="StateName" name="StateName" onKeyPress={handleKeyPress} onPaste={handlePaste} />
                                              <ErrorMessage name="StateName" component="div" className="error" />
                                            </div>
                                            <div className="col-12 md:col-3">
                                                <label className='form-label'>Status <span className='hlt-txt'>*</span></label>
                                                {/* <Field as={Dropdown} options={statusOption} optionLabel="Metadatasubdescription" placeholder="Select" className="w-full" id="Status" name="Status" onChange={(e: any) => {formik.setFieldValue('Status', e.value);}}/> */}
                                                <Field as={Dropdown}
                                                 value={formik.values.Status}
                                                 options={statusList}
                                                 optionLabel="MetaSubDescription"
                                                 optionValue="MetaSubId"
                                                 placeholder="Select"
                                                 className="w-full"
                                                 id="Status"
                                                 name="Status"
                                                 disabled={editOrCreateList!=null&&(!viewList)?false:true}
                                                 onBlur={formik.handleBlur}
                                                 onChange={(e: any) => {formik.setFieldValue('Status',e.value);}}
                                                 />
                                                <ErrorMessage name="Status" component="div" className="error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {createTranstatus!=null&&null}
                    </div>
                </div>
            </div>
        </div>
        </Form>
          )}
    </Formik>
     );
}
 
export default CStateMaster;

