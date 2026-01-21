<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        $testimonials = Testimonial::where('is_visible', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Testimonials', [
            'testimonials' => $testimonials,
        ]);
    }
}
