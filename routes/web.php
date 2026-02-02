<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::get('/login', function () {
    return redirect()->route('filament.dashboard.auth.login');
})->name('login');

Route::get('/password/reset/{token}', function ($token) {
    return redirect()->route('filament.dashboard.auth.password-reset.reset', [
        'token' => $token,
        'email' => request()->query('email'),
    ]);
})->name('password.reset');

use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');

// 404 Fallback
Route::fallback(function () {
    return Inertia::render('NotFound');
});
