<template>
  <form class="form" @submit="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          placeholder="demo@email"
          v-model="email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          placeholder="password"
          v-model="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button
        @click.prevent="submit"
        class="button button_primary button_block"
      >
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';
export default {
  name: 'LoginPage',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    submit() {
      if (!this.email) {
        alert('Требуется ввести Email');
      } else if (!this.password) {
        alert('Требуется ввести пароль');
      } else {
        login(this.email, this.password)
          //TODO
          // лучше бы здесь обработать response.ok
          .then((response) => {
            if (response.id != null) {
              alert(response.fullname);
            } else {
              alert('Неверные учетные данные');
            }
          });
      }
    },
  },
};
</script>

<style scoped></style>
