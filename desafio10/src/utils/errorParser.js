// ** Translate error message to Pt-BR

export default function errorParser(message) {
  const error = {
    'You do not have permission to deliver this delivery':
      'Você não tem permissão para entregar esta encomenda',
    'Exceeded limit of 5 orders per day':
      'Excedido o limite de 5 encomendas por dia',
    'The start date must be between 08:00 and 18:00':
      'A data de início deve estar entre 08:00 e 18:00',
    'The end date cannot be before start date':
      'A data de término não pode ser antes da data de início',
    'Cannot create new orders with past date':
      'Não é possível criar novas encomendas com data passada',
  };
  return error[message] || message;
}
