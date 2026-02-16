import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, IconButton, Button, InputBase, CircularProgress } from '@mui/material';
import {
    InfoOutlined, Search
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getConditions, checkSymptom } from '../services/api';
import ReactMarkdown from 'react-markdown';

interface Condition {
    name: string;
    slug: string;
    scientific_corner_text: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [loading, setLoading] = useState(true);

    // Symptom Checker State
    const [symptomInput, setSymptomInput] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState<{ advice: string; sources: any[] } | null>(null);

    useEffect(() => {
        const fetchConditions = async () => {
            try {
                const response = await getConditions();
                setConditions(response.data);
            } catch (error) {
                console.error("Error fetching conditions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConditions();
    }, []);

    const handleSymptomCheck = async () => {
        if (!symptomInput.trim()) return;

        setAnalyzing(true);
        setAiResult(null);
        try {
            const response = await checkSymptom(symptomInput);
            setAiResult(response.data);
        } catch (error) {
            console.error("Error checking symptoms:", error);
            setAiResult({
                advice: "Bir hata oluştu. Lütfen tekrar deneyin.",
                sources: []
            });
        } finally {
            setAnalyzing(false);
        }
    };



    const getSubtitle = (slug: string) => {
        const subtitles: { [key: string]: string } = {
            'asiri-gaz-sikismasi': 'Hızlı rahatlama yöntemleri ve öneriler',
            'ishal': 'Sıvı kaybını önle ve toparlan',
            'kabizlik': 'Hareketler ve doğal destekler',
            'mide-yanmasi': 'Anlık rahatlama ipuçları',
            'mide-bulantisi': 'Bulantıyı baskılayıcı teknikler',
            'gastrit': 'Mide koruma ve iyileştirme protokolü'
        };
        return subtitles[slug] || 'Detaylı bilgi ve öneriler';
    };

    const getKeywords = (slug: string) => {
        const keywords: { [key: string]: string[] } = {
            'asiri-gaz-sikismasi': ['gaz', 'şişkinlik', 'karın ağrısı', 'sıkışma'],
            'ishal': ['ishal', 'sıvı kaybı', 'karın ağrısı', 'su', 'bağırsak'],
            'kabizlik': ['kabızlık', 'hareketsizlik', 'lif', 'kaka', 'dışkılama'],
            'mide-yanmasi': ['mide yanması', 'reflü', 'yanma', 'asit', 'ekşime'],
            'mide-bulantisi': ['bulantı', 'kusma', 'mide', 'halsizlik'],
            'gastrit': ['gastrit', 'mide ağrısı', 'yanma', 'şişkinlik']
        };
        return keywords[slug] || [];
    };

    const filteredConditions = conditions.filter(condition => {
        const lowerSearch = searchTerm.toLowerCase();
        const keywords = getKeywords(condition.slug);
        const subtitle = getSubtitle(condition.slug);

        return condition.name.toLowerCase().includes(lowerSearch) ||
            subtitle.toLowerCase().includes(lowerSearch) ||
            keywords.some(k => k.toLowerCase().includes(lowerSearch));
    });

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navbar - Transparent for Background Continuity */}



            <Container maxWidth="sm" sx={{ flex: 1, pt: 4, pb: 6 }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 5,
                        pt: 2,
                        animation: 'fadeInUp 0.5s ease-out',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#094f4a', // White
                            mb: 1,
                            fontSize: { xs: '2rem', sm: '2.5rem' },
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.2,
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)' // Text shadow for readability
                        }}
                    >
                        Yapay Zeka Semptom Analizi<br />

                    </Typography>
                    <Typography
                        sx={{
                            color: '#ffffff', // White
                            letterSpacing: '0.02em',
                            fontSize: '1rem',
                            fontWeight: 600,
                            maxWidth: '80%',
                            mx: 'auto',
                            mb: 3,
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                        }}
                    >
                        Herkes İçin, Her Yerden Erişilebilir Sağlık
                    </Typography>

                    {/* AI Symptom Checker */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            mb: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.65)', // More transparent
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(19, 78, 74, 0.2)',
                            borderRadius: '24px',
                            textAlign: 'left',
                            boxShadow: '0 8px 32px rgba(19, 78, 74, 0.1)'
                        }}
                    >

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#856404' }}>
                                Yapay Zeka Semptom Analizi
                            </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 2, color: '#475569' }}>
                            Şikayetlerinizi kısaca yazın, yapay zeka sizin için olası nedenleri ve önerileri listelesin.
                        </Typography>

                        <InputBase
                            sx={{
                                width: '100%',
                                p: 2,
                                border: '1px solid #cbd5e1',
                                borderRadius: '16px',
                                bgcolor: 'white',
                                color: '#0f172a',
                                mb: 2,
                                fontSize: '0.95rem'
                            }}
                            placeholder="Örn: Karnım ağrıyor ve yemekten sonra şişkinlik oluyor..."
                            multiline
                            minRows={3}
                            value={symptomInput}
                            onChange={(e) => setSymptomInput(e.target.value)}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            disabled={analyzing || !symptomInput.trim()}
                            onClick={handleSymptomCheck}
                            sx={{
                                borderRadius: '12px',
                                py: 1.5,
                                fontWeight: 700,
                                textTransform: 'none',
                                color: '#000000',
                                boxShadow: '0 4px 12px rgba(19, 78, 74, 0.2)'
                            }}
                        >
                            {analyzing ? <CircularProgress size={24} color="inherit" /> : 'Analiz Et'}
                        </Button>

                        {/* AI Result Area */}
                        {aiResult && (
                            <Box sx={{ mt: 3, p: 2, bgcolor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', animation: 'fadeInUp 0.3s ease-out' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#856404', mb: 2 }}>
                                    Değerlendirme Sonucu:
                                </Typography>

                                <Box sx={{ color: '#533f03', '& strong': { color: '#856404' } }}>
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ node, ...props }: any) => <Typography variant="h5" sx={{ fontWeight: 900, color: '#856404', mt: 2, mb: 1 }} {...props} />,
                                            h2: ({ node, ...props }: any) => <Typography variant="h6" sx={{ fontWeight: 800, color: '#856404', mt: 2, mb: 1 }} {...props} />,
                                            strong: ({ node, ...props }: any) => <strong style={{ fontWeight: 800, color: '#533f03' }} {...props} />,
                                            li: ({ node, ...props }: any) => (
                                                <li style={{ marginBottom: '8px' }}>
                                                    <Typography component="span" variant="body2" sx={{ color: '#334155' }} {...props} />
                                                </li>
                                            ),
                                            p: ({ node, ...props }: any) => <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.7 }} {...props} />
                                        }}
                                    >
                                        {aiResult.advice}
                                    </ReactMarkdown>
                                </Box>

                                {aiResult.sources.length > 0 && (
                                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>
                                            Referans Kaynaklar:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                                            {aiResult.sources.map((source: any, idx: number) => (
                                                <Box key={idx} sx={{ bgcolor: '#f1f5f9', px: 1, py: 0.5, borderRadius: '4px', fontSize: '0.7rem', color: '#475569' }}>
                                                    {source.title}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Paper>

                    {/* Functional Search Bar */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: 400,
                            mx: 'auto',
                            border: '1px solid #e2e8f0',
                            borderRadius: '50px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease',
                            '&:focus-within': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 24px rgba(19, 78, 74, 0.15)',
                                borderColor: 'rgba(19, 78, 74, 0.3)',
                            },
                        }}
                    >
                        <IconButton sx={{ p: '10px', color: '#94a3b8' }} aria-label="search">
                            <Search />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: '#334155' }}
                            placeholder="Semptom veya rahatsızlık ara..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            sx={{ borderRadius: '50px', m: 0.5, px: 3 }}
                            onClick={() => {
                                // Optional: Scroll to results or handle analytics
                            }}
                        >
                            Ara
                        </Button>
                    </Paper>
                </Box>

                {/* Category Cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : filteredConditions.length > 0 ? (
                        filteredConditions.map((condition, index) => (
                            <Paper
                                key={condition.slug}
                                onClick={() => navigate(`/detail/${condition.slug}`)}
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    cursor: 'pointer',
                                    background: '#ffffff', // Clean white card
                                    border: '1px solid #e2e8f0', // Very subtle border
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2.5,
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.08 + 0.2}s both`,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 10px 20px -3px rgba(19, 78, 74, 0.12)',
                                        borderColor: 'rgba(19, 78, 74, 0.3)',
                                    },
                                }}
                            >
                                {/* Text Content */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography
                                        sx={{
                                            color: '#856404', // Dark Gold
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        {condition.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#533f03', // Darker Gold/Brown
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            mt: 0.2,
                                        }}
                                    >
                                        {getSubtitle(condition.slug)}
                                    </Typography>
                                </Box>
                            </Paper>
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 4, color: '#94a3b8' }}>
                            <InfoOutlined sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                            <Typography>Aradığınız kriterlere uygun sonuç bulunamadı.</Typography>
                        </Box>
                    )}
                </Box>

                {/* Footer/Disclaimer */}
                <Box
                    sx={{
                        mt: 8,
                        textAlign: 'center',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        pt: 4
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                        <InfoOutlined sx={{ fontSize: 16, color: '#000000' }} />
                        <Typography sx={{ color: '#000000', fontSize: '0.75rem', fontWeight: 900 }}>
                            Tıbbi Uyarı
                        </Typography>
                    </Box>
                    <Typography sx={{ color: '#000000', fontSize: '0.75rem', fontWeight: 700, maxWidth: '300px', mx: 'auto' }}>
                        Bu uygulama tıbbi tavsiye niteliği taşımaz. Acil durumlarda mutlaka bir sağlık kuruluşuna başvurunuz.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
