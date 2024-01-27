<script lang="ts">
  import { page } from '$app/stores'
  import { signIn, signOut } from '@auth/sveltekit/client'
</script>

<div
  class="flex flex-col items-center text-center min-h-screen w-full landing gap-[5px] md:gap-[15px] justify-around px-6"
>
  <h1
    class="text-[130px] sm:text-[150px] md:text-[180px] lg:text-[240px] font-semibold md:-mt-12 text-white main-heading z-10"
  >
    zen
  </h1>

  <h3
    class="text-[32px] sm:text-[48px] md:text-[64px] md:-mt-16 font-bold text-black tracking-wide z-10"
  >
    a collab platform for
    <span class="text-white">devs</span>
  </h3>

  {#if !$page.data.session}
    <button
      class="bg-white w-60 h-16 rounded-full text-[32px] font-semibold hover:scale-105 login-btn cursor-pointer z-10"
      on:click={() => signIn('google')}
    >
      get in
    </button>
  {:else}
    <a href="/dashboard">
      <button
        class="bg-white w-60 h-16 rounded-full text-[32px] font-semibold hover:scale-105 login-btn cursor-pointer z-10"
      >
        dashboard
      </button>
    </a>
  {/if}

  <div
    class="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-center text-white font-bold z-10"
  >
    <p>
      <span class="text-black">join zen</span> and unlock a world of collaborative
      coding.
    </p>

    <p class="text-black">your projects, your community, your way.</p>
  </div>
</div>

<style>
  .landing {
    position: relative;
    background: linear-gradient(
      113deg,
      #fff 1.78%,
      #feac5e 39.58%,
      #c779d0 64.96%,
      #4bc0c8 95.8%
    );
    backdrop-filter: blur(50px);
    font-family: 'Outfit', sans-serif;
  }

  .landing::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(https://grainy-gradients.vercel.app/noise.svg);
    opacity: 0.4;
    pointer-events: none;
  }

  .main-heading {
    font-family: 'Orbitron', sans-serif;
    text-shadow: 0px 15px 0px #000;
    line-height: normal;
  }

  .login-btn {
    box-shadow: 0px 6px 0px 0px #000;
  }
</style>
