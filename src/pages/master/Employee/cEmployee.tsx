import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom'
import {Button,InputText,InputTextarea,Dropdown,RadioButton,Calendar } from '../../../assets/css/prime-library';
import VEmployeeMaster from './vEmployee';

interface Gender {
    gendername: string;
    gendercode: string;
}

const CEmployeeMaster = () => {
    const history=useHistory();
    function navigateTo(url: string) {
        console.log('hi')
        history.push(url);
      }
    const [selectedGender, setselectedGender] = useState<Gender | null>(null);
    const Gender: Gender[] = [
        { gendername: 'Male', gendercode: 'gdrml' },
        { gendername: 'Female', gendercode: 'gdrfml' },
        { gendername: 'Others', gendercode: 'gdrother' },
    ];
    return ( 
        <div className="page-container">
            <div className="inner-page-container">
                <div className="page-title">
                    <div className="grid grid-nogutter">
                        <div className="md:col-6">
                            <h1>Employee Master</h1>
                        </div>
                        <div className="md:col-6 text-right">
                            <div className='action-btn'>
                                <Button label="" title="Save" icon='pi pi-eye' className='text-center' />
                                <Button label="" severity="danger" icon='pi pi-trash' title="Clear" className='text-center' />
                                <a href='/vEmployeeMaster' title="Back to View" className='p-button p-button-success text-center'><i className='pi pi-search'></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-container scroll-y">
                    <div className="white">
                        <div className="widget-hdr">
                            <div className="sub-title">
                                <div className="grid">
                                    <div className="md:col-6">
                                        <h2>Personal Information</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='widget-body'>
                            <div className='normal-table'>
                                <div className="grid">
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>First Name <span className='hlt-txt'>*</span></label>
                                        <InputText className='w-full' value='Karthik'  />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Last Name <span className='hlt-txt'>*</span></label>
                                        <InputText className='w-full'  />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Gender <span className='hlt-txt'>*</span></label>
                                        <div className='flex gap-3'>
                                            <div className="flex align-items-center">
                                                <RadioButton inputId="ingredient1" name="pizza" value="Cheese" />
                                                <label htmlFor="ingredient1" className="ml-2">Male</label>
                                            </div>
                                            <div className="flex align-items-center">
                                                <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" />
                                                <label htmlFor="ingredient2" className="ml-2">Female</label>
                                            </div>
                                            <div className="flex align-items-center">
                                                <RadioButton inputId="ingredient3" name="pizza" value="Pepper" />
                                                <label htmlFor="ingredient3" className="ml-2">Others</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Date of Birth <span className='hlt-txt'>*</span></label>
                                        <Calendar className='w-full' showIcon />
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <div className="grid">
                                            <div className="col-12 md:col-4">
                                                <label className='form-label'>Marital Status <span className='hlt-txt'>*</span></label>
                                                <Dropdown value={selectedGender} options={Gender} optionLabel="gendername" placeholder="Select" className="w-full" onChange={(e)=>{setselectedGender(e.value)}} />
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <label className='form-label'>Blood Group <span className='hlt-txt'>*</span></label>
                                                <Dropdown value={selectedGender} options={Gender} optionLabel="gendername" placeholder="Select" className="w-full" />
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <label className='form-label'>E-Mail ID <span className='hlt-txt'>*</span></label>
                                                <InputText className='w-full'  />
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <label className='form-label'>Mobile Number <span className='hlt-txt'>*</span></label>
                                                <InputText className='w-full'  />
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <label className='form-label'>Secondary Mobile Number <span className='hlt-txt'>*</span></label>
                                                <InputText className='w-full'  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-3">
                                        <label className='form-label'>Address <span className='hlt-txt'>*</span></label>
                                        <InputTextarea className='w-full' autoResize rows={5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="white">
                        <div className="widget-hdr">
                            <div className="sub-title">
                                <div className="grid">
                                    <div className="md:col-6">
                                        <h2>Company Information</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='widget-body'>
                            <div className='normal-table'>
                                <div className="grid">
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Employee Code <span className='hlt-txt'>*</span></label>
                                        <InputText className='w-full' value='AG00120'  />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Date of Joining <span className='hlt-txt'>*</span></label>
                                        <Calendar className='w-full' showIcon />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Official E-Mail <span className='hlt-txt'>*</span></label>
                                        <InputText className='w-full' value=''  />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Reporting Person <span className='hlt-txt'>*</span></label>
                                        <Dropdown value={selectedGender} options={Gender} optionLabel="gendername" placeholder="Select" className="w-full" />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Branch <span className='hlt-txt'>*</span></label>
                                        <Dropdown value={selectedGender} options={Gender} optionLabel="gendername" placeholder="Select" className="w-full" />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Department <span className='hlt-txt'>*</span></label>
                                        <Dropdown value={selectedGender} options={Gender} optionLabel="gendername" placeholder="Select" className="w-full" />
                                    </div>
                                    <div className='col-12 md:col-3'>
                                        <label className='form-label'>Designation <span className='hlt-txt'>*</span></label>
                                        <Dropdown value={selectedGender} options={Gender} optionLabel="gendername" placeholder="Select" className="w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CEmployeeMaster;