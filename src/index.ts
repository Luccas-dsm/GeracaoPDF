import express, { Request, Response } from 'express';
import { PdfController } from './controllers/pdfController';
import { GeradorPdfService } from './services/geradorPdfService';

const app = express();
const port = 3000;
const geradorPdfService = new GeradorPdfService();
const pdfController = new PdfController(geradorPdfService);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express com TypeScript funcionando!');
});
app.get('/html-to-pdf', (req: Request, res: Response) => {
  pdfController.htmlToPdf(req, res);
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});



