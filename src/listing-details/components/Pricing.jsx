import React from 'react'
import { Button } from '@/components/ui/button'
import { FaHandshake } from "react-icons/fa";

function Pricing({itemDetails}) {
  return (
    <div className='p-10 rounded-xl 
    
    shadow-[0_30px_60px_rgba(0,0,0,0.15)]
    border border-gray-100
    transform transition-all duration-300
    hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]
    hover:-translate-y-1.5
    before:opacity-0; before:transition-opacity; before:duration-300
    hover:before:opacity-100
    '>
      {itemDetails ? 
      (<div><h2 className='font-bold'>Our Price</h2>
      <h2 className='font-bold text-2xl'>₹{itemDetails?.rentalprice}/monthly</h2>
      <Button className="!bg-blue-700 w-full mt-7" size='lg'><FaHandshake className='text-lg mr-2'/>Make an Offer Price</Button></div>) 
      :
      (<div className="w-full h-[100px] rounded-xl bg-slate-200 animate-pulse"></div>)
      }
      </div>
  )
}

export default Pricing