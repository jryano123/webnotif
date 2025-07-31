<script lang="ts">
 import * as Sidebar from "$lib/components/ui/sidebar/index.js";
import { UserRoundPen } from 'lucide-svelte';
import { BellDot } from 'lucide-svelte';
import { LayoutDashboard } from 'lucide-svelte';
import { LibraryBig } from 'lucide-svelte';
import CalendarIcon from "@lucide/svelte/icons/calendar";
import Layout from "../../routes/+layout.svelte";

  let unreadCount = 4; // ✅ Change this to your dynamic value
  // Menu items.
  const items = [
    {
      title: "Profile",
      url: "/profile",
      icon: UserRoundPen,
    },
    {
      title: "Notifications",
      url: "/notiftable",
      icon: BellDot,
    },
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Daily Records",
      url: "#",
      icon: LibraryBig,
    },
    {
      title: "CUS Records",
      url: "#",
      icon: CalendarIcon,
    },
  ];

  function handleClick(itemTitle: string) {
    if (itemTitle === "Notifications") {
      unreadCount = 0;
    }
  }
</script>

<Sidebar.Root  class="bg-gray-50 border-r border-gray-200 text-gray-700">
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu class="flex flex-col gap-y-3">
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                 {#snippet child({ props })}
                  <a 
                    href={item.url} 
                    on:click={() => handleClick(item.title)} 
                    {...props}
                    class="flex items-center gap-2"
                    >
                    {#if item.title === "Notifications"}
                      <div class="relative w-fit">
                        <item.icon class="w-5 h-5" />
                        {#if unreadCount > 0}
                          <!-- Notification bubble with number -->
                          <span class="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-[10px] font-bold text-white bg-red-600 rounded-full">
                            {unreadCount}
                          </span>
                        {/if}
                      </div>
                    {:else}
                      <item.icon class="w-5 h-5" />
                    {/if}
                    <span>{item.title}</span>
                  </a>
                {/snippet} 
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
