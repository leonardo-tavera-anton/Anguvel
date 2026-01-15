<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConsultaProyectoController;
use App\Http\Controllers\GestionTributariaPagosController;
use App\Http\Controllers\ReporteIncidenciasController;
use App\Http\Controllers\SeguridadCiudadanaController;
use App\Http\Controllers\TramitesLicenciasController;
use App\Http\Controllers\UsuarioController;

/*
|--------------------------------------------------------------------------
| API Todas las rutas
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UsuarioController::class, 'login']);

Route::apiResource('consulta_proyectos', ConsultaProyectoController::class);
Route::apiResource('gestion_tributaria_pagos', GestionTributariaPagosController::class);
Route::apiResource('reporte_incidencias', ReporteIncidenciasController::class);
Route::apiResource('seguridad_ciudadana', SeguridadCiudadanaController::class);
Route::apiResource('tramites_licencias', TramitesLicenciasController::class);
Route::apiResource('usuarios', UsuarioController::class);
