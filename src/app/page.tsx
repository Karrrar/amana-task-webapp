/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const APILink = "https://localhost:7269/Task";

enum Priority {
  High = 0,
  Medium = 1,
  Low = 2,
}

type Task = {
  title: string;
  description: string;
  priority: number;
  dueDate: string;
  status: string;
}



const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(APILink);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const redirectToAddPage = () => {
    router.push("/add")
  };

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case Priority.High:
        return 'High';
      case Priority.Medium:
        return 'Medium';
      case Priority.Low:
        return 'Low';
      default:
        return 'Unknown';
    }
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <div className="grid grid-cols-5 gap-4 bg-gray-200 font-semibold p-2">
        <div>Title</div>
        <div>Description</div>
        <div>Priority</div>
        <div>Due Date</div>
        <div>Status</div>
      </div>

      {tasks.map((task, index) => (
        <div
          key={index}
          className="grid grid-cols-5 gap-4 p-2 border-b border-gray-200 hover:bg-gray-100"
        >
          <div>{task.title}</div>
          <div>{task.description}</div>
          <div>{getPriorityLabel(task.priority)}</div>
          <div>{task.dueDate}</div>
          <div>{task.status}</div>
        </div>
      ))}

      <button
        onClick={redirectToAddPage}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add New Task
      </button>
    </div>
  );
};

export default TaskPage;
