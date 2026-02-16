import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/diagnosis/',
});

export const getConditions = () => api.get('conditions/');
export const getConditionBySlug = (slug: string) => api.get(`conditions/${slug}/`);
export const sendFeedback = (slug: string, vote: 'up' | 'down') =>
    api.post(`conditions/${slug}/feedback/`, { vote });
export const checkSymptom = (symptoms: string) => api.post('check-symptom/', { symptoms });

export default api;
