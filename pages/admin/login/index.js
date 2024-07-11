import React from 'react'

export default function index() {
    return (
        <>



<form className="max-w-md mx-auto space-y-4 font-[sans-serif] text-[#333] mt-4">
      <input type="email" placeholder="Enter Email"
        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all" />

      <input type="password" placeholder="Enter Password"
        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all" />

      <div className="flex">
        <input type="checkbox" className="w-4" />
        <label className="text-sm ml-4">Remember me</label>
      </div>

      <button type="button" className="!mt-8 px-6 py-2.5 text-sm bg-[#333] hover:bg-[#222] text-white rounded-sm">Submit</button>
    </form>


            
        </>
    )
}
