<?php

namespace App\Repositories;

use App\Models\Consulta_Proyecto;
use Illuminate\Database\Eloquent\Collection;

class EloquentConsultaProyectoRepository implements ConsultaProyectoRepositoryInterface
{
    public function getAll(): Collection
    {
        return Consulta_Proyecto::all();
    }

    public function findById(int $id): ?Consulta_Proyecto
    {
        return Consulta_Proyecto::find($id);
    }

    public function create(array $data): Consulta_Proyecto
    {
        return Consulta_Proyecto::create($data);
    }

    public function update(int $id, array $data): ?Consulta_Proyecto
    {
        $consultaProyecto = Consulta_Proyecto::find($id);
        if ($consultaProyecto) {
            $consultaProyecto->update($data);
        }
        return $consultaProyecto;
    }

    public function delete(int $id): bool
    {
        return Consulta_Proyecto::destroy($id);
    }
}
