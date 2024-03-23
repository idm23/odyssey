// Journal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddWorkoutModal from './AddWorkoutModal';

function Journal({ userId }) {
  const [workouts, setWorkouts] = useState([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios.get(`http://localhost:5000/workouts/${userId}`);
      setWorkouts(response.data);
    };
    fetchWorkouts();
  }, [userId]);

  // Function to toggle the modal
  const toggleAddWorkout = () => {
    setShowAddWorkout(!showAddWorkout);
    console.log(showAddWorkout)
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Workouts</h2>
      <button onClick={toggleAddWorkout} className="bg-blue-500 text-white p-2 rounded">
        Add Workout
      </button>
      {showAddWorkout && <AddWorkoutModal onClose={toggleAddWorkout} />}
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div key={index} className="bg-white shadow overflow-hidden rounded-lg p-4">
            <div className="font-bold text-lg">{new Date(workout.date).toLocaleDateString()}</div>
            <p className="text-gray-700">{workout.description}</p>
            {workout.blocks && workout.blocks.map((block, idx) => (
              <div key={idx} className="mt-2">
                <div className="font-semibold">{block.name}</div>
                <ul className="list-disc list-inside">
                  {block.exercises.map((exercise, eIdx) => (
                    <li key={eIdx} className="text-gray-600">
                      {exercise.type} - Details: {JSON.stringify(exercise.details)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;
