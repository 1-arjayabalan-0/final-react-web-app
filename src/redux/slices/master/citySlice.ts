import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    CityList:[],
    stateList:[],
    countryList:[],
    HdrTable:null,
    statusList:[],
    selectedState:{},
    editOrCreateList:null,
    isLoading:false,
    error :'',
    createTranstatus:null,
    stateDeletedList:null,
    stateUpdateList:null,
    viewList:false
}
const BASE_URL = "https://localhost:5001/City/"


//for get state value
export const getCityListFromServer = createAsyncThunk(
    "State/getCityListFromServer",
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
export const deleteCityListFromServer = createAsyncThunk(
    "State/deleteCityListFromServer",
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
export const addCityListFromServer = createAsyncThunk(
    "State/addCityListFromServer",
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
export const updateCityListFromServer = createAsyncThunk(
    "State/updateCityListFromServer",
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

export const initialCityValue = createAsyncThunk(
    "State/initialCityValue",
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

const citySlice = createSlice({
    name:'citySlice',
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
           
            .addCase(getCityListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(getCityListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.CityList=action.payload.CityList
            })
            .addCase(getCityListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.error
            })
            .addCase(addCityListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(addCityListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.createTranstatus=action.payload.transtatus
                state.error=''
            })
            .addCase(addCityListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(updateCityListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(updateCityListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.stateUpdateList=action.payload.transtatus
                state.error=''
            })
            .addCase(updateCityListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(initialCityValue.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(initialCityValue.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.statusList=action.payload.MetaData
                state.countryList=action.payload.CountryList
                state.stateList=action.payload.StateList
                state.HdrTable=action.payload.HdrTable
            })
            .addCase(initialCityValue.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(deleteCityListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(deleteCityListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.stateDeletedList=action.payload.transtatus
            })
            .addCase(deleteCityListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
    }

})

export const {openEditOrCreateList} = citySlice.actions

export default citySlice.reducer