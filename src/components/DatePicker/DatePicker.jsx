import { useRef, useState } from "react";
const DatePicker = () => {
  const interviewDateRef = useRef();
  const [date, setDate] = useState();

  const handleInterviewDateClick = () => {
    interviewDateRef.current.focus();
    console.log(interviewDateRef.current.focus())
  };

  const handleChange = (event) => {
    setDate(event.target.value)
    console.log(event.target.value)
  }

  return (
    <>
      <input type="date" ref={interviewDateRef} className="hidden" onChange={handleChange}/>
    </>
  );
};
export default DatePicker;