              onChange={(e) => setEmail(e.target.value)} 

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

              required

            />

          </div>


          <div>

            <label className="block text-sm font-medium text-gray-700">Mobile Number:</label>

            <input 

              type="tel" 

              value={mobileNumber} 

              onChange={(e) => setMobileNumber(e.target.value)} 

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

              required

            />

          </div>


          <div>

            <label className="block text-sm font-medium text-gray-700">Date:</label>

            <input 

              type="date" 

              value={date} 

              onChange={(e) => setDate(e.target.value)} 

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

              required

            />

          </div>


          <div>

            <label className="block text-sm font-medium text-gray-700">Time:</label>

            <input 

              type="time" 

              value={time} 

              onChange={(e) => setTime(e.target.value)} 

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

              required

            />

          </div>


          <button 

            type="submit" 

            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"

          >

            Schedule Meeting

          </button>

        </form>

        {message && <p className="mt-4 text-green-500">{message}</p>}

        {error && <p className="mt-4 text-red-500">{error}</p>}

      </div>

    </div>

  );

};


export default MentorProfile;