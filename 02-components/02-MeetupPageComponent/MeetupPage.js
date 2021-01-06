import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<meetup-view v-if="meetup" :meetup="meetup"></meetup-view>`,

  // components
  components: {
    MeetupView,
  },

  // data
  data() {
    return {
      meetup: null,
    };
  },

  // mounted
  async mounted() {
    // Требуется получить данные митапа с API
    this.meetup = await fetchMeetup(MEETUP_ID);
  },

  // methods
};
