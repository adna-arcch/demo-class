/**
 * Generates a valid, standards-compliant PDF 1.4 document in memory
 * and triggers a browser file download.
 */
function escapePdfText(input: string): string {
  return input
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

export function downloadGeneratedPdf(
  filename: string,
  title: string,
  subtitle: string,
  lines: string[]
): void {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  const streamCommands: string[] = [
    'BT',
    '/F2 18 Tf',
    '54 756 Td',
    `(${escapePdfText(title)}) Tj`,
    '/F1 11 Tf',
    '0 -22 Td',
    `(${escapePdfText(subtitle)}) Tj`,
    '0 -16 Td',
    '(--------------------------------------------------------------------------) Tj',
    '/F1 10 Tf',
  ];

  let currentY = 700;
  const maxLines = Math.min(lines.length, 38);

  for (let i = 0; i < maxLines; i++) {
    if (currentY < 60) break;
    const text = lines[i].slice(0, 88);
    streamCommands.push('0 -16 Td');
    streamCommands.push(`(${escapePdfText(text)}) Tj`);
    currentY -= 16;
  }

  streamCommands.push('0 -24 Td');
  streamCommands.push(
    `(${escapePdfText('ICT From ABC Academy  |  O/L & A/L ICT Examination Resource')}) Tj`
  );
  streamCommands.push('ET');

  const contentStream = streamCommands.join('\n');

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n',
    `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
