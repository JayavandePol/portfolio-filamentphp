<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use App\Models\WorkExperience;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $skills = Skill::where('is_visible', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'icon', 'color', 'proficiency']);

        $experiences = WorkExperience::where('is_visible', true)
            ->orderBy('sort_order')
            ->orderByDesc('start_date')
            ->get();

        return Inertia::render('About', [
            'skills' => $skills,
            'experiences' => $experiences,
        ]);
    }
}
