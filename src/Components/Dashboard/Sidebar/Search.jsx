import { useState } from 'react';
import {FiSearch, FiCommand} from 'react-icons/fi';
import CommandMenu from './CommandMenu';
function Search() {
  const [open, setOpen] = useState(false)
  return (
   <>
    <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
      <FiSearch/>
      <input type="text"
      placeholder='Search'
      onFocus={(e) =>{
        e.target.blur();
        setOpen(true);
      }}
       className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />
        <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
          <FiCommand/>k
        </span>
    </div>

    <CommandMenu open={open} setOpen={setOpen}/>
   </>
  )
}

export default Search