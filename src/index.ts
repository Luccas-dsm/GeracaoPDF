import express, { Request, Response } from 'express';
import { PdfController } from './controllers/pdfController';
import { GeradorPdfService } from './services/geradorPdfService';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const geradorPdfService = new GeradorPdfService();
const pdfController = new PdfController(geradorPdfService);


app.use(express.json({limit:'10mb'})); // for incoming Request Object as json

app.use(express.urlencoded({limit:'10mb', extended: true })); // for content-type = application/ x-www-form-urlencoded
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express com TypeScript funcionando!');
});

app.get('/html-to-pdf', (req: Request, res: Response) => {
  pdfController.htmlToPdf(req, res);
});

app.post('/htmlFileToPdf', (req:Request, res:Response)=>{

  console.log(`Tamanho do body: ${JSON.stringify(req.body).length} bytes`);

  pdfController.htmlFileToPdf(req,res);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});



