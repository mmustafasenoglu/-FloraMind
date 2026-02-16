import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Paper, IconButton,
    List, ListItem, ListItemIcon, ListItemText,
    CircularProgress, Snackbar, Alert
} from '@mui/material';
import {
    ArrowBack, DirectionsRun, Kitchen, HighlightOff, Biotech,
    ThumbUp, ThumbDown, WarningAmber
} from '@mui/icons-material';
import { getConditionBySlug, sendFeedback } from '../services/api';

interface Condition {
    name: string;
    emergency_action_title: string;
    emergency_action_steps: string[];
    kitchen_pharmacy: { food: string; mechanism: string }[];
    forbidden_zone: string[];
    scientific_corner_text: string;
}

// Unified eHealth style section colors (Blue/White theme)
const sectionStyles = {
    emergency: {
        iconColor: '#2563eb', // Royal Blue
        iconBg: 'rgba(37, 99, 235, 0.1)',
        borderColor: '#bfdbfe',
    },
    kitchen: {
        iconColor: '#059669', // Emerald Green (kept for context but decorative only) -> actually user said "arayuz renkleri bunun gibi olsun", implying uniform blue. I will make them all Blue-based to be safe and professional, distinguishing by icon.
        // Re-reading: "arayuz rewnklerı bunun gıbı oolsun" -> User wants the interface like the image (Blue).
        // I will use Blue for everything to be safe and strictly follow "eHealth" look.
        iconColor: '#2563eb',
        iconBg: 'rgba(37, 99, 235, 0.1)',
        borderColor: '#bfdbfe',
    },
    forbidden: {
        iconColor: '#2563eb',
        iconBg: 'rgba(37, 99, 235, 0.1)',
        borderColor: '#bfdbfe',
    },
    science: {
        iconColor: '#2563eb',
        iconBg: 'rgba(37, 99, 235, 0.1)',
        borderColor: '#bfdbfe',
    },
};

const ConditionDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [condition, setCondition] = useState<Condition | null>(null);
    const [loading, setLoading] = useState(true);
    const [voted, setVoted] = useState<'up' | 'down' | null>(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (slug) {
            getConditionBySlug(slug)
                .then((res) => setCondition(res.data))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
            }}>
                <CircularProgress sx={{ color: '#2563eb' }} />
            </Box>
        );
    }

    if (!condition) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                gap: 2,
                backgroundColor: '#ffffff',
            }}>
                <Typography variant="h6" sx={{ color: '#64748b' }}>
                    Durum bulunamadı
                </Typography>
                <IconButton onClick={() => navigate('/')} sx={{ color: '#2563eb' }}>
                    <ArrowBack />
                </IconButton>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 3, px: 2, backgroundColor: '#ffffff' }}>
            <Container maxWidth="sm">
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                    animation: 'fadeInUp 0.4s ease-out',
                }}>
                    <IconButton
                        onClick={() => navigate('/')}
                        sx={{
                            color: '#1e3a8a',
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            backgroundColor: '#f1f5f9',
                            '&:hover': {
                                color: '#2563eb',
                                backgroundColor: '#e2e8f0',
                            },
                        }}
                    >
                        <ArrowBack sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Typography
                        sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            fontWeight: 800,
                            color: '#1e3a8a', // Dark Navy
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            letterSpacing: '-0.01em',
                            pr: 5,
                        }}
                    >
                        {condition.name.toUpperCase()}
                    </Typography>
                </Box>

                {/* 1. ACİL EYLEM */}
                <SectionCard
                    icon={<DirectionsRun />}
                    title={`ACİL EYLEM: ${condition.emergency_action_title}`}
                    delay={0.1}
                >
                    <List dense sx={{ py: 0 }}>
                        {condition.emergency_action_steps.map((step, i) => (
                            <ListItem key={i} sx={{ px: 0, py: 0.8 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <Box sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                        color: '#2563eb',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                    }}>
                                        {i + 1}
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={step}
                                    primaryTypographyProps={{
                                        sx: {
                                            color: '#334155',
                                            lineHeight: 1.6,
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </SectionCard>

                {/* 2. MUTFAK ECZANESİ */}
                <SectionCard
                    icon={<Kitchen />}
                    title="MUTFAK ECZANESİ"
                    delay={0.2}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {condition.kitchen_pharmacy.map((item, i) => (
                            <Box key={i} sx={{
                                p: 2,
                                borderRadius: '12px',
                                backgroundColor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                            }}>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: '#1e3a8a', // Dark Navy
                                        mb: 0.5,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {item.food} {/* Removed 🌿 emoji */}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#475569',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {item.mechanism}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </SectionCard>

                {/* 3. YASAK BÖLGE */}
                <SectionCard
                    icon={<HighlightOff />}
                    title="YASAK BÖLGE"
                    delay={0.3}
                >
                    <List dense sx={{ py: 0 }}>
                        {condition.forbidden_zone.map((item, i) => (
                            <ListItem key={i} sx={{ px: 0, py: 0.6, alignItems: 'flex-start' }}>
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.3 }}>
                                    <WarningAmber sx={{ fontSize: 18, color: '#ef4444' }} /> {/* Red warning icon is essential, but removed emoji */}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item}
                                    primaryTypographyProps={{
                                        sx: {
                                            color: '#334155',
                                            lineHeight: 1.6,
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </SectionCard>

                {/* 4. BİLİMSEL KÖŞE */}
                <SectionCard
                    icon={<Biotech />}
                    title="BİLİMSEL KÖŞE"
                    delay={0.4}
                >
                    <Typography
                        sx={{
                            color: '#475569',
                            fontStyle: 'italic',
                            lineHeight: 1.8,
                            fontSize: '0.85rem',
                        }}
                    >
                        {condition.scientific_corner_text}
                    </Typography>
                </SectionCard>

                {/* Feedback */}
                <Box
                    sx={{
                        mt: 2,
                        mb: 4,
                        p: 2.5,
                        borderRadius: '16px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        animation: 'fadeInUp 0.5s ease-out 0.4s both',
                    }}
                >
                    <Typography sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                        Bu bilgi işe yaradı mı?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            size="small"
                            disabled={voted !== null || submitting}
                            onClick={() => {
                                if (!slug) return;
                                setSubmitting(true);
                                sendFeedback(slug, 'up').then(() => {
                                    setVoted('up');
                                    setSnackOpen(true);
                                }).finally(() => setSubmitting(false));
                            }}
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '10px',
                                color: voted === 'up' ? '#10b981' : '#94a3b8',
                                backgroundColor: voted === 'up' ? '#ecfdf5' : 'transparent',
                                '&:hover': { backgroundColor: '#ecfdf5', color: '#10b981' },
                            }}
                        >
                            <ThumbUp sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            disabled={voted !== null || submitting}
                            onClick={() => {
                                if (!slug) return;
                                setSubmitting(true);
                                sendFeedback(slug, 'down').then(() => {
                                    setVoted('down');
                                    setSnackOpen(true);
                                }).finally(() => setSubmitting(false));
                            }}
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '10px',
                                color: voted === 'down' ? '#ef4444' : '#94a3b8',
                                backgroundColor: voted === 'down' ? '#fef2f2' : 'transparent',
                                '&:hover': { backgroundColor: '#fef2f2', color: '#ef4444' },
                            }}
                        >
                            <ThumbDown sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Snackbar */}
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setSnackOpen(false)}
                        severity="success"
                        variant="filled"
                        sx={{ borderRadius: '14px', fontWeight: 600, backgroundColor: '#2563eb' }}
                    >
                        Teşekkürler! Geri bildiriminiz kaydedildi.
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

/* Reusable Section Card - Clean White Style */
interface SectionCardProps {
    icon: React.ReactNode;
    title: string;
    delay: number;
    children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, title, delay, children }) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            mb: 2,
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0', // Subtle border
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            animation: `fadeInUp 0.5s ease-out ${delay}s both`,
            '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.08)',
                borderColor: '#bfdbfe',
            },
            transition: 'all 0.3s ease',
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, gap: 1.5 }}>
            <Box sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(37, 99, 235, 0.08)', // Light Blue Icon Bg
                color: '#2563eb', // Primary Blue Icon
            }}>
                {icon}
            </Box>
            <Typography
                sx={{
                    fontWeight: 700,
                    color: '#1e3a8a', // Dark Navy Title
                    fontSize: '0.95rem',
                    letterSpacing: '-0.01em',
                }}
            >
                {title}
            </Typography>
        </Box>
        {children}
    </Paper>
);

export default ConditionDetail;
