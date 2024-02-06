import React, { createContext, useContext, useState } from 'react';

const LikedExercisesContext = createContext();

export const useLikedExercisesContext = () => {
  return useContext(LikedExercisesContext);
};

export const LikedExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  const addExercise = (exercise) => {
    setExercises((prevExercises) => [...prevExercises, exercise]);
  };

  const removeExercise = (exerciseIdToRemove) => {
    setExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== exerciseIdToRemove)
    );
  };

  const contextValue = {
    exercises,
    addExercise,
    removeExercise,
  };

  return (
    <LikedExercisesContext.Provider value={contextValue}>
      {children}
    </LikedExercisesContext.Provider>
  );
};
