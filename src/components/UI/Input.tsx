import React from 'react'

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-2 py-1.5 rounded bg-gray-800 outline-none text-sm"
      />
    </div>
  );
}

export default Input
