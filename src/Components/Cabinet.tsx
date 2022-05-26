import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import {
  cabinetInitial,
  cabinetReducer, resetResult,
  setCells,
  setError,
  setLoading,
  uploadFile,
} from "../Reducers/CabinetReducer";
import { ModelContainer, runInference } from "../Models/Initializer";
import { computeScore } from "../Helper/computeScore";
import Preloader from "./Preloader";
import Popup from "./Popup";
import { Pie, Tooltip, PieChart, ResponsiveContainer } from "recharts";

let modelCache = new ModelContainer(null);

const Cabinet = () => {
  const [state, dispatch] = useReducer(cabinetReducer, cabinetInitial);
  const [imgModal, setImgModal] = useState(false);

  const toggleModal = () => setImgModal(prev => !prev);

  const getStarted = async () => {
    dispatch(setError(''))
    dispatch(setLoading(true))
    try {
      await modelCache.loadFromURL('http://localhost:3001/model_metadata');
      dispatch(setLoading(false))
    } catch (e: any) {
      dispatch(setError(e?.message))
    }
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const reader = new FileReader();
    dispatch(resetResult())

    reader.onload = (e) => {
      if (!!e.target?.result) {
        dispatch(uploadFile(e.target.result as string))
      }
    }

    if (!!files) {
      reader.readAsDataURL(files[0])
    }
  }

  const onPredict = () => {
    const image = document.getElementById('image-container');
    if (!!image) {
      const result = runInference(modelCache, image);
      dispatch(setCells(computeScore(result)))
    }
  }

  useEffect(() => {
    getStarted()
  }, [])

  if (!!state.error) return <Preloader title={state.error}/>
  if (!!state.loading) return <Preloader/>

  return (
    <div id="cabinet" className="layout__container">
      <div className="image-section">
        <div className="image-wrapper">
          {
            !!state.image_file
              ? <img onClick={toggleModal} id="image-container" className="image-block" src={state.image_file}
                     alt="Predictions image"/>
              : <div className="image-block empty">Uploaded image</div>
          }
        </div>
        <label className="default-btn image-btn">
          <span>Upload image</span>
          <input onChange={onFileChange} type="file"/>
        </label>
      </div>
      {
        (state.show_predict) &&
        <button onClick={onPredict} className="default-btn black predict-btn"><span>Predict</span></button>
      }
      {
        (state.show_result && state.scores) && (
          <div className="chart__container" style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={state.scores} fill="#8b0000" label />
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      }
      <Popup active={imgModal} toggleModal={toggleModal}>
        <img className="popup-image" src={state.image_file} alt="Predictions image"/>
      </Popup>
    </div>
  );
};

export default Cabinet;