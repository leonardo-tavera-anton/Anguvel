<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    Artisan::call('route:list', ['--json' => true]);
    $routes = collect(json_decode(Artisan::output(), true))
        ->filter(function ($route) {
            return str_starts_with($route['uri'], 'api/');
        })
        ->map(function ($route) {
            $uri = substr($route['uri'], 4); // Remove 'api/' prefix
            if ($uri === 'login' || $uri === 'user') {
                 return [
                    'uri' => '/' . $uri,
                    'methods' => $route['methods'],
                ];
            }
            return [
                'uri' => '/' . $uri,
                'methods' => $route['methods'],
            ];
        })
        ->groupBy('uri')
        ->map(function ($group) {
            return [
                'uri' => $group->first()['uri'],
                'methods' => $group->flatMap(fn($r) => $r['methods'])->unique()->sort()->values()->all(),
            ];
        })
        ->sortBy('uri')
        ->values()
        ->all();

    return view('api_docs', ['routes' => $routes]);
});