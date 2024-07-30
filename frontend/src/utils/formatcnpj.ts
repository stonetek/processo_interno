export function formatarCNPJ(cnpj: string): string {
    // Remove caracteres não numéricos do CNPJ
    cnpj = cnpj.replace(/\D/g, '');

    // Aplica a formatação do CNPJ (XX.XXX.XXX/YYYY-ZZ)
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}
