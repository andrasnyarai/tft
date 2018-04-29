<template>
    <div class="tech">
        <div v-for="tech in techs">
            {{ tech.icon }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'Tech',
  data() {
    return {
      techs: [
        { icon: 'aaa' },
        { icon: 'bbb' },
        { icon: 'bbb' },
        { icon: 'bbb' },
        { icon: 'ggg' },
        { icon: 'fff' },
      ],
    };
  },
};
</script>
