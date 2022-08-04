<template>
  <div class="help-container" :class="{ small: small }">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
      <h3 v-if="headline" class="tw-inline tw-mb-0">
        {{ $t(headline) }}
      </h3>
      <Icon :icon="icon" />
      <material-icon v-if="bigIcon" class="bigIcon" :icon="bigIcon" />
    </div>
    <h4 v-if="subHeadline" class="sub">
      {{ $t(subHeadline) }}
    </h4>
    <h6 v-if="description" class="sub tw-mt-4 tw-mb-4">
      {{ $t(description) }}
    </h6>
    <div
      class="flex"
      :class="{
        'tw-justify-start': buttonSide === 'left',
        'tw-justify-end': buttonSide === 'right',
      }"
    >
      <slot>
        <Button
          v-if="button"
          variant="secondary"
          :to="localePath(to)"
          :class="{ 'btn-center': buttonSide === 'center' }"
        >
          {{ $t(button) }}
        </Button>
      </slot>
    </div>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button/Button'
import Icon from '~/components/atoms/Icon/Icon'
export default {
  name: 'HelpContainer',
  components: {
    Button,
    Icon,
  },
  props: {
    headline: {
      type: String,
      default: 'misc.help',
    },
    subHeadline: {
      type: String,
      default: 'misc.questions',
    },
    description: {
      type: String,
      default: 'misc.questionsExperts',
    },
    button: {
      type: String,
      default: 'misc.sendMessage',
    },
    icon: {
      type: String,
      default: 'mail_outline',
    },
    to: {
      type: String,
      default: '/',
    },
    small: {
      type: Boolean,
      default: false,
    },
    bigIcon: {
      type: String,
      default: undefined,
    },
    buttonSide: {
      type: String,
      default: 'center',
    },
  },
}
</script>

<style lang="scss" scoped>
.help-container {
  background-color: grey;
  padding: 40px 16px;
  box-shadow: 0 48px 48px -48px lightslategrey;

  @screen md {
    padding: 80px 32px;
  }

  @screen lg {
    padding: 80px 48px;
  }

  button,
  a {
    background-color: grey;
    font-weight: bold;
    text-align: left;

    .material-icons {
      float: right;
      padding-left: 16px;
      vertical-align: middle;
    }
  }

  .btn-center {
    width: 100%;
  }

  .bigIcon {
    &.material-icons {
      color: black;
      font-size: 40px;
    }
  }
}

.small {
  padding: 24px;
}
</style>
