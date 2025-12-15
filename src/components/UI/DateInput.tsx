// "use client"; // Make this a Client Component

// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface DateInputProps {
//   label: string;
//   selectedDate: Date | null;
//   onChange: (date: Date | null) => void;
//   placeholder?: string;
// }

// const DateInput: React.FC<DateInputProps> = ({
//   label,
//   selectedDate,
//   onChange,
//   placeholder,
// }) => {
//   return (
//     <div className="flex flex-col">
//       <label className="text-sm text-gray-400">{label}</label>
//       <DatePicker
//         selected={selectedDate}
//         onChange={onChange}
//         placeholderText={placeholder || "Select a date"}
//         dateFormat="yyyy"   // only show year
//         showYearPicker      // select year only
//         className="mt-1 px-2 py-1.5 rounded bg-gray-800 outline-none text-sm text-white"
//       />
//     </div>
//   );
// };

// export default DateInput;
