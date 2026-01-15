<?php

namespace App\Repositories;

use App\Models\Tramites_Licencias;
use Illuminate\Database\Eloquent\Collection;

interface TramitesLicenciasRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?Tramites_Licencias;
    public function create(array $data): Tramites_Licencias;
    public function update(int $id, array $data): ?Tramites_Licencias;
    public function delete(int $id): bool;
}
