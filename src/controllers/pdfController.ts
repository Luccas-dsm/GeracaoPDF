import { Request, Response } from 'express';
import { GeradorPdfService } from '../services/geradorPdfService';

export class PdfController {

    private geradorPdfService: GeradorPdfService;

    constructor(geradorPdfService: GeradorPdfService) {
        this.geradorPdfService = geradorPdfService;
    }

    async htmlToPdf(req: Request, res: Response): Promise<void> {
        try {
            const url = req.query.url as string; // Obtém a URL dos query params
            if (!url) {
                res.status(400).send('URL é obrigatória');
                return;
            }

            const pdfBuffer = await this.geradorPdfService.gerarPdf(url);

            // Configurar os cabeçalhos da resposta
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');

            // Enviar o buffer do PDF como resposta
            res.end(pdfBuffer);
        } catch (error) {
            res.status(500).send('Erro ao gerar PDF');
        }
    }

    async htmlFileToPdf(req: Request, res: Response): Promise<void> {
        try {
            const { htmlContent, cssContent } = req.body; // Recebe HTML e CSS no body da requisição

            if (!htmlContent) {
                res.status(400).send('HTML content is required');
                return;
            }
            let pdf = await this.geradorPdfService.generatePdfFromFile(htmlContent, cssContent);



            // Converte o buffer em Base64
            const pdfBase64 = pdf.toString('base64');

            // Configurar os cabeçalhos da resposta
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');

            // Enviar o Base64 do PDF como resposta
            res.send({ pdf: pdfBase64 });
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            res.status(500).send('Erro ao gerar PDF');
        }
    }
}

