export class StringService {
  public static StringFormat(template: string, ...args: any[]): string {
    return template.replace(/{(\d+)}/g, (match, index) => args[index] || "");
  }
}
