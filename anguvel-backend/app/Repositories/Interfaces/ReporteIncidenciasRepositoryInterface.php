<?php

namespace App\Repositories;

use App\Models\Reporte_Incidencias;
use Illuminate\Database\Eloquent\Collection;

interface ReporteIncidenciasRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?Reporte_Incidencias;
    public function create(array $data): Reporte_Incidencias;
    public function update(int $id, array $data): ?Reporte_Incidencias;
    public function delete(int $id): bool;
}
