<script lang="ts">
  import 'iconify-icon'
</script>

<nav
  class="flex h-full items-center px-4 sm:px-10 md:px-20 lg:px-40 h-20 justify-between"
>
  <a href="/">
    <h3 class="font-[Orbitron] text-[30px] sm:text-[40px] md:text-[60px]">
      zen
    </h3>
  </a>
  <div class="flex h-full items-center gap-6 sm:gap-10 lg:gap-20 py-2 mt-2">
    <a href="/dashboard">
      <p
        class="font-semibold hidden md:block text-lg hover:border-b-2 border-black"
      >
        Dashboard
      </p>

      <iconify-icon
        class="md:hidden text-[30px]"
        icon="material-symbols-light:team-dashboard"
      ></iconify-icon>
    </a>

    <a href="/explore">
      <p
        class="font-semibold hidden md:block text-lg hover:border-b-2 border-black"
      >
        Explore
      </p>

      <iconify-icon
        class="md:hidden text-[30px]"
        icon="bitcoin-icons:search-outline"
      ></iconify-icon>
    </a>

    <a href="/requests">
      <p
        class="font-semibold hidden md:block text-lg hover:border-b-2 border-black"
      >
        Requests
      </p>

      <iconify-icon class="md:hidden text-[30px]" icon="carbon:collaborate"
      ></iconify-icon>
    </a>

    <a href="/cotd">
      <p
        class="font-semibold hidden md:block text-lg hover:border-b-2 border-black"
      >
        COTD
      </p>

      <iconify-icon class="md:hidden text-[30px]" icon="ph:crown-thin"
      ></iconify-icon>
    </a>
  </div>
</nav>
