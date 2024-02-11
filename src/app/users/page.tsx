import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export default function UsersPage() {
  return (
    
     

              <form action="#" className="space-y-4">
                
              <h2 className="text-xl font-bold mb-2">Main</h2>
                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">App-Name</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Name"
                    type="text"
                    id="name"
                  />
                </div>

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">App-Title</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Title"
                    type="text"
                    id="title"
                  />
                </div>

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">App-Description</label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Description"
                    id="appDescription"
                  ></textarea>
                </div>

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">App-Keywords</label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Keywords"
                    id="appKeywords"
                  ></textarea>
                </div>

                {/* Line break and Image Titles */}
                <hr className="my-4" />
                <h2 className="text-xl font-bold mb-2">Images</h2>

              

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Image 1</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    type="file"
                    id="image1"
                  />
                </div>

             

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Image 2</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    type="file"
                    id="image2"
                  />
                </div>

              

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Image 3</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    type="file"
                    id="image3"
                  />
                </div>

                {/* Line break and Link Titles */}
                <hr className="my-4" />
                <h2 className="text-xl font-bold mb-2">Links</h2>

                {/* Section for Link 1 */}
                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Link 1 Title</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Link 1 Title"
                    type="text"
                    id="link1Title"
                  />
                </div>

                {/* Section for Link 2 */}
                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Link 2 Title</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Link 2 Title"
                    type="text"
                    id="link2Title"
                  />
                </div>

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">App-Keywords</label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Keywords"
                    id="appKeywords"
                  ></textarea>
                </div>

                {/* Line break and Other Titles */}
                <hr className="my-4" />
                <h2 className="text-xl font-bold mb-2">Other Titles</h2>

                {/* Section for Other 1 */}
                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Other 1 Title</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Other 1 Title"
                    type="text"
                    id="other1Title"
                  />
                </div>

                {/* Section for Other 2 */}
                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Other 2 Title</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Other 2 Title"
                    type="text"
                    id="other2Title"
                  />
                </div>

                {/* Section for Other 3 */}
                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Other 3 Title</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Other 3 Title"
                    type="text"
                    id="other3Title"
                  />
                </div>

                <div className='border rounded-lg border-gray-400'>
                  <label className="sr-only">Other 4 Title</label>
                  <input
                    className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Other 4 Title"
                    type="text"
                    id="other3Title"
                  />
                </div>


                <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>


                

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Add App
                  </button>
                </div>
              </form>    
  );
}
