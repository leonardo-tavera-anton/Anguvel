<?php

namespace App\Repositories;

use App\Models\Gestion_Tributaria_Pagos;
use Illuminate\Database\Eloquent\Collection;

class EloquentGestionTributariaPagosRepository implements GestionTributariaPagosRepositoryInterface
{
    public function getAll(): Collection
    {
        return Gestion_Tributaria_Pagos::all();
    }

    public function findById(int $id): ?Gestion_Tributaria_Pagos
    {
        return Gestion_Tributaria_Pagos::find($id);
    }

    public function create(array $data): Gestion_Tributaria_Pagos
    {
        return Gestion_Tributaria_Pagos::create($data);
    }

    public function update(int $id, array $data): ?Gestion_Tributaria_Pagos
    {
        $gestionTributariaPagos = Gestion_Tributaria_Pagos::find($id);
        if ($gestionTributariaPagos) {
            $gestionTributariaPagos->update($data);
        }
        return $gestionTributariaPagos;
    }

    public function delete(int $id): bool
    {
        return Gestion_Tributaria_Pagos::destroy($id);
    }
}
