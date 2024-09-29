'use client';

import { useEffect, useState } from 'react';

// Define the type for TrackInfo
interface TrackInfo {
  status: string;
  leaveDays: number;
  performance: string;
}

const TrackInformation = () => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null); // Using TrackInfo type
  const [updatedInfo, setUpdatedInfo] = useState<TrackInfo>({ status: '', leaveDays: 0, performance: '' }); // State for updated info

  useEffect(() => {
    async function fetchTrackInfo() {
      try {
        const response = await fetch('http://localhost:3001/track-information'); // API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data: TrackInfo = await response.json(); // Assign TrackInfo type to data
        setTrackInfo(data);
        setUpdatedInfo(data); // Set existing data into update state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTrackInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({
      ...prev,
      [name]: name === 'leaveDays' ? Number(value) : value, // Convert value to number if leaveDays
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch('http://localhost:3001/track-information', {
        method: 'PUT', // Assuming you're using PUT to update information
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        const updatedData: TrackInfo = await response.json();
        setTrackInfo(updatedData); // Update displayed information
      } else {
        console.error("Error updating information");
      }
    } catch (error) {
      console.error("Error updating information:", error);
    }
  };

  if (!trackInfo) {
    return <p>No information available.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tracking Information</h1>
      <p>Status: {trackInfo.status}</p>
      <p>Leave Days: {trackInfo.leaveDays}</p>
      <p>Performance: {trackInfo.performance}</p>

      {/* Form to update information */}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="status"
          value={updatedInfo.status}
          onChange={handleChange}
          placeholder="Update status"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          name="leaveDays"
          value={updatedInfo.leaveDays}
          onChange={handleChange}
          placeholder="Update leave days"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="performance"
          value={updatedInfo.performance}
          onChange={handleChange}
          placeholder="Update performance"
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Update Information</button>
      </form>
    </div>
  );
};

export default TrackInformation;
