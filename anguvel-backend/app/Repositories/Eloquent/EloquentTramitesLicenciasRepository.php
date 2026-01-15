<?php

namespace App\Repositories;

use App\Models\Tramites_Licencias;
use Illuminate\Database\Eloquent\Collection;

class EloquentTramitesLicenciasRepository implements TramitesLicenciasRepositoryInterface
{
    public function getAll(): Collection
    {
        return Tramites_Licencias::all();
    }

    public function findById(int $id): ?Tramites_Licencias
    {
        return Tramites_Licencias::find($id);
    }

    public function create(array $data): Tramites_Licencias
    {
        return Tramites_Licencias::create($data);
    }

    public function update(int $id, array $data): ?Tramites_Licencias
    {
        $tramitesLicencias = Tramites_Licencias::find($id);
        if ($tramitesLicencias) {
            $tramitesLicencias->update($data);
        }
        return $tramitesLicencias;
    }

    public function delete(int $id): bool
    {
        return Tramites_Licencias::destroy($id);
    }
}
