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
}
