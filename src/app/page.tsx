"use client";
import React, { useState } from "react";

const APILink = "https://jsonplaceholder.typicode.com/posts";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Not Started",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(APILink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.error("Error: Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Task Form
        </h2>

        <div className="mb-4">
          <label htmlFor="task" className="block text-gray-700">
            Task
          </label>
          <input
            type="text"
            id="task"
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
