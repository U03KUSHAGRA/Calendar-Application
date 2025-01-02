// src/utils/utils.js
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const isOverdue = (date) => {
    return new Date(date) < new Date();
  };
  
  export const isDueToday = (date) => {
    return new Date(date).toDateString() === new Date().toDateString();
  };