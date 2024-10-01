<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Agendar Transferência</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="col align-center"
        >
          <div class="row items-center">
            <div class="col">
              <q-input
                filled
                v-model="contaOrigem"
                label="Sua conta *"
                mask="##########"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
              />

              <q-input
                filled
                v-model="contaDestino"
                mask="##########"
                label="Conta Destino *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
              />

              <q-input
                filled
                v-model="valor"
                label="Valor da transferência *"
                lazy-rules
                :rules="[ val => val !== null && val !== '' || 'Campo obrigatório' ]"
                mask="#.##"
                fill-mask="#"
                reverse-fill-mask
                hint="Mask: #.00"
                input-class="text-right"
              />
            </div>
            <div class="row align-center">
              <div class="q-pa-md">
                <div class="q-gutter-md row items-start">
                  <q-date v-model="dataTransferencia" mask="YYYY-MM-DD"/>
                </div>
              </div>
            </div>
          </div>
          <div class="q-gutter-md">
            <q-btn label="Confirmar" type="submit" color="primary"/>
            <q-btn label="Limpar" flat type="onReset" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {date, useQuasar} from "quasar";
import ApiService from "src/services/api.service";
import {CreateSchedulerFinance} from "src/interfaces/models";

const $q = useQuasar()

const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')

let dataTransferencia = ref(formattedString)
const contaOrigem = ref()
const contaDestino = ref()
const valor = ref()

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
    $q.loading.show({
      delay: 400 // ms
    })
    const response = await ApiService.post('/transferencias', input);
    console.info(response)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Agendado'
    })
  } catch (error) {
    console.error('Erro ao inserir agendamento:', error);
  } finally {
    $q.loading.hide()
  }
}

function onReset() {
  valor.value = ref()
  contaOrigem.value = ref()
  contaDestino.value = ref()
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
