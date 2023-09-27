import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    countryList:[],
    HdrTable:null,
    statusList:[],
    selectedState:{},
    editOrCreateList:null,
    viewList:false,
    isLoading:false,
    error :'',
    createTranstatus:null,
    stateDeletedList:null,
    countryUpdateList:null,
    createCountryTranstatus:null
}
const BASE_URL = "https://localhost:5001/Country/"


//for get state value
export const getCountryListFromServer = createAsyncThunk(
    "Country/getCountryListFromServer",
    async(data :any,{rejectWithValue})=>{
        const options ={
            method :"POST",
            headers: {
                "content-type": "application/json",
              },
            body :JSON.stringify(data)
            
        }
        const response = await fetch(`${BASE_URL}SearchInitialize`,options)
        if(response.ok){
            const jsonResponce =await response.json()
            return jsonResponce
        }else {
            return rejectWithValue({error:"No Data Found"})
        }
    }
)
export const deleteCountryListFromServer = createAsyncThunk(
    "State/deleteCountryListFromServer",
    async(data :any,{rejectWithValue})=>{
        const options ={
            method :"POST",
            headers: {
                "content-type": "application/json",
              },
            body :JSON.stringify(data)
            
        }
        const response = await fetch(`${BASE_URL}ChangeStatus`,options)
        if(response.ok){
            const jsonResponce =await response.json()
            return jsonResponce
        }else {
            return rejectWithValue({error:"Data is not deleted"})
        }
    }
)
export const addCountryListFromServer = createAsyncThunk(
    "Country/addCountryListFromServer",
    async(data :any,{rejectWithValue})=>{
        const options ={
            method :"POST",
            headers: {
                "content-type": "application/json",
              },
            body :JSON.stringify(data)
            
        }
        const response = await fetch(`${BASE_URL}Create`,options)
        if(response.ok){
            const jsonResponce =await response.json()
            return jsonResponce
        }else {
            return rejectWithValue({error:"Data Not Added"})
        }
    }
)
export const updateCountryListFromServer = createAsyncThunk(
    "State/updateCountryListFromServer",
    async(data :any,{rejectWithValue})=>{
        const options ={
            method :"POST",
            headers: {
                "content-type": "application/json",
              },
            body :JSON.stringify(data)
            
        }
        const response = await fetch(`${BASE_URL}Update`,options)
        if(response.ok){
            const jsonResponce =await response.json()
            return jsonResponce
        }else {
            return rejectWithValue({error:"Data Not Updated"})
        }
    }
)
// export const openEditOrCreateList =(no :any)=>{
//     let editOrCreateList=no
// }

export const initialCountryValue = createAsyncThunk(
    "State/initialCountryValue",
    async(data :any,{rejectWithValue})=>{
        const options ={
            method :"POST",
            headers: {
                "content-type": "application/json",
              },
            body :JSON.stringify(data)
            
        }
        const response = await fetch(`${BASE_URL}CreateInitialize`,options)
        if(response.ok){
            const jsonResponce =await response.json()
            return jsonResponce
        }else {
            return rejectWithValue({error:"Data Not Added"})
        }
    }
)

const countrySlice = createSlice({
    name:'countrySlice',
    initialState,
    reducers: {
        openEditOrCreateList:(state,action) => {
            state.editOrCreateList=action.payload.data
            state.viewList=action.payload.view
        },
        // removeTaskFromList:(state,action) => {
        //     state.stateList = state.stateList.filter((task) => task.id !== action.payload.id)
        // },
        // updateTaskInList:(state,action) => {
        //     state.stateList = state.stateList.map((task) => task.id === action.payload.id ? action.payload : task )
        // },
        // setSelectedTask:(state,action) => {
        //     state.stateList = action.payload
        // }

    },
    extraReducers:(builder) =>{
        builder
           
            .addCase(getCountryListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(getCountryListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.countryList=action.payload.CountryList
            })
            .addCase(getCountryListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.error
            })
            .addCase(addCountryListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(addCountryListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.createCountryTranstatus=action.payload.transtatus
                state.error=''
            })
            .addCase(addCountryListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(updateCountryListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(updateCountryListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.countryUpdateList=action.payload.transtatus
                state.error=''
            })
            .addCase(updateCountryListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(initialCountryValue.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(initialCountryValue.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.statusList=action.payload.CountryStatus
            })
            .addCase(initialCountryValue.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(deleteCountryListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(deleteCountryListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.stateDeletedList=action.payload.transtatus
            })
            .addCase(deleteCountryListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
    }

})

export const {openEditOrCreateList} = countrySlice.actions

export default countrySlice.reducer
