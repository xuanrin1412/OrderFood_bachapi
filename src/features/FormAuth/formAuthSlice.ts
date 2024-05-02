import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  focusedInput: string;
  showPassword: boolean;
  userId:number|undefined
}

const initialState: FormState = {
  focusedInput: "",
  showPassword: false,
  userId:undefined
};

const formAuthSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFocus: (state, action: PayloadAction<string>) => {
      state.focusedInput = action.payload
    },
    setuserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload
    },
    setBlur: (state) => {
      state.focusedInput = ""
    },
    togglePassword: (state)=>{
        const elementPassword = document.getElementsByClassName("password");
        if ((elementPassword.length > 0 && (elementPassword[0] as HTMLInputElement).type === "password")) {
            (elementPassword[0] as HTMLInputElement).type = "text"
            state.showPassword = true
        } else {
            (elementPassword[0] as HTMLInputElement).type = "password"
            state.showPassword = false
        }
    }
  },
});

export const { setFocus , setuserId,setBlur ,togglePassword} = formAuthSlice.actions;
export default formAuthSlice.reducer;
