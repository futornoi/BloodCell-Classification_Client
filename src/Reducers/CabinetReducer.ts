export interface Cabinet {
  loading: boolean,
  error: string,
  image_file: string,
  show_predict: boolean,
  show_result: boolean,
  scores: {
    name: string,
    value: number
  }[] | null,
}

export const cabinetInitial: Cabinet = {
  loading: false,
  error: '',
  image_file : '',
  show_predict : false,
  show_result : false,
  scores: null
}

//TYPES
export enum cabinetTypes {
  UPLOAD_FILE = 'UPLOAD_FILE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  PREDICTION = 'PREDICTION',
  RESET_RESULT = 'RESET_RESULT',
}

//ACTIONS
interface UploadFileAction {
  type: cabinetTypes.UPLOAD_FILE,
  payload: string,
}
interface LoadingAction {
  type: cabinetTypes.LOADING,
  payload: boolean,
}
interface ErrorAction {
  type: cabinetTypes.ERROR,
  payload: string,
}
interface ResetResultAction {
  type: cabinetTypes.RESET_RESULT,
}
interface PredictAction {
  type: cabinetTypes.PREDICTION,
  payload: {
    name: string,
    value: number,
  }[],
}

export type cabinetActions = UploadFileAction | LoadingAction | ErrorAction | PredictAction | ResetResultAction

export const cabinetReducer = (state: Cabinet, action: cabinetActions) => {
  switch (action.type) {
    case cabinetTypes.LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case cabinetTypes.ERROR:
      return {
        ...state,
        error: action.payload
      };
    case cabinetTypes.UPLOAD_FILE:
      return {
        ...state,
        image_file: action.payload,
        show_predict: true,
      }
    case cabinetTypes.PREDICTION:
      return {
        ...state,
        scores: action.payload,
        show_result: true,
      }
    case cabinetTypes.RESET_RESULT:
      return {
        ...state,
        scores: null,
        show_result: false,
      }
    default: return state
  }
}

export const uploadFile = (fileSrc: UploadFileAction["payload"]): UploadFileAction => {
  return {type: cabinetTypes.UPLOAD_FILE, payload: fileSrc};
}

export const setLoading = (isLoading: LoadingAction["payload"]): LoadingAction => {
  return {type: cabinetTypes.LOADING, payload: isLoading};
}

export const setError = (error: ErrorAction["payload"]): ErrorAction => {
  return {type: cabinetTypes.ERROR, payload: error};
}

export const setCells = (error: PredictAction["payload"]): PredictAction => {
  return {type: cabinetTypes.PREDICTION, payload: error};
}
export const resetResult = (): ResetResultAction => {
  return {type: cabinetTypes.RESET_RESULT};
}

