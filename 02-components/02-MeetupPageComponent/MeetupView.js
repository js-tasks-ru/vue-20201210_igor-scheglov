import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>

      <!-- meetup cover -->
      <meetup-cover :title="meetup.title" :link="link"/>

      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description v-if="meetup.description" :description="meetup.description"/>
            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda :agenda="meetup.agenda"/>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="dateD"/>
          </div>
        </div>
      </div>
    </div>`,

  // components
  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  // props
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    link() {
      return this.meetup.imageId ? getMeetupCoverLink(this.meetup) : null;
    },
    dateD() {
      return new Date(this.meetup.date);
    },
  },
};
