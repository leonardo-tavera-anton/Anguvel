<?php

namespace App\Repositories;

use App\Models\Seguridad_Ciudadana;
use Illuminate\Database\Eloquent\Collection;

class EloquentSeguridadCiudadanaRepository implements SeguridadCiudadanaRepositoryInterface
{
    public function getAll(): Collection
    {
        return Seguridad_Ciudadana::all();
    }

    public function findById(int $id): ?Seguridad_Ciudadana
    {
        return Seguridad_Ciudadana::find($id);
    }

    public function create(array $data): Seguridad_Ciudadana
    {
        return Seguridad_Ciudadana::create($data);
    }

    public function update(int $id, array $data): ?Seguridad_Ciudadana
    {
        $seguridadCiudadana = Seguridad_Ciudadana::find($id);
        if ($seguridadCiudadana) {
            $seguridadCiudadana->update($data);
        }
        return $seguridadCiudadana;
    }

    public function delete(int $id): bool
    {
        return Seguridad_Ciudadana::destroy($id);
    }
}
