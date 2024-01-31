<script lang="ts">
  import { Badge } from '$lib/components/ui/badge'
  import { Separator } from '$lib/components/ui/separator'
</script>

<main class="flex justify-center mx-2 md:mx-10 mt-10">
  <div class="flex flex-col max-w-[700px]">
    <div class="flex items-center gap-5">
      <h2 class="text-5xl font-semibold">Pencil</h2>
      <iconify-icon
        icon="mdi:github"
        class="text-4xl text-gray-600 hover:text-black cursor-pointer"
      >
      </iconify-icon>
    </div>

    <h4 class="text-gray-700 text-2xl font-semibold mt-4">
      Collaborative whiteboarding application
    </h4>

    <div class="flex mt-8 flex-col gap-3">
      <h3 class="text-3xl font-bold">About</h3>
      <p class="spacemono text-lg text-gray-700">
        {'This is a collaborative whiteboarding application. I’ve used next.js and tailwind for client side and i’ve created the websocket server in nodejs.'}
      </p>
    </div>

    <div class="flex flex-col mt-10">
      <h3 class="text-3xl font-bold">Tech Stack</h3>
      <div class="flex gap-2 mt-4">
        <Badge class="text-[14px]">Next.js</Badge>
        <Badge class="text-[14px]">Next.js</Badge>
        <Badge class="text-[14px]">Next.js</Badge>
      </div>
    </div>

    <div class="flex flex-col mt-10">
      <h3 class="text-3xl font-bold">Milestones</h3>
      <div class="flex gap-4">
        <Separator class="mt-2" orientation="vertical" />
        <div>
          <div class="mt-4">
            <div class="flex gap-4">
              <h4 class="text-2xl font-semibold">Develop feature 4</h4>
              <Badge>Active</Badge>
            </div>
            <p class="text-gray-700 mt-2 ml-2 spacemono">
              Description about feature
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
