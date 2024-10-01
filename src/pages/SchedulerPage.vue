<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="contaOrigem"
        label="Sua conta *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />

      <q-input
        filled
        v-model="contaDestino"
        label="Conta Destino *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />

      <q-input
        filled
        type="number"
        v-model="valor"
        label="Valor da transferência *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Campo obrigatório'
        ]"
      />

      <div class="q-pa-md">
        <div class="q-gutter-md row items-start">
          <q-date v-model="dataTransferencia" mask="YYYY-MM-DD"/>
        </div>
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useQuasar} from "quasar";
import ApiService from "src/services/api.service";
import {CreateSchedulerFinance} from "src/interfaces/models";

const $q = useQuasar()

const dataTransferencia = ref('')
const contaOrigem = ref('')
const contaDestino = ref('')
const valor = ref(0)

async function onSubmit() {
  const input: CreateSchedulerFinance = {
    dataTransferencia: dataTransferencia.value,
    valor: valor.value,
    contaOrigem: contaOrigem.value,
    contaDestino: contaDestino.value
  }
  await sendRequest(input)
}

async function sendRequest(input: CreateSchedulerFinance) {
  try {
    console.log(input)
    const response = await ApiService.post('/transferencias', input);
    console.log(response)
  } catch (error) {
    console.error('Erro ao inserir agendamento:', error);
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Erro ao inserir agendamento'
    })
  } finally {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Agendado'
    })
  }
}

function onReset() {
  dataTransferencia.value = ''
  valor.value = 0
  contaOrigem.value = ''
  contaDestino.value = ''
}
</script>
<style scoped lang="sass">

</style>
