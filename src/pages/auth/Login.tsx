import { useEffect, useRef } from "react";
import { Formik, FormikHelpers, FormikValues, useFormik } from "formik";
import { AppslogoBig, LoginBg } from "../../assets/css/img-library";
import {
  Button,
  InputText,
  Password,
  Dropdown,
  Toast,
} from "../../assets/css/prime-library";
import { AuthValidationScheam } from "validations/Master";
import { event } from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/slices/common/authSlice";
import { useHistory } from "react-router-dom";
import { showToast } from "redux/slices/common/alertsSlice";
import { AppProgressSpinner } from "components/UtilityComp";

const Login = () => {
  const dispatch: any = useDispatch();
  const route = useHistory();

  const toast = useRef<Toast>(null);

  const loading = useSelector((user: any) => user.loading);
  const users = useSelector((user: any) => user.auth);

  const formik: any = useFormik({
    initialValues: {
      UserName: "",
      PassWord: "",
    },
    onSubmit: (values, event: any) => {
      dispatch(login(values));
    },
    validationSchema: AuthValidationScheam,
  });

  useEffect(() => {
    console.log(users);
    if (users.user != null) {
      if (users.user.tranStatus.result == false) {
        toast.current?.show({
          severity: "warn",
          summary: users.user.tranStatus.lstErrorItem[0].Message,
          detail: "UserName or Password is Incorrect",
        });
      } else if (users.user.tranStatus.result == true) {
        toast.current?.show({
          severity: "success",
          summary: users.user.tranStatus.lstErrorItem[0].Message,
          detail: "Logged In Successfully",
        });
        route.push("/home/vState");
      }
    }
  }, [users]);

  return (
    <>
      {loading ? (
        <AppProgressSpinner />
      ) : (
        <div className="login-page">
          <div className="flex align-items-center justify-content-center">
            <div className="col-4 h-full flex align-items-center justify-content-center login-left">
              <div className="login-container">
                <div className="text-center">
                  <img src={AppslogoBig} alt="" />
                </div>
                <Formik
                  initialValues={formik.initialValues}
                  validationSchema={AuthValidationScheam}
                  onSubmit={formik.handleSubmit}
                >
                  <div className="grid">
                    <div className="col-12">
                      <label className="form-label">
                        Username <span className="hlt-txt">*</span>
                      </label>
                      <InputText
                        id="UserName"
                        value={formik.values["UserName"]}
                        name="UserName"
                        className="w-full"
                        onChange={formik.handleChange}
                      />
                      <small className="p-error">
                        {formik.touched["UserName"] &&
                          formik.errors["UserName"]}
                      </small>
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Password <span className="hlt-txt">*</span>
                      </label>
                      <Password
                        id="PassWord"
                        name="PassWord"
                        value={formik.values["PassWord"]}
                        className="w-full"
                        onChange={formik.handleChange}
                        feedback={false}
                      />
                      <small className="p-error">
                        {formik.touched["PassWord"] &&
                          formik.errors["PassWord"]}
                      </small>
                    </div>

                    <div className="col-12 text-center">
                      <Button
                        label="Login"
                        icon="pi pi-sign-in"
                        className="text-center"
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                      />
                    </div>
                  </div>
                </Formik>
              </div>
            </div>
            <div className="col-8 h-full flex align-items-center justify-content-center login-right">
              <img src={LoginBg} alt="" className="w-full" />
            </div>
          </div>
        </div>
      )}
      <Toast ref={toast} />
    </>
  );
};

export default Login;
