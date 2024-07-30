export const formatarValor = (valor: number | null | undefined): string => {
    if (valor === null || valor === undefined) return '';
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };


  // Função para formatar o valor do contrato com "R$"
  export function formatarValorContrato(valor: string): string {
    const numero = parseFloat(valor);
    if (isNaN(numero)) {
        return ''; // Retorna uma string vazia se não for um número
    }
    const valorFormatado = numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5
    });
    return valorFormatado;
}


  