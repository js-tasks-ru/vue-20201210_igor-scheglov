<template>
  <div class="toasts">
    <template v-for="message in messages">
      <div
        v-if="message.type === 'success'"
        :key="message.messageNumber"
        class="toast toast_success"
      >
        <app-icon icon="check-circle" />
        <span>{{ message.message }}</span>
      </div>
      <div
        v-if="message.type === 'error'"
        :key="message.messageNumber"
        class="toast toast_error"
      >
        <app-icon icon="alert-circle" />
        <span>{{ message.message }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  data() {
    return {
      messages: [],
      messageNumber: 0,
    };
  },

  components: { AppIcon },

  methods: {
    error(message) {
      let messageItem = { message, type: 'error', messageNumber: this.messageNumber++ };
      this.processToast(messageItem);
    },
    success(message) {
      let messageItem = { message, type: 'success', messageNumber: this.messageNumber++ };
      this.processToast(messageItem);
    },

    processToast(messageItem) {
      this.messages.push(messageItem);
      setTimeout(
        () =>
          'remove ' + this.messages.splice(this.messages.indexOf(messageItem), 1),
        DELAY,
      );
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
