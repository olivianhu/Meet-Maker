import { useState } from "react";

const CreationPage = () => {

  const [meetingData, setMeetingData] = useState({
    name: "",
    startTime: "9",
    endTime: "20",
    startDate: "",
    endDate: "",
  });

  const [createdMeeting, setCreatedMeeting] = useState(null);

  const handleChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: `${meetingData.name}`,
      startTime: `${meetingData.startTime}:00:00 EST`, 
      endTime:  `${meetingData.endTime}:00:00 EST`, 
      dateRange: `[${meetingData.startDate}, ${meetingData.endDate}]`, // daterange
      user: 1, // replace with user id
    };
    
    // console.log(requestBody);

    try {
      const response = await fetch("http://localhost:5000/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Meeting created successfully");
        const data = await response.json();
        console.log(data);
        setCreatedMeeting(data);
      } else {
        console.error("Failed to create meeting");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return(
    <div>
      {createdMeeting && (
        <div className="p-4 border border-green-500 rounded-md bg-green-100 my-4">
          <h2 className="text-lg font-semibold">Meeting Created!</h2>
          <p><strong>Name:</strong> {createdMeeting.name}</p>
          <p><strong>Time Range:</strong> {createdMeeting.start_time} to {createdMeeting.end_time}</p>
          <p><strong>Date Range:</strong> {createdMeeting.date_range}</p>
        </div>
      )}

      <h1 className="text-xl font-bold mb-4">Meeting Creation</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        <div>
          <label className="text-lg">Name: </label>
          <input
              type="text"
              name="name"
              placeholder="My Meeting"
              className="border border-gray-300 rounded-md text-sm px-1"
              value={meetingData.name}
              onChange={handleChange}
            />
        </div>

        <div>
          <label htmlFor="times">What times?</label>
          <div className="flex gap-2">
            <select
              name="startTime"
              id="start-time"
              className="border border-gray-300 rounded-md"
              value={meetingData.startTime}
              onChange={handleChange}
            >
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={hour}>
                  {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "a.m." : "p.m."}
                </option>
              ))}
            </select>
            to
            <select
              name="endTime"
              id="end-time"
              className="border border-gray-300 rounded-md"
              value={meetingData.endTime}
              onChange={handleChange}
            >
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={hour}>
                  {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "a.m." : "p.m."}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dates">What dates?</label>
          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              className="border border-gray-300 rounded-md"
              value={meetingData.startDate}
              onChange={handleChange}
            />
            to
            <input
              type="date"
              name="endDate"
              className="border border-gray-300 rounded-md"
              value={meetingData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="text-white px-4 py-2 rounded-md w-44">
          Create Meeting
        </button>
      </form>
    </div>
  )
}

export default CreationPage;