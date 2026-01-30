<x-filament-panels::page>
    <style>
        /* Aggressive override for all inputs within the ticket wrapper */
        .ticket-form-wrapper input,
        .ticket-form-wrapper textarea,
        .ticket-form-wrapper select,
        .ticket-form-wrapper .fi-input,
        .ticket-form-wrapper .fi-select-input,
        .ticket-form-wrapper .choices__inner,
        .ticket-form-wrapper .choices__list--single,
        .ticket-form-wrapper .choices__item {
            color: #000000 !important;
            background-color: #ffffff !important;
            --tw-text-opacity: 1 !important;
        }

        /* Fix placeholder visibility */
        .ticket-form-wrapper input::placeholder,
        .ticket-form-wrapper textarea::placeholder,
        .ticket-form-wrapper select::placeholder {
            color: #6b7280 !important;
        }

        /* Ensure dropdown options are visible */
        .ticket-form-wrapper .choices__list--dropdown .choices__item {
            color: #000000 !important;
            background-color: #ffffff !important;
        }
    </style>

    <div class="grid grid-cols-1 gap-6">
        <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 class="text-lg font-medium mb-4">Create New Ticket</h2>
            <div class="ticket-form-wrapper">
                @livewire('creators-ticketing::ticket-submit-form')
            </div>
        </div>
    </div>
</x-filament-panels::page>