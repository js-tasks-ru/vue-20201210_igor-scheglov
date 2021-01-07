import { agendaItemIcons, agendaItemTitles } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="\`/assets/icons/icon-\${icon}.svg\`" />
      </div>
      <div v-if="agendaItem.startsAt || agendaItem.endsAt" class="meetup-agenda__item-col">{{ agendaItem.startsAt}} - {{ agendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <p v-if="agendaItem.type === 'talk'">
          <span v-if="agendaItem.speaker">{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span  v-if="agendaItem.language" class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,

  // props
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  // Возможно, тут потребуется computed
  computed: {
    iconLink: function () {
      return (
        '/assets/icons/icon-' + agendaItemIcons[this.agendaItem.type] + '.svg'
      );
    },
    icon: function() {
      return (
        agendaItemIcons[this.agendaItem.type]
      );
    },
    title: function () {
      return this.agendaItem.title
        ? this.agendaItem.title
        : agendaItemTitles[this.agendaItem.type];
    },
  },
};
