import { handleActions } from "redux-actions";
import { actionTypes } from "../actions/upload";

export interface FileUploadState {
  file: File | null;
  status: string;
  error: string;
  progress: number;
  uploadedKey: string;
}
const initialState: FileUploadState = {
  file: null,
  status: "init",
  error: "",
  progress: 0,
  uploadedKey: ""
};

const uploadReducer = handleActions(
  {
    [actionTypes.SELECTED_FILE]: (state: FileUploadState, action) => {
      if (action && action.payload && action.payload.file) {
        console.log(`selected file${action.payload.file.name}`);
        return {
          ...state,
          file: action.payload.file,
          status: "file selected",
          error: ""
        };
      }
      console.log(
        `selected file- none${action}${action.payload}${action.payload.file}`
      );
      return state;
    },
    [actionTypes.UPLOAD_FILE]: (state: FileUploadState) => {
      if (state.file) {
        console.log(`upload file${state.file.name}`);
        return { ...state, status: "pending", error: "", uploadedKey: "" };
      }
      return state;
    },
    [actionTypes.UPLOAD_FILE_START]: (state: FileUploadState) => {
      console.log("upload start");
      return { ...state, status: "in progress", error: "", uploadedKey: "" };
    },
    [actionTypes.UPLOAD_FILE_PROGRESS]: (state: FileUploadState, action) => {
      console.log("upload progress");
      return { ...state, progress: action.payload.progress };
    },
    [actionTypes.UPLOAD_FILE_SUCCESS]: (state: FileUploadState, action) => {
      console.log("upload success");
      return {
        ...state,
        status: "done",
        error: "",
        uploadedKey: action.payload.uploadedKey
      };
    },
    [actionTypes.UPLOAD_FILE_FAILED]: (state: FileUploadState, action) => {
      console.log("upload failed");
      return { ...state, status: "error", error: action.payload.error };
    },
    [actionTypes.UPLOAD_FILE_CANCEL]: (state: FileUploadState) => {
      console.log("upload cancel require");
      return { ...state, status: "aborting..." };
    },
    [actionTypes.UPLOAD_FILE_CANCELED]: (state: FileUploadState) => {
      console.log("upload cancel require");
      return { ...state, status: "aborted", file: null };
    },
    [actionTypes.UPLOAD_STATUS_RESET]: () => {
      console.log("upload status reset");
      return initialState;
    }
  },
  initialState
);

export default uploadReducer;
