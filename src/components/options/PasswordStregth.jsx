import React from "react";

function StrengthMeter({
  poorPassword,
  weakPassword,
  strongPassword,
  passwordError,
}) {
  return (
    <>
      <div className="flex">
        {poorPassword ? (
          <div className="bg-gradient-to-r from-red-700 via-yellow-500 to-amber-600 w-24 h-1" />
        ) :null}
        {weakPassword ? (
          <div className="bg-gradient-to-r  from-amber-600 to-amber-700 w-20 h-1" />
        ) : null}
        {strongPassword ? (
          <div className="bg-gradient-to-r  from-amber-700 to-green-600 w-20 h-1" />
        ) : null}
      </div>
        <p className="text-xs">{passwordError}</p>
    </>
  );
}

export default StrengthMeter;
