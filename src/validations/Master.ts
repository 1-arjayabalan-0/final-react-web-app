import { object, string, number, date, InferType } from "yup";

//Login
export const AuthValidationScheam = object({
  UserName: string().required(),
  PassWord: string().required(),
});

// State
export const StateValidationSchema = object({
  StateName: string().min(2, "Too Short").required(),
  Status: number().required().positive().integer(),
  CountryName: number().required(),
});

// City
export const CityValidationSchema = object({
  Countryname: number().required("Contry Name is required"),
  StateName: string()
    .required("State Name is required")
    .max(90, "Maximum 90 characters allowed"),
  Status: number().required("Status is required"),
});

// Company
export const CompanyValidationSchema = object({
  CompanyName: string()
    .required("Company Name is required")
    .max(90, "Maximum 90 characters allowed"),
  Status: number().required("Status is required"),
});

// Country
export const CountryValidationSchema = object({
  CountryName: string()
    .required("Contry Name is required")
    .max(90, "Maximum 90 characters allowed"),
  Nationality: string()
    .required("Nationality is required")
    .max(30, "Maximum 30 characters allowed"),
  Status: number().required("Status is required"),
  CountryShortform: string()
    .required("Contry Shortform is required")
    .max(5, "Maximum 5 characters allowed"),
});

// Numbering Schema
export const NumberingSchemaValidationSchema = object({
  // Countryname: Yup.number().required('Contry Name is required'),
  // StateName: Yup.string().required('State Name is required').max(90, 'Maximum 90 characters allowed'),
  // Status: Yup.number().required('Status is required')
});
