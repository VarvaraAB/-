<template>
  <div class="subnet-calculator card">
    <div class="field">
      <label for="ip-input">IP адрес</label>
      <input
        id="ip-input"
        v-model="ip"
        :class="{'input-invalid': ip && !isIpValidValue.value}"
        @keydown.enter="calculate"
        placeholder="192.168.1.150"
        type="text"
      />
    </div>

    <div class="field">
      <label for="mask-select">Маска подсети</label>
      <select id="mask-select" v-model="selectedMask">
        <option
          v-for="opt in maskOptions"
          :key="opt.cidr"
          :value="opt.mask"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>

    <button class="btn" :disabled="!isIpValidValue.value" @click="calculate">
      Рассчитать
    </button>

    <div v-if="showResult" class="results">
      <p><strong>IP:</strong> {{ ip }} / {{ selectedMaskLabel }}</p>
      <p><strong>Сеть:</strong> {{ networkAddress }}</p>
      <p><strong>Доступные адреса:</strong> {{ addressesCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MASK_OPTIONS } from '@/constants/maskOptions';
import { isIpValid } from '@/utils/validation';
import { getNetworkAdress } from '@/utils/network';
import { getAddressesCount } from '@/utils/address';
import type { MaskOption } from '@/constants/maskOptions';

const maskOptions = MASK_OPTIONS;

const ip = ref<string>('');
const selectedMask = ref<string>(
  maskOptions.find((m) => m.cidr === 24)?.mask ?? '255.255.255.0'
);

const showResult = ref<boolean>(false);

const isIpValidValue = computed(() => isIpValid(ip.value));

const networkAddress = computed(() => getNetworkAdress(ip.value, selectedMask.value));
const addressesCount = computed(() => getAddressesCount(selectedMask.value));

const selectedMaskLabel = computed(() => {
  const found = maskOptions.find((o: MaskOption) => o.mask === selectedMask.value);
  return found?.label ?? '';
});

function calculate() {
  if (isIpValid(ip.value)) {
    showResult.value = true;
  } else {
    showResult.value = false;
  }
}
</script>

<style scoped>
:root {
  --bg: #f7f7fb;
  --card: #ffffff;
  --text: #1f232a;
  --muted: #6b7280;
  --primary: #4f46e5;
  --border: #e5e7eb;
  --accent: #10b981;
}

.subnet-calculator.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 520px;
  box-shadow: 0 6px 20px rgba(0,0,0,.05);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  color: var(--text);
}

input, select {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color .2s;
}

input.input-invalid {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.15);
}

.btn {
  align-self: start;
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.results {
  background: #f8f9fa;
  border: 1px solid #eef0f3;
  padding: 12px;
  border-radius: 8px;
}
</style>
