<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\ConsultaProyectoRepositoryInterface;
use App\Repositories\EloquentConsultaProyectoRepository;
use App\Repositories\GestionTributariaPagosRepositoryInterface;
use App\Repositories\EloquentGestionTributariaPagosRepository;
use App\Repositories\ReporteIncidenciasRepositoryInterface;
use App\Repositories\EloquentReporteIncidenciasRepository;
use App\Repositories\SeguridadCiudadanaRepositoryInterface;
use App\Repositories\EloquentSeguridadCiudadanaRepository;
use App\Repositories\TramitesLicenciasRepositoryInterface;
use App\Repositories\EloquentTramitesLicenciasRepository;
use App\Repositories\UsuarioRepositoryInterface;
use App\Repositories\EloquentUsuarioRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ConsultaProyectoRepositoryInterface::class, EloquentConsultaProyectoRepository::class);
        $this->app->bind(GestionTributariaPagosRepositoryInterface::class, EloquentGestionTributariaPagosRepository::class);
        $this->app->bind(ReporteIncidenciasRepositoryInterface::class, EloquentReporteIncidenciasRepository::class);
        $this->app->bind(SeguridadCiudadanaRepositoryInterface::class, EloquentSeguridadCiudadanaRepository::class);
        $this->app->bind(TramitesLicenciasRepositoryInterface::class, EloquentTramitesLicenciasRepository::class);
        $this->app->bind(UsuarioRepositoryInterface::class, EloquentUsuarioRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
