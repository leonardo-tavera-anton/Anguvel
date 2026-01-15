<?php

namespace App\Repositories;

use App\Models\Reporte_Incidencias;
use Illuminate\Database\Eloquent\Collection;

class EloquentReporteIncidenciasRepository implements ReporteIncidenciasRepositoryInterface
{
    public function getAll(): Collection
    {
        return Reporte_Incidencias::all();
    }

    public function findById(int $id): ?Reporte_Incidencias
    {
        return Reporte_Incidencias::find($id);
    }

    public function create(array $data): Reporte_Incidencias
    {
        return Reporte_Incidencias::create($data);
    }

    public function update(int $id, array $data): ?Reporte_Incidencias
    {
        $reporteIncidencias = Reporte_Incidencias::find($id);
        if ($reporteIncidencias) {
            $reporteIncidencias->update($data);
        }
        return $reporteIncidencias;
    }

    public function delete(int $id): bool
    {
        return Reporte_Incidencias::destroy($id);
    }
}
