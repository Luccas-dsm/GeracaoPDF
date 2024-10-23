import puppeteer, { Browser } from 'puppeteer';

export class GeradorPdfService {
    private browser!: Browser;

    constructor() {
        this.initBrowser();
    }

    private async initBrowser(): Promise<void> {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: true, // Modo sem interface gráfica
                args: ['--no-sandbox', '--disable-setuid-sandbox'] // Otimizações
            });
        }
    }

    public async gerarPdf(url: string): Promise<Buffer> {
        await this.initBrowser();
        let page;
        try {
            // Reutilizar a instância do navegador
            page = await this.browser.newPage();

            // Abrir a URL
            await page.goto(url, { waitUntil: 'networkidle2' });

            // Gerar PDF
            const pdfBuffer: Buffer = await page.pdf({
                margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                printBackground: true,
                format: 'A4',
            }) as Buffer; // Garante que o retorno seja um Buffer

            return pdfBuffer;
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            throw new Error('Falha ao gerar PDF');
        } finally {
            if (page) {
                await page.close(); // Fechar a página para liberar memória
            }
        }
    }

    // Fechar o navegador quando não for mais necessário
    public async closeBrowser(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
