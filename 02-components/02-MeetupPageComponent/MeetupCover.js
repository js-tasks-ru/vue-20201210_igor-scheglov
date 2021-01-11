export const MeetupCover = {
  template: `<div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  // props
  props: {
    title: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  },
  computed: {
    coverStyle() {
      return { '--bg-url': this.link ? `url(${this.link})` : '' };
    },
  },
};
