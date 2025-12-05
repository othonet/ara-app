// Fuso horário do Brasil (São Paulo)
export const TIMEZONE = 'America/Sao_Paulo'

/**
 * Converte uma data UTC para o fuso horário de São Paulo
 * Retorna um objeto Date com a hora local de Brasília
 */
export function toBrazilTime(date: Date): Date {
  // Usar Intl.DateTimeFormat para converter para o fuso horário de Brasília
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  
  const parts = formatter.formatToParts(date)
  const year = parseInt(parts.find(p => p.type === 'year')!.value)
  const month = parseInt(parts.find(p => p.type === 'month')!.value) - 1 // month é 0-indexed
  const day = parseInt(parts.find(p => p.type === 'day')!.value)
  const hour = parseInt(parts.find(p => p.type === 'hour')!.value)
  const minute = parseInt(parts.find(p => p.type === 'minute')!.value)
  const second = parseInt(parts.find(p => p.type === 'second')!.value)
  
  return new Date(year, month, day, hour, minute, second)
}

/**
 * Obtém a hora local de uma data (considerando fuso horário de São Paulo)
 */
export function getLocalHours(date: Date): number {
  const brazilTime = toBrazilTime(date)
  return brazilTime.getHours()
}

/**
 * Obtém o início do dia no fuso horário de São Paulo
 * Retorna uma data UTC que representa o início do dia em Brasília
 */
export function getStartOfDayInBrazil(date: Date = new Date()): Date {
  // Obter a data atual no fuso horário de Brasília
  const brazilTime = toBrazilTime(date)
  const year = brazilTime.getFullYear()
  const month = brazilTime.getMonth()
  const day = brazilTime.getDate()
  
  // Criar uma data representando meia-noite em Brasília (como se fosse local)
  const midnightBrazil = new Date(year, month, day, 0, 0, 0, 0)
  
  // Calcular o offset entre UTC e o fuso horário de Brasília
  // Criar uma data de teste para calcular o offset
  const testDate = new Date()
  const utcHours = testDate.getUTCHours()
  const brazilHours = getLocalHours(testDate)
  
  // Calcular offset (pode ser -3 ou -2 dependendo do horário de verão)
  let offsetHours = utcHours - brazilHours
  if (offsetHours < 0) offsetHours += 24
  if (offsetHours > 12) offsetHours -= 24
  
  // Ajustar a data para UTC (adicionar o offset)
  const utcMidnight = new Date(midnightBrazil.getTime() - (offsetHours * 60 * 60 * 1000))
  
  return utcMidnight
}

/**
 * Formata uma data no fuso horário de São Paulo
 */
export function formatInBrazilTime(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: TIMEZONE,
    ...options,
  }).format(date)
}
