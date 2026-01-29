import React from 'react'

const IsImportantInput = () => {

    
  return (
    <div className="flex items-center border shadow-[0_0_25px_4px] shadow-primary/10 border-primary px-2 py-1 rounded-[7px] gap-1 mx-2 ">
        <label
          className="text-nowrap cursor-pointer text-sm"
          htmlFor="isImportant"
        >
          important?
        </label>
        <input
          className="cursor-pointer"
          id="isImportant"
          type="checkbox"
          name="isImportant"
        />
      </div>
  )
}

export default IsImportantInput