'use client'
import { useState } from "react";
import Maps from "./compound";
import axios from "axios";

// import {API_BASE_URL} from dotenv


export default function Home() {
    
    const [data, setData] = useState()

    const [formData, setFormData] = useState({
        longitude: '',
        latitude: '',
        range: 10,
      });

      const handleChange = (e:any) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
        
      };

      
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setData(formData);
       
    }
  return (
   <>
      <div className="grid grid-cols-4">
          <div className="col-span-3 ">
              <Maps data = {data} />

          </div>
          <div className="col-span-1 rounded-3xl shadow-md bg-blue-400">
            <div className="w-full">
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" >
                            Longitude:
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="longitude" 
                            name='longitude'
                            onChange={handleChange} 
                            type="text" 
                            placeholder="Longitude" 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text--black text-sm font-bold mb-2" >
                            Latitude:
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text--black mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="latitude" 
                            type="text" 
                            name='latitude'
                            placeholder="Latitude" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text--black text-sm font-bold mb-2" >
                            Range (Radius In Km):
                        </label>
                        <input 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                            min={10} 
                            defaultValue={10} 
                            step={10} 
                            max={1000} 
                            id="range" 
                            type="range" 
                            name='range'
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <button 
                            className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
          </div>
      </div>
   
   
   
   </>
  );
}
