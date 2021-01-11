import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

const getDataOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDay().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      rawMeetup: null,
    };
  },

  async mounted() {
    // Требуется получить данные митапа с API
    this.rawMeetup = await getMeetup(MEETUP_ID);
  },

  computed: {
    meetup() {
      if (this.rawMeetup) {
        return {
          ...this.rawMeetup,
          localDate: new Date(this.rawMeetup.date).toLocaleString(
            navigator.language,
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          ),
          dateOnlyString: getDataOnlyString(new Date(this.rawMeetup.date)),

          coverStyle: {
            '--bg-url': this.rawMeetup.imageId
              ? `url(${getMeetupCoverLink(this.rawMeetup)})`
              : '',
          },

          agenda: this.rawMeetup.agenda.map(function (agendaItem) {
            return {
              ...agendaItem,
              // icon: agendaItem.type
              icon: agendaItemIcons[agendaItem.type],
              title: agendaItem.title
                ? agendaItem.title
                : agendaItemTitles[agendaItem.type],
            };
          }),
        };
      } else {
        return null;
      }
    },

    // meetupCoverLink() {
    //   return getMeetupCoverLink(this.meetup);
    // }
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
  },
});

async function getMeetup(MEETUP_ID) {
  let url = API_URL + '/meetups/' + MEETUP_ID;
  let response = await fetch(url);
  let meetupObject = await response.json();

  return meetupObject;
}
