<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiscordWebhookService
{
    public function sendTicketLog(string $message, array $embed = []): void
    {
        $url = config('services.discord.ticket_webhook_url') ?? env('TICKET_WEBHOOK_URL');

        if (!$url) {
            Log::warning('Discord Ticket Webhook URL not set.');
            return;
        }

        $this->send($url, $message, $embed);
    }

    public function sendAuthLog(string $message, array $embed = []): void
    {
        $url = config('services.discord.auth_webhook_url') ?? env('AUTH_WEBHOOK_URL');

        if (!$url) {
            Log::warning('Discord Auth Webhook URL not set.');
            return;
        }

        $this->send($url, $message, $embed);
    }

    protected function send(string $url, string $message, array $embeds = []): void
    {
        if (empty($url)) {
            Log::error('Discord Webhook URL is empty. Check .env configuration.');
            return;
        }

        try {
            $payload = [
                'content' => $message,
            ];

            if (!empty($embeds)) {
                $payload['embeds'] = $embeds;
            }

            $response = Http::post($url, $payload);

            if ($response->failed()) {
                Log::error('Discord Webhook Failed: ' . $response->status() . ' - ' . $response->body());
            }
        } catch (\Exception $e) {
            Log::error('Failed to send Discord webhook: ' . $e->getMessage());
        }
    }
}
