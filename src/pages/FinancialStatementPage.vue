<script setup lang="ts">
import { ExtractFinance } from "src/interfaces/models";
import { onMounted, ref } from "vue";
import ApiService from "src/services/api.service";
import { date } from 'quasar';

interface Column {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  format?: (val: any) => string;
}

const columns: Column[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    format: (val: number) => `${val}`,
    sortable: true
  },
  { name: 'dataAgendamento', align: 'center', label: 'Data Agendamento', field: 'dataAgendamento', sortable: true },
  { name: 'dataTransferencia', align: 'center', label: 'Data Transferência', field: 'dataTransferencia', sortable: true },
  { name: 'contaOrigem', label: 'Conta Origem', field: 'contaOrigem' },
  { name: 'contaDestino', label: 'Conta Destino', field: 'contaDestino' },
  { name: 'valorString', label: 'Valor (original)', field: 'valorString', sortable: true },
  { name: 'taxa', label: 'Taxa (%)', field: 'taxa', sortable: true },
  { name: 'valorFinalString', label: 'Valor (final)', field: 'valorFinalString', sortable: true },
];

// Use ref para tornar a variável reativa
const rows = ref<ExtractFinance[]>([]);

onMounted(async () => {
  await fetchFinanceData();
});

async function fetchFinanceData() {
  try {
    const response = await ApiService.get<ExtractFinance[]>('/transferencias');
    rows.value = response.data.map((value) => {
      const valorFinal = (value.valor || 0) - value.taxa;
      return {
        id: value.id,
        dataAgendamento: date.formatDate(value.dataAgendamento, 'DD-MM-YYYY'),
        dataTransferencia: date.formatDate(value.dataTransferencia, 'DD-MM-YYYY'),
        contaOrigem: value.contaOrigem,
        contaDestino: value.contaDestino,
        valorString: formatCurrency(value.valor || 0),
        taxa: value.taxa,
        valorFinalString: formatCurrency(valorFinal || 0),
      };
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Extrato de Transferências"
      :rows="rows"
      :computedRows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<style scoped lang="sass">

</style>
