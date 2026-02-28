import { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';

interface CodeBlockProps {
  children: string;
  inline?: boolean;
}

const CodeBlock = ({ children, inline = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ position: 'relative', '&:hover .copy-btn': { opacity: 1 } }}>
      <Box
        component="pre"
        sx={{
          bgcolor: '#1e1e2e',
          color: '#cdd6f4',
          p: inline ? '10px 44px 10px 16px' : '16px 44px 16px 20px',
          borderRadius: 1.5,
          overflow: 'auto',
          fontSize: '0.82rem',
          fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
          lineHeight: 1.6,
          border: '1px solid',
          borderColor: 'rgba(205, 214, 244, 0.1)',
          m: 0,
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(205, 214, 244, 0.2)', borderRadius: 3 },
        }}
      >
        <code>{children}</code>
      </Box>
      <Tooltip title={copied ? '¡Copiado!' : 'Copiar'}>
        <IconButton
          className="copy-btn"
          size="small"
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            opacity: 0,
            transition: 'opacity 0.2s',
            color: copied ? 'success.light' : 'rgba(205, 214, 244, 0.6)',
            '&:hover': { color: '#cdd6f4', bgcolor: 'rgba(205, 214, 244, 0.1)' },
          }}
        >
          {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CodeBlock;
