import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    stateList:[],
    countryList:[],
    HdrTable:null,
    StatusList:[],
    selectedState:{},
    editOrCreateList:null,
    isLoading:false,
    error :'',
    createTranstatus:null,
    stateDeletedList:null,
    stateUpdateList:null,
    NumberingSchemaViewList:null,
    NumberingSchemaUpdatedList:null,
    DocumentList:null,
    SymbolList:null,
    DateFormatList:null,
    viewList:false
}
const BASE_URL = "https://localhost:5001/NumberingSchema/"


//for get state value
export const getNumberingShemaList = createAsyncThunk(
    "State/getNumberingShemaList",
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
export const deleteNumberingShema = createAsyncThunk(
    "State/deleteNumberingShema",
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
export const addStateListFromServer = createAsyncThunk(
    "State/addStateListFromServer",
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
export const updateStateListFromServer = createAsyncThunk(
    "State/updateStateListFromServer",
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

export const initialNumberValue = createAsyncThunk(
    "State/initialNumberValue",
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

const numberingShemaSlice = createSlice({
    name:'numberingShemaSlice',
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
           
            .addCase(getNumberingShemaList.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(getNumberingShemaList.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.NumberingSchemaViewList=action.payload.NumberingSchemaViewList
            })
            .addCase(getNumberingShemaList.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.error
            })
            .addCase(addStateListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(addStateListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.createTranstatus=action.payload.transtatus
                state.error=''
            })
            .addCase(addStateListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(updateStateListFromServer.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(updateStateListFromServer.fulfilled,(state,action)=>{
                state.isLoading =false
                state.stateUpdateList=action.payload.transtatus
                state.error=''
            })
            .addCase(updateStateListFromServer.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(initialNumberValue.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(initialNumberValue.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.NumberingSchemaUpdatedList=action.payload.NumberingSchema
                state.DocumentList=action.payload.DocumentList
                state.SymbolList=action.payload.SymbolList
                state.DateFormatList=action.payload.DateFormatList
                state.StatusList=action.payload.StatusList

            })
            .addCase(initialNumberValue.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
            .addCase(deleteNumberingShema.pending,(state)=>{
                state.isLoading =true
            })
            .addCase(deleteNumberingShema.fulfilled,(state,action)=>{
                state.isLoading =false
                state.error=''
                state.stateDeletedList=action.payload.transtatus
            })
            .addCase(deleteNumberingShema.rejected,(state,action :any)=>{
                state.isLoading =false
                // state.error=action.payload.error
            })
    }

})

export const {openEditOrCreateList} = numberingShemaSlice.actions

export default numberingShemaSlice.reducer