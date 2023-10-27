export const priorities = [
  {value: '2', label: 'Muito alta', borderColor: 'border-red-600', bgColor: 'bg-red-600', textColor: 'text-white'},
  {value: '1', label: 'Alta', borderColor: 'border-yellow-600', bgColor: 'bg-yellow-600', textColor: 'text-gray-900'},
  {value: '0', label: 'Normal', borderColor: 'border-gray-400', bgColor: 'bg-gray-600', textColor: 'text-white'},
  {value: '-1', label: 'Baixa', borderColor: 'border-blue-600', bgColor: 'bg-blue-600', textColor: 'text-white'},
  {value: '-2', label: 'Muito baixa', borderColor: 'border-cyan-600', bgColor: 'bg-cyan-300', textColor: 'text-gray-900'},
]

export const statuses = [
  {value: 'all', label: 'Todas as tarefas', done: [true, false]},
  {value: 'only-undone', label: 'Apenas tarefas não concluídas', done: [false]},
  {value: 'only-done', label: 'Apenas tarefas concluídas', done: [true]},
]