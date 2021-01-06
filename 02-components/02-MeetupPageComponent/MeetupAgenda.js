import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <p v-if="agenda.empty" class="meetup-agenda__empty">Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь появится!</p>
      <meetup-agenda-item v-for="agendaItem in agenda" :agendaItem="agendaItem" :key="agendaItem.id"/>
    </div>`,

  // components
  components: {
    MeetupAgendaItem,
  },

  // props
  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
