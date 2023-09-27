import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  companyList: [],
  HdrTable: null,
  statusList: [],
  selectedCompany: {},
  editOrCreateList: null,
  viewList: false,
  isLoading: false,
  error: "",
  createTranstatus: null,
  companyDeletedList: null,
  companyUpdateList: null,
  createCompanyTranstatus: null,
};
const BASE_URL = "https://localhost:5001/Company/";

//for get company value
export const getCompanyListFromServer = createAsyncThunk(
  "Company/getCompanyListFromServer",
  async (data: any, { rejectWithValue }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}SearchInitialize`, options);
    if (response.ok) {
      const jsonResponce = await response.json();
      return jsonResponce;
    } else {
      return rejectWithValue({ error: "No Data Found" });
    }
  }
);

export const deleteCompanyListFromServer = createAsyncThunk(
  "Company/deleteCompanyListFromServer",
  async (data: any, { rejectWithValue }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}ChangeStatus`, options);
    if (response.ok) {
      const jsonResponce = await response.json();
      return jsonResponce;
    } else {
      return rejectWithValue({ error: "Data is not deleted" });
    }
  }
);
export const addCompanyListFromServer = createAsyncThunk(
  "Company/addCompanyListFromServer",
  async (data: any, { rejectWithValue }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}Create`, options);
    if (response.ok) {
      const jsonResponce = await response.json();
      return jsonResponce;
    } else {
      return rejectWithValue({ error: "Data Not Added" });
    }
  }
);
export const updateCompanyListFromServer = createAsyncThunk(
  "Company/updateCompanyListFromServer",
  async (data: any, { rejectWithValue }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}Update`, options);
    if (response.ok) {
      const jsonResponce = await response.json();
      return jsonResponce;
    } else {
      return rejectWithValue({ error: "Data Not Updated" });
    }
  }
);
export const initialCompanyValue = createAsyncThunk(
  "Company/initialCompanyValue",
  async (data: any, { rejectWithValue }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}CreateInitialize`, options);
    if (response.ok) {
      const jsonResponce = await response.json();
      return jsonResponce;
    } else {
      return rejectWithValue({ error: "Data Not Added" });
    }
  }
);

const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {
    openEditOrCreateList: (state, action) => {
      state.editOrCreateList = action.payload.data;
      state.viewList = action.payload.view;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCompanyListFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyListFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.companyList = action.payload.CompanyList;
      })
      .addCase(getCompanyListFromServer.rejected, (state, action: any) => {
        state.isLoading = false;
        // state.error=action.error
      })
      .addCase(addCompanyListFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCompanyListFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createCompanyTranstatus = action.payload.transtatus;
        state.error = "";
      })
      .addCase(addCompanyListFromServer.rejected, (state, action: any) => {
        state.isLoading = false;
        // state.error=action.payload.error
      })
      .addCase(updateCompanyListFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompanyListFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyUpdateList = action.payload.transtatus;
        state.error = "";
      })
      .addCase(updateCompanyListFromServer.rejected, (state, action: any) => {
        state.isLoading = false;
        // state.error=action.payload.error
      })
      .addCase(initialCompanyValue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initialCompanyValue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.statusList = action.payload.StatusList;
      })
      .addCase(initialCompanyValue.rejected, (state, action: any) => {
        state.isLoading = false;
        // state.error=action.payload.error
      })
      .addCase(deleteCompanyListFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCompanyListFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.companyDeletedList = action.payload.transtatus;
      })
      .addCase(deleteCompanyListFromServer.rejected, (state, action: any) => {
        state.isLoading = false;
        // state.error=action.payload.error
      });
  },
});
export const { openEditOrCreateList } = companySlice.actions;

export default companySlice.reducer;
