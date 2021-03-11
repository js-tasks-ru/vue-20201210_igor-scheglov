<template>
  <form class="form" @submit="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="fullName" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password1" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password2" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input type="checkbox" v-model="isAgreed" /> Я согласен с условиями
        <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button @click.prevent="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="/login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: null,
      fullName: null,
      password1: null,
      password2: null,
      isAgreed: false,
    };
  },
  methods: {
    submit() {
      if (!this.email) {
        alert('Требуется ввести Email');
      } else if (!this.fullName) {
        alert('Требуется ввести полное имя');
      } else if (!this.password1) {
        alert('Требуется ввести пароль');
      } else if (!this.password2 || this.password1 !== this.password2) {
        alert('Пароли не совпадают');
      } else if (!this.isAgreed) {
        alert('Требуется согласиться с условиями');
      } else {
        register(this.email, this.fullName, this.password1).then(
          (response) => {
            //TODO
            // лучше бы здесь обработать response.ok
            if (response.id != null) {
              alert(response.id);
            } else {
              alert(response.message);
            }
          },
        );
      }
    },
  },
};
</script>

<style scoped></style>
