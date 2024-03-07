import React, {useState} from 'react'
import './Loading.css';

const WashingMachine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilled, setIsFilled] = useState(true);
  const [isWashing, setIsWashing] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleFilled = () => {
    setIsFilled(!isFilled);
  };

  const startWashing = () => {
    setIsWashing(true);
    setTimeout(() => {
      setIsWashing(false);
    }, 1200); // Adjust timeout as needed
  };

  return (
    <div className='overall'>
    <div id="wrapper">
      <div
        id="washingMachine"
        className={` ${isFilled ? 'isFilled' : ''} ${isOpen ? 'isOpen' : ''} ${
          isWashing ? 'isWashing' : ''
        }`}
      >
        <div id="controls">{isWashing ? '💦' : isOpen ? '🙃' : 'READY'}</div>
        <div id="door" ></div>
        <div id="tub">
          <span className="clothes"></span>
          <span className="clothes"></span>
          <span className="clothes"></span>
        </div>
      </div>

    </div>
    </div>
  );
};

export default WashingMachine;
