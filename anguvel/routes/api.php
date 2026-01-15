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
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
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
