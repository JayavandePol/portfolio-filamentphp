<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Project;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $projects = Project::where('status', 'published')
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        $testimonials = Testimonial::where('is_visible', true)
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->limit(2)
            ->get();

        $companies = Company::where('is_visible', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        $projectsCount = Project::where('status', 'published')->count();

        return Inertia::render('Home', [
            'projects' => $projects,
            'testimonials' => $testimonials,
            'companies' => $companies,
            'projectsCount' => $projectsCount,
        ]);
    }
}