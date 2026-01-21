<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Project::where('status', 'published')
            ->with('categories');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $projects = $query->orderBy('sort_order')
            ->orderBy('published_at', 'desc')
            ->get();

        $categories = Category::where('is_visible', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'color']);

        return Inertia::render('Projects', [
            'projects' => $projects,
            'categories' => $categories,
            'selectedCategory' => $request->category,
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('ProjectDetail', [
            'project' => $project,
        ]);
    }
}
