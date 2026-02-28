import {
    Box,
    Typography,
    Card,
    CardContent,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Divider,
    Link,
} from '@mui/material';
import {
    MenuBook,
    Code,
    Security,
    Speed,
    Info,
    Http,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../components/_layouts/PageLayout';
import CodeBlock from './components/CodeBlock';
import SectionTitle from './components/SectionTitle';

const ApiDocsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <PageLayout titleKey="pageTitles.apiDocs">
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <MenuBook color="primary" />
                <Typography variant="h4" fontWeight={700}>
                    {t('app.apiDocs.title')}
                </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {t('app.apiDocs.subtitle')}
            </Typography>

            {/* Getting Started */}
            <Card sx={{ boxShadow: 3, mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionTitle icon={<Info color="primary" />}>
                        {t('app.apiDocs.gettingStarted')}
                    </SectionTitle>
                    <Alert severity="info" sx={{ mb: 3 }}>
                        <Typography variant="body2">
                            {t('app.apiDocs.gettingStartedDesc')}{' '}
                            <Link
                                component="button"
                                variant="body2"
                                fontWeight={600}
                                onClick={() => navigate('/app/keys')}
                                sx={{ verticalAlign: 'baseline' }}
                            >
                                {t('app.apiDocs.gettingStartedLink')}
                            </Link>.
                        </Typography>
                    </Alert>

                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        {t('app.apiDocs.baseUrl')}:
                    </Typography>
                    <CodeBlock inline>{'https://api-tts.joaquincatanzariti.com'}</CodeBlock>

                    <Box sx={{ mt: 4 }} />

                    {/* Authentication */}
                    <SectionTitle icon={<Security color="primary" />}>
                        {t('app.apiDocs.authentication')}
                    </SectionTitle>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {t('app.apiDocs.authenticationDesc')}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        {t('app.apiDocs.headerFormat')}:
                    </Typography>
                    <CodeBlock>{'Authorization: Bearer YOUR_API_KEY'}</CodeBlock>
                </CardContent>
            </Card>

            {/* Endpoints */}
            <Card sx={{ boxShadow: 3, mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionTitle icon={<Http color="primary" />}>
                        {t('app.apiDocs.endpoints')}
                    </SectionTitle>

                    {/* POST /api/tts/synthesize */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Chip label="POST" color="success" size="small" sx={{ fontWeight: 700, fontFamily: 'monospace' }} />
                            <Typography variant="body1" fontWeight={600} fontFamily="monospace">
                                /api/tts/synthesize
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {t('app.apiDocs.synthesizeDesc')}
                        </Typography>

                        {/* Request body table */}
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            {t('app.apiDocs.requestBody')}
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>{t('app.apiDocs.field')}</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>{t('app.apiDocs.type')}</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>{t('app.apiDocs.required')}</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>{t('app.apiDocs.description')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><code>refAudio</code></TableCell>
                                        <TableCell><code>file</code></TableCell>
                                        <TableCell><Chip label={t('app.apiDocs.yes')} color="error" size="small" variant="outlined" /></TableCell>
                                        <TableCell>{t('app.apiDocs.fieldRefAudio')}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><code>refText</code></TableCell>
                                        <TableCell><code>string</code></TableCell>
                                        <TableCell><Chip label={t('app.apiDocs.no')} color="default" size="small" variant="outlined" /></TableCell>
                                        <TableCell>{t('app.apiDocs.fieldRefText')}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><code>genText</code></TableCell>
                                        <TableCell><code>string</code></TableCell>
                                        <TableCell><Chip label={t('app.apiDocs.yes')} color="error" size="small" variant="outlined" /></TableCell>
                                        <TableCell>{t('app.apiDocs.fieldGenText')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Responses */}
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            {t('app.apiDocs.responses')}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Chip label="200" color="success" size="small" sx={{ fontFamily: 'monospace', fontWeight: 700 }} />
                                <Typography variant="body2">{t('app.apiDocs.successResponse')}</Typography>
                            </Box>
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            {t('app.apiDocs.errorResponses')}
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                            <Table size="small">
                                <TableBody>
                                    {[
                                        { code: '400', color: 'warning' as const, key: 'error400' },
                                        { code: '401', color: 'error' as const, key: 'error401' },
                                        { code: '429', color: 'warning' as const, key: 'error429' },
                                        { code: '500', color: 'error' as const, key: 'error500' },
                                    ].map(({ code, color, key }) => (
                                        <TableRow key={code}>
                                            <TableCell sx={{ width: 80 }}>
                                                <Chip label={code} color={color} size="small" sx={{ fontFamily: 'monospace', fontWeight: 700 }} />
                                            </TableCell>
                                            <TableCell>{t(`app.apiDocs.${key}`)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* cURL example */}
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            {t('app.apiDocs.curlExample')}
                        </Typography>
                        <CodeBlock>{`curl -X POST https://api-tts.joaquincatanzariti.com/api/tts/synthesize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "refAudio=@reference.wav" \\
  -F "refText=Hola, este es un texto de referencia." \\
  -F "genText=Hola, este es un texto de prueba." \\
  --output output.wav`}</CodeBlock>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* GET /api/tts/queue-status */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Chip label="GET" color="primary" size="small" sx={{ fontWeight: 700, fontFamily: 'monospace' }} />
                            <Typography variant="body1" fontWeight={600} fontFamily="monospace">
                                /api/tts/queue-status
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {t('app.apiDocs.queueStatusDesc')}
                        </Typography>

                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            {t('app.apiDocs.queueResponse')}
                        </Typography>
                        <CodeBlock>{`{
  "queueLength": 0,     // ${t('app.apiDocs.queueLength')}
  "isProcessing": false // ${t('app.apiDocs.isProcessing')}
}`}</CodeBlock>
                    </Box>
                </CardContent>
            </Card>

            {/* Rate Limiting */}
            <Card sx={{ boxShadow: 3, mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionTitle icon={<Speed color="primary" />}>
                        {t('app.apiDocs.rateLimiting')}
                    </SectionTitle>
                    <Alert severity="warning">
                        <Typography variant="body2">
                            {t('app.apiDocs.rateLimitingDesc')}
                        </Typography>
                    </Alert>
                </CardContent>
            </Card>

            {/* Code Examples */}
            <Card sx={{ boxShadow: 3, mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionTitle icon={<Code color="primary" />}>
                        {t('app.apiDocs.codeExamples')}
                    </SectionTitle>

                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                        {t('app.apiDocs.pythonExample')}
                    </Typography>
                    <CodeBlock>{`import requests

url = "https://api-tts.joaquincatanzariti.com/api/tts/synthesize"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

with open("reference.wav", "rb") as audio_file:
    files = {"refAudio": ("reference.wav", audio_file, "audio/wav")}
    data = {"refText": "Texto dicho en el audio de referencia.", "genText": "Texto que quieres sintetizar."}
    
    response = requests.post(url, headers=headers, files=files, data=data)

if response.status_code == 200:
    with open("output.wav", "wb") as f:
        f.write(response.content)
    print("Audio saved to output.wav")
else:
    print(f"Error: {response.json()}")`}</CodeBlock>

                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, mt: 3 }}>
                        {t('app.apiDocs.jsExample')}
                    </Typography>
                    <CodeBlock>{`const fs = require('fs');
const FormData = require('form-data');

const form = new FormData();
form.append('refAudio', fs.createReadStream('reference.wav'));
form.append('refText', 'Texto dicho en el audio de referencia.');
form.append('genText', 'Texto que quieres sintetizar.');

const response = await fetch('https://api-tts.joaquincatanzariti.com/api/tts/synthesize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    ...form.getHeaders(),
  },
  body: form,
});

if (response.ok) {
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync('output.wav', buffer);
  console.log('Audio saved to output.wav');
} else {
  const error = await response.json();
  console.error('Error:', error);
}`}</CodeBlock>
                </CardContent>
            </Card>

            {/* Notes */}
            <Card sx={{ boxShadow: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionTitle icon={<Info color="primary" />}>
                        {t('app.apiDocs.notes')}
                    </SectionTitle>
                    <Box component="ul" sx={{ pl: 2, '& li': { mb: 1 } }}>
                        <li><Typography variant="body2">{t('app.apiDocs.note1')}</Typography></li>
                        <li><Typography variant="body2">{t('app.apiDocs.note2')}</Typography></li>
                        <li><Typography variant="body2">{t('app.apiDocs.note3')}</Typography></li>
                        <li><Typography variant="body2">{t('app.apiDocs.note4')}</Typography></li>
                    </Box>
                </CardContent>
            </Card>
        </PageLayout>
    );
};

export default ApiDocsPage;
