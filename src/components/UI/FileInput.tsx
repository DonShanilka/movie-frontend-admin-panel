import React from 'react'

function FileInput({ label, onChange }: any) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="w-full mt-1 text-sm"
      />
    </div>
  );
}
export default FileInput
