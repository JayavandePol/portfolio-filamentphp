<x-filament-widgets::widget>
    <x-filament::section>
        <div class="flex flex-col gap-4">
            <h2 class="text-lg font-bold tracking-tight text-gray-950 dark:text-white sm:text-xl">
                Quick Actions
            </h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <a href="{{ \App\Filament\Dashboard\Pages\MyTickets::getUrl() }}"
                    class="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/20 transition group">
                    <div class="flex items-center gap-3">
                        <div
                            class="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-700 transition">
                            <x-heroicon-o-ticket class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                            <p class="font-medium text-gray-950 dark:text-white">My Support Tickets</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">View and create tickets</p>
                        </div>
                    </div>
                </a>

                <a href="{{ filament()->getPanel('dashboard')->getUrl() }}/profile"
                    class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition group">
                    <div class="flex items-center gap-3">
                        <div
                            class="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition">
                            <x-heroicon-o-user-circle class="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                            <p class="font-medium text-gray-950 dark:text-white">Profile Settings</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Manage account & security</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>