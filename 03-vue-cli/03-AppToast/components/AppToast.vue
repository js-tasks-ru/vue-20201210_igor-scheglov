<template>
  <div class="toasts">
    <div
      v-for="message in messages"
      :key="message.messageNumber"
      class="toast"
      :class="{
        toast_error: message.type === 'error',
        toast_success: message.type === 'success',
      }"
    >
      <app-icon :icon="message.toastIcon" />
      <span>{{ message.message }}</span>
    </div>
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
      this.processToast(message, 'error', 'alert-circle');
    },
    success(message) {
      this.processToast(message, 'success', 'check-circle');
    },

    processToast(message, type, toastIcon) {
      let messageItem = {
        message,
        type,
        toastIcon,
        messageNumber: this.messageNumber++,
      };

      this.messages.push(messageItem);
      setTimeout(
        () => this.messages.splice(this.messages.indexOf(messageItem), 1),
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
