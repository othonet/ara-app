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
  brazilTime.setHours(0, 0, 0, 0)
  
  // Criar uma string ISO da data em Brasília e converter para UTC
  // Formato: YYYY-MM-DDTHH:mm:ss
  const year = brazilTime.getFullYear()
  const month = String(brazilTime.getMonth() + 1).padStart(2, '0')
  const day = String(brazilTime.getDate()).padStart(2, '0')
  
  // Criar uma data assumindo que é meia-noite em Brasília
  // O offset de Brasília é UTC-3 (ou UTC-2 durante horário de verão)
  // Vamos usar uma abordagem mais simples: criar a data e ajustar pelo offset
  const dateStr = `${year}-${month}-${day}T00:00:00`
  
  // Usar Intl para obter o offset correto
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    timeZoneName: 'longOffset',
  })
  
  // Criar uma data de referência para calcular o offset
  const testDate = new Date(`${year}-${month}-${day}T12:00:00Z`)
  const brazilTest = toBrazilTime(testDate)
  const utcTest = new Date(testDate.toISOString())
  
  // Calcular offset em horas (geralmente -3 para Brasília)
  const offsetHours = (utcTest.getHours() - brazilTest.getHours() + 24) % 24
  
  // Criar a data UTC que corresponde à meia-noite em Brasília
  const utcMidnight = new Date(`${year}-${month}-${day}T${String(offsetHours).padStart(2, '0')}:00:00Z`)
  
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

