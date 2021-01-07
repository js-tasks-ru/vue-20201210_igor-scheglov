/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="minusMonth"></button>
          <div>{{ calMonth }} {{ calYear }}</div>
          <button class="rangepicker__selector-control-right" @click="plusMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="day in days" class="rangepicker__cell" :class="{rangepicker__cell_inactive: !day.active}">
          {{ day.dateNum }}
          <a v-if="day.meetups" v-for="meetup in day.meetups" class="rangepicker__event">{{ meetup.title }}</a>
        </div>
      </div>
    </div>


  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц
  data() {
    return {
      calDate: new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(1)),
    };
  },

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    calYear() {
      return this.calDate.getUTCFullYear();
    },
    calMonth() {
      return this.calDate.toLocaleString(navigator.language, {
        month: 'long',
      });
    },

    days() {
      let days = [];

      let firstDayOfMonth = new Date(new Date(this.calDate).setDate(1));
      let firstDayOfMonthDay = firstDayOfMonth.getDay();

      let lastDayOfMonth = new Date(
        new Date(this.calDate).setMonth(this.calDate.getMonth() + 1, 0),
      );

      let lastDayOfMonthDate = lastDayOfMonth.getDate();
      let lastDayOfMonthDay = lastDayOfMonth.getDay();

      if (firstDayOfMonthDay > 1 || firstDayOfMonthDay === 0) {
        if (firstDayOfMonthDay === 0) {
          firstDayOfMonthDay = 7;
        }
        for (let i = firstDayOfMonthDay; i > 1; i--) {
          days.push({
            date: new Date(
              new Date(firstDayOfMonth).setDate(
                firstDayOfMonth.getDate() - i + 1,
              ),
            ),
            active: false,
          });
        }
      }

      for (let i = 0; i < lastDayOfMonthDate; i++) {
        days.push({
          date: new Date(
            new Date(firstDayOfMonth).setDate(firstDayOfMonth.getDate() + i),
          ),
          active: true,
        });
      }

      if (lastDayOfMonthDay > 0) {
        for (let i = 1; i <= 7 - lastDayOfMonthDay; i++) {
          days.push({
            date: new Date(
              new Date(lastDayOfMonth).setDate(lastDayOfMonth.getDate() + i),
            ),
            active: false,
          });
        }
      }

      days = days.map((day) => ({
        ...day,
        dateNum: day.date.getDate(),
        meetups: this.meetups.filter((val) => {
          return (
            val.date >= day.date &&
            val.date < new Date(day.date).setDate(day.date.getDate() + 1)
          );
        }),
      }));

      return days;
    },
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    plusMonth: function () {
      this.calDate = new Date(
        this.calDate.setMonth(this.calDate.getMonth() + 1),
      );
    },
    minusMonth: function () {
      this.calDate = new Date(
        this.calDate.setMonth(this.calDate.getMonth() - 1),
      );
    },
  },
};
