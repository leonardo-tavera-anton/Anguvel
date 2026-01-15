<?php

namespace App\Services;

use App\Repositories\ReporteIncidenciasRepositoryInterface;
use App\Models\Reporte_Incidencias;
use Illuminate\Database\Eloquent\Collection;

class ReporteIncidenciasService
{
    protected $reporteIncidenciasRepository;

    public function __construct(ReporteIncidenciasRepositoryInterface $reporteIncidenciasRepository)
    {
        $this->reporteIncidenciasRepository = $reporteIncidenciasRepository;
    }

    public function getAllReporteIncidencias(): Collection
    {
        return $this->reporteIncidenciasRepository->getAll();
    }

    public function getReporteIncidenciasById(int $id): ?Reporte_Incidencias
    {
        return $this->reporteIncidenciasRepository->findById($id);
    }

    public function createReporteIncidencias(array $data): Reporte_Incidencias
    {
        return $this->reporteIncidenciasRepository->create($data);
    }

    public function updateReporteIncidencias(int $id, array $data): ?Reporte_Incidencias
    {
        return $this->reporteIncidenciasRepository->update($id, $data);
    }

    public function deleteReporteIncidencias(int $id): bool
    {
        return $this->reporteIncidenciasRepository->delete($id);
    }
}
