import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/diagnosis/';

const api = axios.create({
    baseURL: API_URL,
});

export const getConditions = () => api.get('conditions/');
export const getConditionBySlug = (slug: string) => api.get(`conditions/${slug}/`);
export const sendFeedback = (slug: string, vote: 'up' | 'down') =>
    api.post(`conditions/${slug}/feedback/`, { vote });
export const checkSymptom = (symptoms: string) => api.post('check-symptom/', { symptoms });

export default api;
