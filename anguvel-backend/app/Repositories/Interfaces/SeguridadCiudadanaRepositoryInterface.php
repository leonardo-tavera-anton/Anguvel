<?php

namespace App\Repositories;

use App\Models\Seguridad_Ciudadana;
use Illuminate\Database\Eloquent\Collection;

interface SeguridadCiudadanaRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?Seguridad_Ciudadana;
    public function create(array $data): Seguridad_Ciudadana;
    public function update(int $id, array $data): ?Seguridad_Ciudadana;
    public function delete(int $id): bool;
}
