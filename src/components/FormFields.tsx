import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  Calendar,
  Dropdown,
  InputText,
  InputTextarea,
  RadioButton,
} from "assets/css/prime-library";

export const AppDrownDown = (props) => {
  const {
    name,
    label,
    type,
    show,
    required,
    disable,
    formik,
    optionLable,
    optionValue,
    handleSelect,
    options,
    ...rest
  } = props;
  return (
    <>
      <div
        style={
          show
            ? null
            : {
                display: "none",
              }
        }
        className="col-12 md:col-3"
        key={name}
      >
        <label className="form-label">
          {label}
          {required ? <span className="hlt-txt">*</span> : null}
        </label>
        <div>{JSON.stringify(options)}</div>
        <Dropdown
          value={formik.values[name]}
          options={options}
          optionLabel={optionLable}
          optionValue={optionValue}
          placeholder={label}
          className="w-full"
          onBlur={formik.handleBlur}
          onChange={(e) =>
            handleSelect(name, formik.values[name], e.target.value)
          }
        />
        <small className="p-error">
          {formik.touched[name] && formik.errors[name]}
        </small>
      </div>
    </>
  );
};

const FormFields = (props) => {
  const {
    name,
    label,
    type,
    show,
    required,
    disable,
    formik,
    optionLabel,
    optionValue,
    handleSelect,
    options,
    ...rest
  } = props;

  switch (type) {
    case "text":
      return (
        <>
          <div
            style={
              show
                ? null
                : {
                    display: "none",
                  }
            }
            className="col-12 md:col-3"
            key={name}
          >
            <label className="form-label">
              {label}
              {required ? <span className="hlt-txt">*</span> : null}
            </label>

            <InputText
              id={name}
              type={type}
              className="w-full"
              label={label}
              name={name}
              disabled={disable}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values[name]}
              {...rest}
            />
            <small className="p-error">
              {formik.touched[name] && formik.errors[name]}
            </small>
          </div>
        </>
      );
    case "textarea":
      return (
        <>
          <div
            style={
              show
                ? null
                : {
                    display: "none",
                  }
            }
            className="col-12 md:col-3"
            key={name}
          >
            <label className="form-label">
              {label}
              {required ? <span className="hlt-txt">*</span> : null}
            </label>
            <InputTextarea
              id={name}
              className="w-full"
              autoResize
              rows={5}
              disabled={disable}
              label={label}
              name={name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values[name]}
              {...rest}
            />
            <small className="p-error">
              {formik.touched[name] && formik.errors[name]}
            </small>
          </div>
        </>
      );

    case "select":
      return (
        <>
          <div
            style={
              show
                ? null
                : {
                    display: "none",
                  }
            }
            className="col-12 md:col-3"
            key={name}
          >
            <label className="form-label">
              {label}
              {required ? <span className="hlt-txt">*</span> : null}
            </label>
            <Dropdown
              id={optionLabel}
              name={optionLabel}
              value={formik.values[name]}
              options={options}
              optionLabel={optionLabel}
              optionValue={optionValue}
              placeholder={label}
              className="w-full"
              onChange={(e) => {
                handleSelect(name, formik.values[name], e.target.value);
              }}
            />
            <small className="p-error">
              {formik.touched[name] && formik.errors[name]}
            </small>
          </div>
          {/* <Select
              labelId={name}
              id={name}
              label={label}
              name={name}
              disabled={disable}
              style={{ width: "100%" }}
              onBlur={formik.handleBlur}
              onChange={(e) =>
                handleSelect(name, formik.values[name], e.target.value)
              }
              value={formik.values[name]}
              error={formik.touched[name] && formik.errors[name]}
              {...rest}
            >
              {options &&
                options.map((option) => {
                  return (
                    <MenuItem
                      id={option.label}
                      key={option.value}
                      value={option.value}
                      style={{ width: "100%" }}
                    >
                      {option.label}
                    </MenuItem>
                  );
                })}
            </Select> */}
        </>
      );
    case "radiobox":
      return (
        <>
          <div
            style={
              show
                ? null
                : {
                    display: "none",
                  }
            }
            className="col-12 md:col-3"
            key={name}
          >
            <label id={name} className="form-label">
              {label}
              {required ? <span className="hlt-txt">*</span> : null}
            </label>
            {/* {options &&
              options.map((option) => {
                return (
                  <RadioButton
                    inputId={option.value}
                    name={name}
                    value={option.value}
                    disabled={disable}
                    checked={formik.values[name].includes(option.value)}
                    onChange={formik.handleChange}
                  />
                );
              })} */}
            <small className="p-error">
              {formik.touched[name] && formik.errors[name]}
            </small>
          </div>
        </>
      );

    case "checkbox":
      return (
        <>
          <div
            style={
              show
                ? null
                : {
                    display: "none",
                  }
            }
            className="col-12 md:col-3"
            key={name}
          >
            <label id={name} className="form-label">
              {label}
              {required ? <span className="hlt-txt">*</span> : null}
            </label>

            <Calendar className="w-full" showIcon />
            <div>{formik.touched[name] && formik.errors[name]}</div>
          </div>
        </>
      );

    // case "checkbox":
    //   return (
    //     <>
    //       <InputLabel id={name}>{label}</InputLabel>
    //       {options &&
    //         options.map((option) => {
    //           return (
    //             <FormControlLabel
    //               key={option.value}
    //               control={
    //                 <Checkbox
    //                   disabled={disable}
    //                   checked={formik.values[name].includes(option.value)}
    //                   onChange={formik.handleChange}
    //                   name={name}
    //                   value={option.value}
    //                 />
    //               }
    //               label={option.label}
    //             />
    //           );
    //         })}
    //       <div>{formik.touched[name] && formik.errors[name]}</div>
    //     </>
    //   );

    // case "toggle":
    //   return (
    //     <>
    //       <InputLabel id={name}>{label}</InputLabel>
    //       {options &&
    //         options.map((opt) => (
    //           <FormControlLabel
    //             key={opt.value}
    //             label={formik.values[name]}
    //             disabled={disable}
    //             checked={formik.values[name]}
    //             onChange={(e) => handleToggle(name, formik.values[name])}
    //             control={<Switch color="primary" />}
    //             labelPlacement="end"
    //           />
    //         ))}
    //       <div>{formik.touched[name] && formik.errors[name]}</div>
    //     </>
    //   );

    // case "image":
    //   return (
    //     <>
    //       <InputLabel id={name}>{label}</InputLabel>
    //       <Input
    //         disabled={disable}
    //         type="file"
    //         id="image-input"
    //         name="image" // Change "image" to the actual field name
    //         onChange={(event: any) => {
    //           formik.setFieldValue("file", event.target.files[0]);
    //         }}
    //         inputProps={{ "aria-label": "Select Image" }}
    //       />

    //       <div>{formik.touched[name] && formik.errors[name]}</div>
    //     </>
    //   );

    // case "imageview":
    //   return (
    //     <>
    //       <InputLabel id={name}>{label}</InputLabel>
    //       {formik.values[name] === "" && (
    //         <div>
    //           <InputLabel id={name}>{"Image not uploaded"}</InputLabel>{" "}
    //         </div>
    //       )}
    //       {formik.values[name] !== "" && (
    //         <>
    //           <div
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               columnGap: "30px",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img
    //               style={{
    //                 display: "block",
    //                 width: "120px",
    //                 height: "120px",
    //                 borderRadius: "20px",
    //                 borderWidth: "2px",
    //                 borderColor: "#14ADFF",
    //                 borderStyle: "solid",
    //                 padding: "5px",
    //               }}
    //               id={name}
    //               src={`data:image/png;base64, ${formik.values[name]}`}
    //               alt={label}
    //             />
    //             <Button
    //               variant="contained"
    //               onClick={() =>
    //                 setImgSource({
    //                   img: formik.values[name],
    //                   label: label,
    //                   show: true,
    //                 })
    //               }
    //             >
    //               Preview
    //             </Button>
    //           </div>
    //         </>
    //       )}
    //     </>
    //   );

    default:
      return null;
  }
};

export default FormFields;
