import classes from './Controller.module.css';
import { GrPlayFill, GrPauseFill  } from "react-icons/gr";

const Controller = ({ data=[], index, isPlaying, playVideo, handleSlider }) => {

  return (
    <>
      {data.length > 0 && <div className={classes['control-container']}>
        <div className={classes.controller}>
          <button className={classes['button-player']} onClick={playVideo}>{ !isPlaying ? <GrPlayFill /> : <GrPauseFill />}</button>
          <div className={classes.slidecontainer}>
            <input  type="range" className={classes.slider} 
                      step={1}
                      value={index}
                      onChange={handleSlider}
                      min="0" max={data.length-1} list="steplist" />
            <datalist id="steplist">
              { data.map(([year], index) => index%4 === 0 ? <option key={year}>{ year }</option> : null ) }
            </datalist>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Controller;