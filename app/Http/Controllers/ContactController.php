<?php

namespace App\Http\Controllers;

use App\Models\SocialLink;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $socialLinks = SocialLink::where('is_visible', true)
            ->orderBy('sort_order')
            ->orderBy('platform')
            ->get();

        return Inertia::render('Contact', [
            'socialLinks' => $socialLinks,
        ]);
    }
}
