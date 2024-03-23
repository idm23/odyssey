// AddWorkoutModal.js
import React, { useState } from 'react';

function AddWorkoutModal({ onClose }) {
  const [exerciseBlocks, setExerciseBlocks] = useState([createEmptyExerciseBlock()]);

  function createEmptyExerciseBlock() {
    return { exercises: [createEmptyExercise()] };
  }

  function createEmptyExercise() {
    return { name: '', sets: [{ reps: 0, weight: 0 }] };
  }

  const addExerciseBlock = () => {
    setExerciseBlocks([...exerciseBlocks, createEmptyExerciseBlock()]);
  };

  const addExercise = (blockIndex) => {
    const newBlocks = [...exerciseBlocks];
    newBlocks[blockIndex].exercises.push(createEmptyExercise());
    setExerciseBlocks(newBlocks);
  };

  const addSet = (blockIndex, exerciseIndex) => {
    const newBlocks = [...exerciseBlocks];
    newBlocks[blockIndex].exercises[exerciseIndex].sets.push({ reps: 0, weight: 0 });
    setExerciseBlocks(newBlocks);
  };

  // Function to submit the workout
  const submitWorkout = () => {
    console.log(exerciseBlocks);
    // Submit logic here...
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Workout</h2>
        {exerciseBlocks.map((block, blockIndex) => (
          <div key={blockIndex}>
            <h3>Exercise Block {blockIndex + 1}</h3>
            {block.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex}>
                <input
                  type="text"
                  placeholder="Exercise name"
                  value={exercise.name}
                  onChange={(e) => {
                    const newBlocks = [...exerciseBlocks];
                    newBlocks[blockIndex].exercises[exerciseIndex].name = e.target.value;
                    setExerciseBlocks(newBlocks);
                  }}
                />
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex}>
                    <input
                      type="number"
                      placeholder="Reps"
                      value={set.reps}
                      onChange={(e) => {
                        const newBlocks = [...exerciseBlocks];
                        newBlocks[blockIndex].exercises[exerciseIndex].sets[setIndex].reps = parseInt(e.target.value, 10);
                        setExerciseBlocks(newBlocks);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Weight"
                      value={set.weight}
                      onChange={(e) => {
                        const newBlocks = [...exerciseBlocks];
                        newBlocks[blockIndex].exercises[exerciseIndex].sets[setIndex].weight = parseInt(e.target.value, 10);
                        setExerciseBlocks(newBlocks);
                      }}
                    />
                  </div>
                ))}
                <button onClick={() => addSet(blockIndex, exerciseIndex)}>Add Set</button>
              </div>
            ))}
            <button onClick={() => addExercise(blockIndex)}>Add Exercise</button>
          </div>
        ))}
        <button onClick={addExerciseBlock}>Add Exercise Block</button>
        <button onClick={submitWorkout}>Submit Workout</button>
      </div>
    </div>
    )
}

export default AddWorkoutModal;